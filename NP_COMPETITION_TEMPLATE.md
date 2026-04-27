# NP Competition Template

Use this setup for each live competition week.

## Files

- shared engine: [np-competition-app.js](<userhome>/Documents/kids/kids/np-competition-app.js)
- starter wrapper: [np-competition-template.html](<userhome>/Documents/kids/kids/np-competition-template.html)
- first live week: [np-competition-week-01.html](<userhome>/Documents/kids/kids/np-competition-week-01.html)
- weekly pattern plan: [NP_COMPETITION_WEEKLY_PATTERN.md](<userhome>/Documents/kids/kids/NP_COMPETITION_WEEKLY_PATTERN.md)
- backend setup: [GOOGLE_APPS_SCRIPT_COMPETITION.md](<userhome>/Documents/kids/kids/GOOGLE_APPS_SCRIPT_COMPETITION.md)

## Template rules

Each weekly competition should include:

- `25` challenge-style questions
- `60` minute timer
- child name capture before start
- saved `start time`, `end time`, and `time taken`
- automatic score calculation
- leaderboard ranked by `score`, then `speed`
- one declared weekly winner
- downloadable winner certificate
- exactly `7` days of validity

## How to create a new week

1. Copy [np-competition-template.html](<userhome>/Documents/kids/kids/np-competition-template.html) to a new file such as `np-competition-week-02.html`.
2. Change `window.COMPETITION_KEY` to the new week key.
3. Keep the same Apps Script URL.
4. Add a new competition config block in [np-competition-app.js](<userhome>/Documents/kids/kids/np-competition-app.js) with:
   - `weekLabel`
   - `title`
   - `subtitle`
   - `weekStart`
   - `weekEnd`
   - `minutes`
   - `questions`
5. Use the rotation in [NP_COMPETITION_WEEKLY_PATTERN.md](<userhome>/Documents/kids/kids/NP_COMPETITION_WEEKLY_PATTERN.md) to build the 25 questions.
6. Add the new week card to [index.html](<userhome>/Documents/kids/kids/index.html).

## Winner logic

- winner = highest `correctAnswers`
- tie-breaker 1 = lowest `durationSeconds`
- tie-breaker 2 = earliest `submittedAt`

## Certificate rule

The winner certificate should only be shown when the saved result is the current top leaderboard entry.
