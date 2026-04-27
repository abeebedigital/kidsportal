# Google Apps Script Comments Setup

This site can use a Google Apps Script web app plus a Google Sheet to store private feedback comments.

The same web app can also store Selective School issue reports, which are saved with the page/topic that the user says needs attention.

Selective feedback from GitHub Pages is sent in `no-cors` mode, so the browser only needs the Apps Script to receive and store the row. It does not need to read a CORS-readable response.

## 1. Create the Google Sheet

Create a new Google Sheet and name the first tab `Comments`.

Use this header row in `Comments`:

```text
createdAt	page	name	commentType	message	status
```

If you also want to store Selective School issue reports, add a second tab named `SelectiveFeedback` with:

```text
createdAt	page	name	feedbackType	sourceSection	sourcePage	message	status
```

## 2. Add the Apps Script

Open `Extensions -> Apps Script` from that sheet and replace the default file with this code:

```javascript
const SHEET_NAME = 'Comments';

function doPost(e) {
  try {
    const payload = parsePayload_(e);

    if (!payload || payload.action !== 'create') {
      if (!payload || payload.action !== 'selective_feedback') {
        return jsonOutput({
          success: false,
          message: 'Invalid request.'
        });
      }
    }

    if (payload.action === 'selective_feedback') {
      const name = sanitizeText_(payload.name, 40);
      const feedbackType = sanitizeText_(payload.feedbackType || 'Suggestion', 20);
      const sourceSection = sanitizeText_(payload.sourceSection || 'Selective Hub', 40);
      const sourcePage = sanitizeText_(payload.sourcePage || '', 120);
      const message = sanitizeText_(payload.message, 500);
      const page = sanitizeText_(payload.page || 'selective-school-exam.html', 120);

      if (!name) {
        return jsonOutput({
          success: false,
          message: 'Name is required.'
        });
      }

      if (!sourcePage) {
        return jsonOutput({
          success: false,
          message: 'Source page is required.'
        });
      }

      if (!message || message.length < 8) {
        return jsonOutput({
          success: false,
          message: 'Feedback is too short.'
        });
      }

      const captchaQuestion = String(payload.captchaQuestion || '');
      const captchaAnswer = Number(payload.captchaAnswer);
      if (!validateCaptcha_(captchaQuestion, captchaAnswer)) {
        return jsonOutput({
          success: false,
          message: 'Captcha validation failed.'
        });
      }

      const sheet = getSelectiveFeedbackSheet_();
      sheet.appendRow([
        new Date().toISOString(),
        page,
        name,
        feedbackType,
        sourceSection,
        sourcePage,
        message,
        'approved'
      ]);

      return jsonOutput({
        success: true,
        message: 'Selective feedback saved.'
      });
    }

    if (payload.action !== 'create') {
      return jsonOutput({
        success: false,
        message: 'Invalid request.'
      });
    }

    const name = sanitizeText_(payload.name, 40);
    const commentType = sanitizeText_(payload.commentType || 'Suggestion', 20);
    const message = sanitizeText_(payload.message, 400);
    const page = sanitizeText_(payload.page || 'index.html', 120);

    if (!name) {
      return jsonOutput({
        success: false,
        message: 'Name is required.'
      });
    }

    if (!message || message.length < 6) {
      return jsonOutput({
        success: false,
        message: 'Comment is too short.'
      });
    }

    const captchaQuestion = String(payload.captchaQuestion || '');
    const captchaAnswer = Number(payload.captchaAnswer);
    if (!validateCaptcha_(captchaQuestion, captchaAnswer)) {
      return jsonOutput({
        success: false,
        message: 'Captcha validation failed.'
      });
    }

    const sheet = getSheet_();
    sheet.appendRow([
      new Date().toISOString(),
      page,
      name,
      commentType,
      message,
      'approved'
    ]);

    return jsonOutput({
      success: true,
      message: 'Comment saved.'
    });
  } catch (error) {
    return jsonOutput({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['createdAt', 'page', 'name', 'commentType', 'message', 'status']);
  }

  return sheet;
}

function getSelectiveFeedbackSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('SelectiveFeedback');

  if (!sheet) {
    sheet = ss.insertSheet('SelectiveFeedback');
    sheet.appendRow(['createdAt', 'page', 'name', 'feedbackType', 'sourceSection', 'sourcePage', 'message', 'status']);
  }

  return sheet;
}

function parseJson_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return null;
  }

  return JSON.parse(e.postData.contents);
}

function parsePayload_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  return parseJson_(e);
}

function sanitizeText_(value, maxLength) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function validateCaptcha_(question, answer) {
  const match = question.match(/What is (\d+) \+ (\d+)\?/i);
  if (!match) {
    return false;
  }

  const expected = Number(match[1]) + Number(match[2]);
  return Number(answer) === expected;
}

function jsonOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy the web app

1. Click `Deploy -> New deployment`.
2. Select `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Deploy and copy the web app URL.

## 4. Paste the web app URL into the site

In [index.html](<userhome>/Documents/kids/kids/index.html), replace:

```javascript
const COMMENTS_API_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';


```

with your real Apps Script web app URL.

## 5. Optional moderation

If you want comments to require approval first:

- change the appended status from `approved` to `pending`
- manually review rows in the sheet
- switch `pending` to `approved` after you have checked the feedback

## Notes

- The homepage currently sends comments to the Apps Script web app but does not display them publicly.
- The captcha is validated in the browser and also re-checked in Apps Script.
- This setup stores comments in Google Sheets rather than a local server file.
