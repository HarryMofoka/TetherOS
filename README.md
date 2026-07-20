# TetherOS

TetherOS is a comprehensive, local-first personal life operating system and task manager. It elegantly integrates task management, habit tracking, journaling, calendar events, and productivity tools (like focus timers) into a single, cohesive dashboard with an AI Coach. 

TetherOS enforces a strict, premium monochrome aesthetic (blacks, greys, and whites), ensuring deep focus while letting essential data visualizations (like progress rings and charts) stand out with subtle, deliberate color accents.

## Features
- **Dashboard Overview**: Get a high-level view of tasks, habits, and upcoming events.
- **Task Management**: Kanban-style "To Do", "In Progress", and "Done" boards.
- **Habit Tracking**: Daily streaks, consistency visualization, and habit logging.
- **Calendar & Events**: Manage upcoming appointments and deep work blocks.
- **Journaling**: Secure, reflective journaling interface.
- **Focus Timer**: Built-in Pomodoro-style deep work timer.
- **AI Coach**: A personalized guide providing data-driven productivity advice.
- **Local-First Mock Architecture**: Operates smoothly offline (currently leveraging global context and local storage for state management).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation
- [Product Requirements Document (PRD)](./PRD.md)
- [Technical Design Document (TDD)](./TDD.md)
- [App Flow](./APP_FLOW.md)
- [Backend Schema](./BACKEND_SCHEMA.md)
- [Design Brief](./DESIGN_BRIEF.md)
