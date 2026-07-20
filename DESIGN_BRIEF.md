# Design Brief

## 1. Design Philosophy
TetherOS is designed to be the ultimate distraction-free productivity environment. The interface must get out of the user's way, elevating their content (tasks, journals, schedules) above the UI elements themselves.

## 2. The Strict Monochrome Rule
To achieve this intense focus, TetherOS strictly adheres to a monochrome palette. 
- **Allowed Colors**: Pure black (`#000000`), Pure white (`#ffffff`), and varying shades of grey (e.g., Tailwind's `gray-100` through `gray-900`).
- **Forbidden Colors in UI**: Blue, Red, Green, etc. Buttons cannot be blue; warnings cannot have red backgrounds in the core structural UI unless absolutely mandated by an accessibility standard for destructive actions.
- **Exceptions**: Color is treated as a highly scarce resource. It is used **only** for data visualizations (e.g., the segments of a Donut chart representing progress, or specific tag indicators in a Kanban board). 

## 3. Typography
- **Primary Font**: Sans-serif, modern, geometric (Inter or similar).
- **Hierarchy**:
  - `h1`: 24px/32px, Bold, tracking-tight.
  - `h2`: 18px, Semi-bold.
  - `body`: 14px, Medium to Regular.
  - `small`: 10px - 12px, for metadata, dates, and labels.

## 4. Layout System
- **Grid Layout**: Dashboard utilizes CSS Grid (e.g., 12 columns).
- **Card Design**: Cards are minimal. They feature subtle borders (`border-border`), white backgrounds (`bg-card`), and extremely soft shadows (`shadow-sm`).
- **Sidebar**: Collapsible to maximize screen real estate for deep work.

## 5. Micro-Interactions
- Hover states should be fast but fluid (`transition-colors duration-200`).
- Modals should animate in smoothly from the bottom or center (`animate-in slide-in-from-bottom-2 fade-in`).
