# TetherOS - Exhaustive Master Technical Specification & Codebase Audit 🚀

This document is an exhaustive, granular engineering manifest detailing **every single page, component, state handler, API endpoint, security policy, database schema, interactive button, and deployment specification** for TetherOS.

---

## 📌 Table of Contents
1. [Executive Summary & Launch Status](#1-executive-summary--launch-status)
2. [Security & Protection Architecture](#2-security--protection-architecture)
3. [Routing & Page Manifest (44 Routes)](#3-routing--page-manifest-44-routes)
4. [Component & Interactive Button Audit](#4-component--interactive-button-audit)
5. [State Management & LocalStorage Keys](#5-state-management--localstorage-keys)
6. [API Route Specifications](#6-api-route-specifications)
7. [Supabase & Prisma Database Specs](#7-supabase--prisma-database-specs)
8. [Vercel Deployment Checklist](#8-vercel-deployment-checklist)
9. [Known Limitations & Future Roadmap](#9-known-limitations--future-roadmap)

---

## 1. Executive Summary & Launch Status

- **Build Output**: 44 compiled routes (`npm run build` succeeds cleanly in Turbopack / Next.js 16.2.10).
- **TypeScript & Linting**: 0 errors, 0 strict type mismatches.
- **Git Security**: `.env*` files strictly ignored in `.gitignore`. Zero secret keys committed to Git history.
- **Onboarding Gate**: Active on `/dashboard` layout. Unonboarded sessions are redirected to `/onboarding`.
- **Database & Prisma**: PostgreSQL multi-table schema synchronized via `prisma/schema.prisma` with automatic postinstall generation (`prisma generate`).

---

## 2. Security & Protection Architecture

### 2.1 Middleware & Headers (`middleware.ts`)
- **Rate Limiting**: Sliding-window in-memory IP limiter (`lib/security/rate-limiter.ts`) enforcing **60 requests/minute** on all `/api/*` endpoints. Returns `429 Too Many Requests` with `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers when exceeded.
- **Security Headers**:
  - `X-Frame-Options: DENY` (prevents clickjacking)
  - `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (enforces HSTS)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 2.2 Input Sanitization (`lib/security/sanitizer.ts`)
- `sanitizeString()` and `sanitizeObject()` strip `<script>` tags, inline event attributes (`on*`), `javascript:` URI schemes, and dangerous HTML elements from all incoming API request bodies before database or AI execution.

### 2.3 Supabase RLS Fix (`prisma/migrations/fix_rls_security_definer.sql`)
- Resolves SECURITY DEFINER vulnerabilities on `public.rls_auto_enable()` by converting the function to `SECURITY INVOKER` or revoking execution privileges from `PUBLIC`, `anon`, and `authenticated` roles.

---

## 3. Routing & Page Manifest (44 Routes)

### 3.1 Public Marketing & Landing Pages
- `/` (Home): Modern marketing landing page showcasing hero section, feature grid, live interactive demo previews, testimonial slider, and pricing call-to-action.
- `/about`: Company story, mission, and team overview.
- `/features`: Deep dive into TetherOS focus tools, AI coach, task breakdown, and habit analytics.
- `/how-it-works`: Step-by-step walkthrough of setting up focus targets and daily routines.
- `/pricing`: Transparent tier comparison (Free, TetherOS Pro, Enterprise) with feature checklist.

### 3.2 Authentication & Setup Pages
- `/login`: Standard login form with social sign-in buttons.
- `/signup`: Registration page with form validation.
- `/onboarding`: 4-step wizard gating new users:
  - **Step 1**: Primary focus selection (Time/Tasks, Habits, Deep Work, Life Management).
  - **Step 2**: Daily focus target (2h, 4h, 6h/day) + #1 task input.
  - **Step 3**: Starter habits selection (Meditation, Reading, Focus session, Exercise, etc.).
  - **Step 4**: AI Engine selection (OpenAI, Gemini, Skip) + API Key input.

### 3.3 Dashboard Core Application (`/dashboard/*`)
- `/dashboard` (Modern Overview): Central hub featuring dynamic greetings, Life OS metric cards, Task & Productivity Velocity SVG line chart, daily summary banner, and task execution table.
- `/dashboard/today`: Today's timeline schedule with AI Today Strategy Synthesizer.
- `/dashboard/tasks`: Kanban task management board (To Do, In Progress, Done) with subtask generator via "✨ AI Breakdown", task creation modal, move left/right controls, and trash/delete buttons.
- `/dashboard/habits`: 30-day streak tracker, today completion toggles (`T`), new habit creation modal, and habit deletion actions.
- `/dashboard/focus`: Pomodoro timer (25m Focus, 5m Short Break, 15m Long Break), start/pause/reset buttons, ambient sound selector (Café, Lo-Fi, Binaural).
- `/dashboard/journal`: Reflection editor with dynamic date formatting, local storage persistence, entry deletion, and "✨ AI Reflection Insights" sentiment & clarity analyzer.
- `/dashboard/coach`: Chat interface with TetherOS AI Coach powered by `/api/ai/generate`, message auto-scroll, loading spinner, and quick suggestion chips.
- `/dashboard/calendar`: Interactive calendar grid with event creation modal (Meeting, Focus, Personal).
- `/dashboard/projects`: Project milestone tracker with status tags (Active, Behind, Completed), progress bars, and creation modal.
- `/dashboard/reports`: Analytical charts detailing completion velocity, streak history, and productivity distribution.
- `/dashboard/settings`: Account preferences, theme options, security controls, and "AI & API Keys" configuration tab.
- `/dashboard/bookmarks`: Resource and link bookmark manager with category filtering.
- `/dashboard/integrations`: Connection status cards for Notion, Google Calendar, Slack, GitHub, and Figma.

### 3.4 Application Utilities (`/apps/*` & `/pages/*`)
- `/apps/notes`: Fast scratchpad and sticky note editor with instant local persistence.
- `/apps/tickets`: Support ticket tracking system with status badges and new ticket creation modal.
- `/apps/tickets/create`: Dedicated ticket submission form.
- `/apps/blog/*`: Blog management suite (`/create`, `/edit`, `/manage-blog`, `/post`, `/detail/[id]`).
- `/pages/form`: Universal Goal & Task Creation Wizard.
- `/pages/tables`: Advanced data grids and performance matrices.
- `/pages/user-profile`: Profile card displaying dynamic completed task counters, max habit streak length, active project count, cloud storage meter, and unlocked badges.

### 3.5 System & Auth Pages (`/auth/*`)
- `/auth/404`: Custom 404 page.
- `/auth/auth2/login`: Boxed alternative login view.
- `/auth/auth2/register`: Boxed alternative registration view.
- `/auth/auth2/forgot-password`: Password reset request page.
- `/auth/auth2/two-steps`: 2FA authentication challenge page.
- `/auth/maintenance`: Maintenance mode screen.

---

## 4. Component & Interactive Button Audit

| Component File | Interactive Element | Action & State Handler |
|---|---|---|
| `components/dashboard/TopBar.tsx` | **Theme Toggle Button** | Toggles `.dark` class on `<html>`, saves `tetheros_theme` in `localStorage`, switches Sun/Moon icons |
| `components/dashboard/TopBar.tsx` | **Quick Search Bar (`⌘ K`)** | Opens modal backdrop, filters search suggestions, closes on `X` or link click |
| `components/dashboard/TopBar.tsx` | **Quick Add (`+`)** | Routes user to `/pages/form` wizard |
| `components/dashboard/TopBar.tsx` | **Notifications Button** | Opens popover, displays unread indicator, includes working "Mark all read" button |
| `components/dashboard/TopBar.tsx` | **AI Messages Button** | Opens popover showing AI Coach check-in messages with link to `/dashboard/coach` |
| `components/dashboard/TopBar.tsx` | **User Avatar Popover** | Opens popover displaying user email, profile links, and Log out action |
| `components/dashboard/Sidebar.tsx` | **Desktop Collapse Button** | Toggles sidebar width between `72px` (mini icons) and `256px` (expanded) |
| `components/dashboard/Sidebar.tsx` | **Mobile Hamburger Button** | Opens right-to-left off-canvas mobile navigation drawer |
| `components/dashboard/Sidebar.tsx` | **Sub-Menu Accordions** | Toggles dropdown items for Auth and System page sections |
| `app/dashboard/tasks/page.tsx` | **New Task Button / Modal** | Opens creation modal, saves task title/tag/priority to state & `localStorage` |
| `app/dashboard/tasks/page.tsx` | **AI Breakdown Button** | Calls `/api/ai/generate` (`action: "breakdown_task"`), appends 4 subtasks to To Do column |
| `app/dashboard/tasks/page.tsx` | **Column Move Buttons (`<-` / `->`)** | Shifts task status between `To Do` ➔ `In Progress` ➔ `Done` |
| `app/dashboard/tasks/page.tsx` | **Delete Task Button (`Trash2`)** | Filters out task ID from state and updates `localStorage` |
| `app/dashboard/habits/page.tsx` | **Add Habit Button / Modal** | Opens modal, appends habit with 0 streak to state |
| `app/dashboard/habits/page.tsx` | **Today Streak Toggle (`T`)** | Toggles `completedToday`, increments/decrements streak count live |
| `app/dashboard/habits/page.tsx` | **Delete Habit Button (`Trash2`)** | Removes habit from state |
| `app/dashboard/focus/page.tsx` | **Mode Selectors** | Switches timer between `Pomodoro` (25m), `Short Break` (5m), `Long Break` (15m) |
| `app/dashboard/focus/page.tsx` | **Start / Pause Button** | Toggles countdown interval |
| `app/dashboard/focus/page.tsx` | **Reset Button** | Resets timer to selected mode duration |
| `app/dashboard/focus/page.tsx` | **Ambient Sound Toggles** | Switches active sound track state (Café, Lo-Fi, Binaural) |
| `app/dashboard/journal/page.tsx` | **New Entry Button** | Creates new entry with formatted current date, sets active editor ID |
| `app/dashboard/journal/page.tsx` | **Delete Entry Button** | Removes active entry, updates selection to remaining entries |
| `app/dashboard/journal/page.tsx` | **AI Reflection Insights Button** | Calls `/api/ai/generate` (`action: "analyze_journal"`), renders sentiment & clarity score |
| `app/dashboard/journal/page.tsx` | **Auto-Save Indicator** | Flashes "Saving..." and updates `localStorage` on title/content input change |
| `app/dashboard/coach/page.tsx` | **Chat Input & Send Button** | Appends user message, calls `/api/ai/generate` (`action: "coach_chat"`), appends AI reply |
| `app/dashboard/coach/page.tsx` | **Suggestion Chips** | Pre-fills chat input with quick prompts ("Plan tomorrow", "Analyze focus", etc.) |
| `components/dashboards/modern/OverviewTab.tsx` | **Refresh Button** | Triggers browser re-fetch |

---

## 5. State Management & LocalStorage Keys

All client-side state is centralized in `components/providers/MockDataProvider.tsx` and synchronized across browser reloads:

| LocalStorage Key | Type | Description |
|---|---|---|
| `tetheros_onboarded` | `string ("true")` | Set upon onboarding completion; gates access to `/dashboard` |
| `tetheros_user_goal` | `string` | User's selected primary objective from onboarding |
| `tetheros_focus_hours` | `string` | Target deep work hours/day (e.g. `"4"`) |
| `tetheros_ai_provider` | `string` | Selected provider (`"openai"`, `"gemini"`, `"tetheros"`) |
| `tetheros_user_ai_key` | `string` | User's custom API key |
| `tetheros_theme` | `string` | Theme mode (`"dark"` or `"light"`) |
| `tetheros_tasks` | `JSON Array<Task>` | Active task items |
| `tetheros_habits` | `JSON Array<Habit>` | Active habits and streak records |
| `tetheros_projects` | `JSON Array<Project>` | Project items |
| `tetheros_events` | `JSON Array<EventItem>` | Calendar events |
| `tetheros_journal` | `JSON Array<JournalEntry>` | Journal entries |

---

## 6. API Route Specifications

### 6.1 `POST /api/ai/generate`
- **Security**: Protected by rate limiting and `sanitizeObject()`.
- **Payload Parameters**: `{ action: string, prompt?: string, apiKey?: string, provider?: string }`
- **Actions Supported**:
  - `breakdown_task`: Returns `{ success: true, subtasks: string[] }`
  - `synthesize_today_plan`: Returns `{ success: true, summary: string, timeline: Array }`
  - `analyze_journal`: Returns `{ success: true, sentiment: string, clarityScore: string, insights: string[] }`
  - `coach_chat`: Returns `{ success: true, reply: string }`

### 6.2 `GET / POST / PATCH / DELETE /api/tasks`
- **Security**: Sanitized inputs.
- **Operations**: Manages tasks array with status updates and deletions.

### 6.3 `GET / POST / PATCH /api/habits`
- **Security**: Sanitized inputs.
- **Operations**: Fetches and updates habit completion states.

---

## 7. Supabase & Prisma Database Specs

### 7.1 Prisma Models (`prisma/schema.prisma`)
11 PostgreSQL relational tables:
1. `User`: Primary user accounts.
2. `Task`: Task cards with status, tag, priority, and user relations.
3. `Habit`: Habit definitions and daily goals.
4. `HabitLog`: Historical log entries for habit completions.
5. `Project`: Project milestones with progress percentages and due dates.
6. `Event`: Calendar events and schedule blocks.
7. `JournalEntry`: Daily reflections, titles, contents, and sentiment scores.
8. `FocusSession`: Recorded focus timer durations and ambient sound metadata.
9. `ChatSession`: AI Coach chat sessions.
10. `ChatMessage`: Messages exchanged with AI Coach.
11. `Ticket`: Support ticket tracking entries.

---

## 8. Vercel Deployment Checklist

- [x] **Package Script**: `package.json` contains `"postinstall": "prisma generate"`.
- [x] **Environment Upload**: Upload `.env` to Vercel via `npx vercel env push` or manual copy-paste in Vercel Settings.
- [x] **Git Ignored Secrets**: Confirmed `.gitignore` line 34 contains `.env*`.
- [x] **Build Validation**: Verified `npm run build` compiles clean without errors.

---

## 9. Known Limitations & Future Roadmap

- **Browser Storage Fallback**: Currently, offline/client state defaults to `localStorage` when disconnected from Supabase. Next release will add automatic offline sync queue with Supabase Realtime when network reconnects.
- **Auth Provider Integration**: Social OAuth (Google/GitHub) forms are UI-ready and connect directly once Supabase Auth OAuth keys are entered in the Supabase Dashboard.

---
*TetherOS Master Engineering Specification © 2026.*
