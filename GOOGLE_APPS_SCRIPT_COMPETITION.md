# Google Apps Script Competition Setup

Use this when you want the weekly competition page to save entries to Google Sheets, show a shared leaderboard, and declare a winner.

## Sheet setup

Create a Google Sheet with a tab named `CompetitionEntries`.

Use this header row:

```text
entryId	competitionKey	competitionTitle	weekStart	weekEnd	kidName	correctAnswers	totalQuestions	startedAt	endedAt	durationSeconds	submittedAt
```

## Apps Script code

Open `Extensions -> Apps Script` from that Google Sheet and replace the default file with this:

```javascript
const SHEET_NAME = 'CompetitionEntries';

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  if (action !== 'leaderboard') {
    return outputResponse_({
      success: false,
      message: 'Unknown action.'
    }, e);
  }

  const competitionKey = String((e.parameter && e.parameter.competitionKey) || '').trim();
  if (!competitionKey) {
    return outputResponse_({
      success: false,
      message: 'Missing competition key.'
    }, e);
  }

  const entries = getEntriesForCompetition_(competitionKey);
  const leaderboard = sortEntries_(entries);
  const winner = leaderboard.length ? leaderboard[0] : null;

  return outputResponse_({
    success: true,
    leaderboard: leaderboard,
    winner: winner
  }, e);
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    if (!payload || payload.action !== 'submitCompetition') {
      return outputResponse_({
        success: false,
        message: 'Invalid request.'
      }, e);
    }

    const competitionKey = clean_(payload.competitionKey, 120);
    const competitionTitle = clean_(payload.competitionTitle, 160);
    const weekStart = clean_(payload.weekStart, 80);
    const weekEnd = clean_(payload.weekEnd, 80);
    const kidName = clean_(payload.kidName, 40);
    const correctAnswers = Number(payload.correctAnswers);
    const totalQuestions = Number(payload.totalQuestions);
    const durationSeconds = Number(payload.durationSeconds);
    const startedAt = clean_(payload.startedAt, 80);
    const endedAt = clean_(payload.endedAt, 80);

    if (!competitionKey || !kidName) {
      return outputResponse_({
        success: false,
        message: 'Competition key and kid name are required.'
      }, e);
    }

    if (isNaN(correctAnswers) || isNaN(totalQuestions) || isNaN(durationSeconds)) {
      return outputResponse_({
        success: false,
        message: 'Invalid score or timing values.'
      }, e);
    }

    const now = new Date();
    const startBoundary = new Date(weekStart);
    const endBoundary = new Date(weekEnd);
    if (isNaN(startBoundary.getTime()) || isNaN(endBoundary.getTime())) {
      return outputResponse_({
        success: false,
        message: 'Invalid competition dates.'
      }, e);
    }

    if (now < startBoundary || now > endBoundary) {
      return outputResponse_({
        success: false,
        message: 'This competition is outside its valid week.'
      }, e);
    }

    const entryId = Utilities.getUuid();
    const sheet = getSheet_();
    sheet.appendRow([
      entryId,
      competitionKey,
      competitionTitle,
      weekStart,
      weekEnd,
      kidName,
      correctAnswers,
      totalQuestions,
      startedAt,
      endedAt,
      durationSeconds,
      now.toISOString()
    ]);

    const leaderboard = sortEntries_(getEntriesForCompetition_(competitionKey));
    const winner = leaderboard.length ? leaderboard[0] : null;
    const isWinner = winner ? winner.entryId === entryId : false;

    return outputResponse_({
      success: true,
      leaderboard: leaderboard,
      winner: winner,
      isWinner: isWinner
    }, e);
  } catch (error) {
    return outputResponse_({
      success: false,
      message: 'Server error: ' + error.message
    }, e);
  }
}

function getEntriesForCompetition_(competitionKey) {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow < 2 || lastColumn < 12) {
    return [];
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, 12).getValues();

  return rows
    .filter(function (row) {
      return String(row[1] || '') === competitionKey;
    })
    .map(function (row) {
      return {
        entryId: row[0],
        competitionKey: row[1],
        competitionTitle: row[2],
        weekStart: row[3],
        weekEnd: row[4],
        kidName: row[5],
        correctAnswers: Number(row[6]),
        totalQuestions: Number(row[7]),
        startedAt: row[8],
        endedAt: row[9],
        durationSeconds: Number(row[10]),
        submittedAt: row[11]
      };
    });
}

function sortEntries_(entries) {
  return entries.sort(function (a, b) {
    if (b.correctAnswers !== a.correctAnswers) {
      return b.correctAnswers - a.correctAnswers;
    }

    if (a.durationSeconds !== b.durationSeconds) {
      return a.durationSeconds - b.durationSeconds;
    }

    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'entryId',
      'competitionKey',
      'competitionTitle',
      'weekStart',
      'weekEnd',
      'kidName',
      'correctAnswers',
      'totalQuestions',
      'startedAt',
      'endedAt',
      'durationSeconds',
      'submittedAt'
    ]);
  }

  return sheet;
}

function parsePayload_(e) {
  if (!e) {
    return null;
  }

  if (e.postData && e.postData.contents) {
    const contents = e.postData.contents;
    const type = String(e.postData.type || '');

    if (type.indexOf('application/json') !== -1 || contents.charAt(0) === '{') {
      return JSON.parse(contents);
    }
  }

  if (e.parameter) {
    return e.parameter;
  }

  return null;
}

function clean_(value, maxLength) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function outputResponse_(data, e) {
  const callback = e && e.parameter && e.parameter.callback;
  const json = JSON.stringify(data);

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Deployment

1. Click `Deploy -> New deployment`.
2. Choose `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Deploy and copy the web app URL.

## Frontend connection

In [np-competition-week-01.html](<userhome>/Documents/kids/kids/np-competition-week-01.html), replace:

```javascript
window.COMPETITION_API_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your deployed Apps Script web app URL.

## Weekly rollout checklist

1. Duplicate the weekly competition HTML page for the next week.
2. Change the competition key and date range.
3. Update the 25 questions in [np-competition-app.js](<userhome>/Documents/kids/kids/np-competition-app.js) or add a new config block.
4. Publish the new page.
5. At the end of the week, the top row in the sorted leaderboard is the winner.
