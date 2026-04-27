#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const ROOT = process.cwd();
const OUTPUT_PATHS = [
  path.join(ROOT, "rss.xml"),
  path.join(ROOT, "feed.xml"),
];
const MAX_ITEMS = 60;
const EXCLUDED_FILES = new Set([
  "index.html",
  "np-competition-template.html",
  "selective-exam-syllabus.html",
]);

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getSiteUrl() {
  const cnamePath = path.join(ROOT, "CNAME");
  if (fs.existsSync(cnamePath)) {
    const host = fs.readFileSync(cnamePath, "utf8").trim();
    if (host) {
      return host.startsWith("http://") || host.startsWith("https://")
        ? host.replace(/\/+$/, "")
        : `https://${host.replace(/\/+$/, "")}`;
    }
  }
  return "https://fivetofifteen.com";
}

function listHtmlFiles() {
  return fs
    .readdirSync(ROOT)
    .filter((name) => name.endsWith(".html"))
    .filter((name) => !EXCLUDED_FILES.has(name))
    .sort();
}

function extractMatch(text, regex) {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function cleanText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isRedirectPage(html) {
  return /http-equiv\s*=\s*["']refresh["']/i.test(html) || /window\.location\.(?:href|replace)/i.test(html);
}

function getPageDate(fileName) {
  try {
    const gitDate = childProcess
      .execFileSync("git", ["log", "-1", "--format=%cI", "--", fileName], {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      })
      .trim();
    if (gitDate) {
      return new Date(gitDate);
    }
  } catch (error) {
    // Fall back to file mtime for uncommitted files or environments without git history.
  }

  return fs.statSync(path.join(ROOT, fileName)).mtime;
}

function classifyPage(fileName, title) {
  const lowerName = fileName.toLowerCase();
  const lowerTitle = title.toLowerCase();

  if (lowerName.startsWith("selective-")) return "Selective Exam";
  if (lowerName.startsWith("np-exam-session-")) return "Exam Session";
  if (lowerName.startsWith("np-competition-") || lowerName.startsWith("competition-week-")) return "Competition";
  if (lowerName.startsWith("np-")) return "Competitive Prep";
  if (lowerName.startsWith("addition-table-") || lowerName.startsWith("multiplication-table-")) return "Math is Fun";
  if (lowerTitle.includes("story") || lowerTitle.includes("adventure") || lowerTitle.includes("certificate")) return "Story Collection";
  return "Learning Page";
}

function getDescription(html, title, category) {
  const metaDescription = extractMatch(
    html,
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i
  );
  if (metaDescription) return metaDescription;

  const firstParagraph = cleanText(extractMatch(html, /<p[^>]*>([\s\S]*?)<\/p>/i));
  if (firstParagraph) return firstParagraph.slice(0, 220);

  return `${title} on FiveToFifteen under ${category}.`;
}

function buildItems(siteUrl) {
  return listHtmlFiles()
    .map((fileName) => {
      const html = fs.readFileSync(path.join(ROOT, fileName), "utf8");
      if (isRedirectPage(html)) return null;

      const title =
        cleanText(extractMatch(html, /<title>([\s\S]*?)<\/title>/i)) ||
        fileName.replace(/\.html$/, "").replace(/-/g, " ");

      const category = classifyPage(fileName, title);
      const description = getDescription(html, title, category);
      const date = getPageDate(fileName);
      const relativePath = fileName === "index.html" ? "" : `/${fileName}`;
      const url = `${siteUrl}${relativePath}`;

      return {
        title,
        category,
        description,
        date,
        url,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date - a.date)
    .slice(0, MAX_ITEMS);
}

function generateRss(items, siteUrl, feedFileName) {
  const latestDate = items.length ? items[0].date.toUTCString() : new Date().toUTCString();

  const itemXml = items
    .map((item) => {
      return [
        "  <item>",
        `    <title>${escapeXml(item.title)}</title>`,
        `    <link>${escapeXml(item.url)}</link>`,
        `    <guid>${escapeXml(item.url)}</guid>`,
        `    <description>${escapeXml(item.description)}</description>`,
        `    <category>${escapeXml(item.category)}</category>`,
        `    <pubDate>${item.date.toUTCString()}</pubDate>`,
        "  </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "  <title>FiveToFifteen</title>",
    `  <link>${escapeXml(siteUrl)}</link>`,
    "  <description>New stories, challenge pages, competitions, and exam practice from FiveToFifteen.</description>",
    "  <language>en-au</language>",
    `  <lastBuildDate>${latestDate}</lastBuildDate>`,
    `  <atom:link href="${escapeXml(`${siteUrl}/${feedFileName}`)}" rel="self" type="application/rss+xml" />`,
    itemXml,
    "</channel>",
    "</rss>",
    "",
  ].join("\n");
}

function main() {
  const siteUrl = getSiteUrl();
  const items = buildItems(siteUrl);
  OUTPUT_PATHS.forEach((outputPath) => {
    const rssXml = generateRss(items, siteUrl, path.basename(outputPath));
    fs.writeFileSync(outputPath, rssXml, "utf8");
  });
  console.log(`Generated rss.xml and feed.xml with ${items.length} items.`);
}

main();
