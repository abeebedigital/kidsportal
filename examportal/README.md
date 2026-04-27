# ExamPortal (New Build)

Fresh standalone module for a paid-subscription question-paper portal.

## Implemented now
- Real MySQL schema bootstrap on first request
- User authentication with secure password hashing
- Session-based login/logout and CSRF-protected forms
- Subscription plans and active subscription enforcement
- Protected category/question-set pages (paid users only)
- Dashboard + subscription management UI
- Module 2 admin question bank (create/edit/archive, filters, difficulty, tags, answer keys)
- Module 3 import engine (CSV/JSON preview + row validation + commit import jobs)
- Module 4 paper builder (template creation by category/year/subject, question count, marks, timer, publish state)
- Module 5 exam policy guardrails (template-level no-refresh limits, runtime policy enforcement, auto-submit on policy breach)
- Module 7 exam runner (start/resume, timer, save draft, pause/resume, instant result page)
- Module 6 results + progress tracker (user score history, mastery by category/subject, streaks, analytics snapshot)
- Module 8 admin reports (attempt analytics, policy-event feed, top users, category breakdown, CSV export)
- Module 9 user dashboard (subscription history, quota, recent attempts, best scores, resume pending exam)
- Module 10 admin subscription operations (plan catalog CRUD, manual assign, quota/status updates, usage event feed)
- Module 11 admin user management (user directory filters, role/status control, account creation, password reset)
- Module 12 admin security center (auth session ledger, revoke controls, multi-session risk flags, cleanup tooling)
- Role-based separation (`user` vs `admin`) with admin-only access guards on `/admin/*`

## Main routes
- `index.php` - landing + category tiles
- `admin/questions.php` - question bank management
- `admin/import.php` - import CSV/JSON with preview and commit
- `admin/papers.php` - paper template builder and publish-state management
- `admin/reports.php` - Module 8 analytics dashboard + attempts CSV export
- `admin/subscriptions.php` - Module 10 plan + subscription operations
- `admin/users.php` - Module 11 user and access management
- `admin/security.php` - Module 12 security and session audit center
- `user/register.php` - account creation
- `user/login.php` - login
- `user/dashboard.php` - account/subscription status
- `user/progress.php` - result history and progress analytics
- `user/exam.php?attempt_id=<attempt_id>` - live exam runner
- `user/result.php?attempt_id=<attempt_id>` - instant post-submit result + review
- `user/attempt.php?id=<attempt_id>` - compatibility redirect to exam/result
- `user/subscribe.php` - activate a paid plan
- `category.php?exam=<slug>` - protected published-paper listing with start/resume
- `admin/index.php` - basic portal metrics

## Database
- Uses env vars when available:
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`
  - Optional `EXAMPORTAL_DB_NAME` (default: `kids_examportal`)
- Creates and seeds schema automatically.

## Seeded demo account
- Email: `subscriber@examportal.com`
- Password: `demo12345`
- Role: `user`

## Seeded admin account
- Email: `admin@examportal.com`
- Password: `admin12345`
- Role: `admin`

## Seeded categories
- Selective School, NAPLAN, PSC, UPSC, Entrance

## Seeded plans
- Starter Monthly
- Pro Monthly
- Pro Yearly

## Sample import files
- `samples/questions-import-sample.csv`
- `samples/questions-import-sample.json`
- `samples/IMPORT_FORMAT.md`
