# TetherOS Codebase Architecture & Technical Documentation

---

## 1. Architectural Overview

**TetherOS** is built using Next.js 16 (App Router) and React 19, structured around a local-first, component-driven client architecture. It strictly enforces a monochrome aesthetic with targeted data-visualization accents.

### Core Architectural Pillars
1. **Next.js App Router**: Route-based code splitting for marketing pages (`/`, `/features`, `/pricing`, `/about`, `/how-it-works`) and dashboard pages (`/dashboard/*`).
2. **Global State Provider (`MockDataProvider.tsx`)**: React Context provider managing dynamic app state (Tasks, Habits, Projects, Calendar Events) with automatic `localStorage` synchronization (`tetheros_*` key namespace).
3. **Responsive Hybrid Navigation**:
   - **Desktop Layout**: Collapsible fixed sidebar (`w-64` / `w-[72px]`) with inline profile dropdown and search top bar.
   - **Mobile Layout**: Compact top navigation pill with right-to-left slide-in off-canvas drawer (`z-50`).
4. **Fluid Design System (`globals.css`)**: Hardware-accelerated CSS keyframe animations, spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`), and interactive physics classes (`.interactive-card`, `.interactive-button`).

---

## 2. Directory & File Structure

```
TetherOS/
├── app/                        # Next.js App Router Page Directory
│   ├── globals.css             # Design tokens, OKLCH color variables, keyframes & utilities
│   ├── layout.tsx              # Root HTML wrapper and global metadata configuration
│   ├── page.tsx                # Public Landing / Hero marketing page
│   ├── about/                  # About page
│   ├── features/               # Detailed features breakdown page
│   ├── how-it-works/           # Interactive workflow breakdown page
│   ├── pricing/                # Subscription plans & pricing tiers
│   ├── login/                  # User authentication login interface
│   ├── signup/                 # User registration interface
│   └── dashboard/              # Protected Dashboard Route Group
│       ├── layout.tsx          # Dashboard layout wrapping MockDataProvider, Sidebar & TopBar
│       ├── page.tsx            # Main Daily Overview Dashboard
│       ├── bookmarks/          # Saved links & resource manager
│       ├── calendar/           # Interactive monthly/daily calendar
│       ├── coach/              # AI Productivity Coach chat interface
│       ├── focus/              # Pomodoro timer & ambient sound suite
│       ├── habits/             # Habit streak tracker & habit management
│       ├── integrations/       # Ecosystem app connection manager
│       ├── journal/            # Reflective daily journaling page
│       ├── notes/              # Quick scratchpad notes manager
│       ├── projects/           # Goal & project tracking dashboard
│       ├── reports/            # Analytics & productivity metrics
│       ├── settings/           # Account & application preference settings
│       ├── tasks/              # Interactive Kanban board task manager
│       └── today/              # Focused daily priority execution plan
├── components/
│   ├── dashboard/              # Navigation & Header Components
│   │   ├── Sidebar.tsx         # Desktop sidebar + Mobile slide-in drawer
│   │   └── TopBar.tsx          # Quick search bar, notifications & action controls
│   ├── mock/                   # Visualization & UI Card Primitives
│   │   ├── charts.tsx          # LifeScoreRing, Donut, ProgressRing & Line charts
│   │   ├── HabitsCard.tsx      # Mock habit preview card widget
│   │   ├── JournalCard.tsx     # Mock journal reflection preview widget
│   │   └── TodayPhone.tsx      # Interactive mobile app preview widget
│   ├── providers/
│   │   └── MockDataProvider.tsx # Centralized Context state & localStorage sync
│   └── site/                   # Public Marketing Site UI Components
│       ├── CTABanner.tsx       # Bottom call-to-action banner
│       ├── Logo.tsx            # TetherOS brand logo SVG component
│       ├── SiteFooter.tsx      # Footer links & copyright bar
│       ├── SiteHeader.tsx      # Floating nav pill + mobile menu header
│       ├── SiteLayout.tsx      # Page wrapper for public marketing routes
│       └── sections.tsx        # Privacy, Memory, Offline & FAQ sections
├── PRODUCTION_ROADMAP.md       # Production readiness plan & feature backlog
├── PRD.md                      # Product Requirements Document
├── TDD.md                      # Technical Design Document
├── APP_FLOW.md                 # User navigation & workflow specifications
├── BACKEND_SCHEMA.md           # Database tables & API interface schema
└── DESIGN_BRIEF.md             # Design system specifications
```

---

## 3. State Management & Data Flow

All interactive dashboard components subscribe to the `MockDataProvider` using the `useMockData()` custom hook.

```
                  ┌───────────────────────────────┐
                  │    localStorage Persistence   │
                  │ ("tetheros_tasks", "habits")  │
                  └───────────────▲───────────────┘
                                  │ (Syncs on Change)
                                  ▼
                  ┌───────────────────────────────┐
                  │       MockDataProvider        │
                  │  (React Context + State)      │
                  └───────────────┬───────────────┘
                                  │
      ┌───────────────────────────┼───────────────────────────┐
      ▼                           ▼                           ▼
┌───────────┐               ┌───────────┐               ┌───────────┐
│ Tasks Page│               │Habits Page│               │  AI Coach │
│  (Kanban) │               │ (Streaks) │               │   (Chat)  │
└───────────┘               └───────────┘               └───────────┘
```

### Data Context Interfaces
- **Task**: `id`, `title`, `tag`, `priority` ("High" | "Medium" | "Low"), `status` ("To Do" | "In Progress" | "Done").
- **Habit**: `id`, `name`, `streak` (number), `completedToday` (boolean).
- **Project**: `id`, `name`, `status` ("Active" | "Behind" | "Completed"), `progressPct`, `dueDate`.
- **EventItem**: `id`, `title`, `date`, `time`, `type` ("Meeting" | "Focus" | "Personal").

---

## 4. Key Components Logic Breakdown

### 1. `components/dashboard/Sidebar.tsx`
- **Responsibility**: Manages primary navigation links (`sideMain` & `sideTools`).
- **Desktop State**: Collapsible (`w-64` <-> `w-[72px]`), toggles via chevron button.
- **Mobile State**: Renders top header pill on small screens (`md:hidden`), toggles full-height right-to-left off-canvas drawer with profile menu (`ProfileSection`).

### 2. `components/site/SiteHeader.tsx`
- **Responsibility**: Floating navigation bar for public marketing routes.
- **Pill System**: Logo pill (left), Nav links pill (center), Auth buttons pill (right).
- **Mobile Menu**: Transforms center and right pills into a single right-side hamburger button opening a drawer with navigation and sign-in buttons.

### 3. `components/mock/charts.tsx`
- **Responsibility**: SVG data visualizations using strict monochrome OKLCH colors.
- **LifeScoreRing**: Dynamic circular SVG progress ring calculating overall productivity score.
- **Donut Chart**: Multi-segment SVG arc chart breaking down tasks by completion status.
- **ProgressRing**: Compact inline ring widget used in project rows.

### 4. `app/globals.css`
- **Design Tokens**: OKLCH CSS variables (`--background`, `--foreground`, `--card`, `--border`).
- **Animations**: Fluid keyframe definitions (`fadeInUp`, `scaleIn`, `floatSlow`, `pulseGlow`) paired with spring transition curves.

---

## 5. Verification & Quality Assurance

- **Build Pipeline**: Next.js Turbopack compiler (`npm run build`) verifies type safety, static route generation, and zero SSR hydration mismatches.
- **Linting**: ESLint rule enforcement across all `.tsx` and `.ts` files (`npm run lint`).
