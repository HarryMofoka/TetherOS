# TetherOS - Complete Production Backend Specification

> **Target Environment**: Multi-Tenant Production Server (Supporting 15+ Active Beta Testers & Scalable to Thousands)  
> **Architecture**: Next.js 16 Server Actions / API Routes + PostgreSQL + Prisma ORM + Supabase / Upstash Redis + OpenAI / Gemini API + pgvector

---

## 1. System Architecture & Infrastructure Stack

```
                          ┌──────────────────────────────────────────────┐
                          │   Client Application (Next.js 16 React 19)   │
                          │   Web Desktop & Mobile Responsive Views      │
                          └──────────────────────┬───────────────────────┘
                                                 │ HTTPS / WebSockets
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │     API Gateway / Server Actions Layer       │
                          │   (Next.js App Router API Route Handlers)    │
                          └──────┬───────────────┼───────────────┬───────┘
                                 │               │               │
            ┌────────────────────┘               │               └────────────────────┐
            ▼                                    ▼                                    ▼
┌───────────────────────┐            ┌───────────────────────┐            ┌───────────────────────┐
│ Database & Vector Storage│            │  Redis Cache & Limits │            │   AI Engine & LLM     │
│ PostgreSQL + Prisma   │            │ Upstash Redis Cache   │            │ Gemini 1.5 / OpenAI   │
│ pgvector (Embeddings) │            │ Rate-limiting Engine  │            │ Embeddings Engine     │
└───────────────────────┘            └───────────────────────┘            └───────────────────────┘
```

### Core Tech Stack Selections
- **Primary Database**: PostgreSQL 16 (Hosted on Supabase or Neon DB).
- **ORM / Query Builder**: Prisma ORM v6 (Typesafe database queries & migrations).
- **Vector DB for AI Memory**: `pgvector` extension enabled on PostgreSQL.
- **Cache & Rate Limiting**: Upstash Redis (Serverless HTTP Redis).
- **Authentication**: NextAuth.js (Auth.js v5) with JWT strategy & HTTP-Only Secure Cookies.
- **Data Validation**: Zod (Schema validation for all incoming API requests).
- **AI Processing**: OpenAI `gpt-4o-mini` / `text-embedding-3-small` or Google Gemini API.

---

## 2. Complete Production Prisma Schema (`schema.prisma`)

Save the following schema into `prisma/schema.prisma`:

```prisma
datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum ProjectStatus {
  ACTIVE
  BEHIND
  COMPLETED
  ON_HOLD
}

enum EventType {
  MEETING
  FOCUS
  PERSONAL
}

enum Role {
  USER
  ADMIN
  BETA_TESTER
}

model User {
  id            String          @id @default(uuid())
  name          String?
  email         String          @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?
  role          Role            @default(BETA_TESTER)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  tasks         Task[]
  habits        Habit[]
  projects      Project[]
  events        Event[]
  journals      JournalEntry[]
  focusSessions FocusSession[]
  chatSessions  ChatSession[]
  sessions      Session[]

  @@map("users")
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model Task {
  id          String     @id @default(uuid())
  userId      String
  projectId   String?
  title       String
  tag         String     @default("Personal")
  priority    Priority   @default(MEDIUM)
  status      TaskStatus @default(TODO)
  dueDate     DateTime?
  estimatedMinutes Int?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  project     Project?   @relation(fields: [projectId], references: [id], onDelete: SetNull)

  @@index([userId, status])
  @@map("tasks")
}

model Habit {
  id             String     @id @default(uuid())
  userId         String
  name           String
  targetFrequency Int       @default(1) // times per day
  currentStreak  Int        @default(0)
  bestStreak     Int        @default(0)
  createdAt      DateTime   @default(now())

  user           User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  logs           HabitLog[]

  @@index([userId])
  @@map("habits")
}

model HabitLog {
  id        String   @id @default(uuid())
  habitId   String
  loggedAt  DateTime @default(now())
  dateDate  String   // Format "YYYY-MM-DD"

  habit     Habit    @relation(fields: [habitId], references: [id], onDelete: Cascade)

  @@unique([habitId, dateDate])
  @@map("habit_logs")
}

model Project {
  id          String        @id @default(uuid())
  userId      String
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  progressPct Int           @default(0)
  dueDate     String?
  createdAt   DateTime      @default(now())

  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks       Task[]

  @@index([userId])
  @@map("projects")
}

model Event {
  id        String    @id @default(uuid())
  userId    String
  title     String
  date      String    // Format "YYYY-MM-DD"
  time      String    // Format "HH:mm AM/PM"
  type      EventType @default(PERSONAL)
  createdAt DateTime  @default(now())

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, date])
  @@map("events")
}

model JournalEntry {
  id        String   @id @default(uuid())
  userId    String
  title     String?
  content   String   @db.Text
  mood      String?  // e.g. "Productive", "Calm", "Anxious"
  date      String   // Format "YYYY-MM-DD"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, date])
  @@map("journal_entries")
}

model FocusSession {
  id          String   @id @default(uuid())
  userId      String
  durationMin Int
  soundTrack  String?
  completedAt DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("focus_sessions")
}

model ChatSession {
  id        String        @id @default(uuid())
  userId    String
  title     String        @default("AI Coach Session")
  createdAt DateTime      @default(now())

  user      User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages  ChatMessage[]

  @@map("chat_sessions")
}

model ChatMessage {
  id            String      @id @default(uuid())
  chatSessionId String
  sender        String      // "user" | "assistant"
  text          String      @db.Text
  createdAt     DateTime    @default(now())

  chatSession   ChatSession @relation(fields: [chatSessionId], references: [id], onDelete: Cascade)

  @@map("chat_messages")
}
```

---

## 3. Production API Endpoints Specification

Below is the complete REST API contract for implementation in Next.js Route Handlers (`app/api/...`):

### 3.1 Authentication & User API (`/api/auth/*`)
- `POST /api/auth/register`: Create a new beta tester account.
- `POST /api/auth/login`: Authenticate user & return HTTP-Only JWT session cookie.
- `GET /api/auth/me`: Get current authenticated user profile & preferences.
- `POST /api/auth/logout`: Revoke active session token.

### 3.2 Task Management API (`/api/tasks/*`)
- `GET /api/tasks`: Fetch all tasks for active user (supports `?status=`, `?priority=`, `?projectId=`).
- `POST /api/tasks`: Create new task.
- `PATCH /api/tasks/:id`: Update status ("TODO" | "IN_PROGRESS" | "DONE"), title, priority.
- `DELETE /api/tasks/:id`: Delete a task.

### 3.3 Habit Tracking API (`/api/habits/*`)
- `GET /api/habits`: Fetch all habits with completion history for active user.
- `POST /api/habits`: Create new habit goal.
- `POST /api/habits/:id/toggle`: Toggle completion for today's date and update current streak.
- `DELETE /api/habits/:id`: Delete a habit.

### 3.4 Projects API (`/api/projects/*`)
- `GET /api/projects`: Fetch projects with calculated completion percentages.
- `POST /api/projects`: Create new project.
- `PATCH /api/projects/:id`: Update progress percentage or status.
- `DELETE /api/projects/:id`: Delete project.

### 3.5 Calendar Events API (`/api/events/*`)
- `GET /api/events`: Fetch scheduled events (supports range `?startDate=` & `?endDate=`).
- `POST /api/events`: Schedule a new focus block, meeting, or personal event.
- `DELETE /api/events/:id`: Remove scheduled event.

### 3.6 Journaling API (`/api/journal/*`)
- `GET /api/journal`: List user's journal entries by month/year.
- `POST /api/journal`: Save daily reflection or journal entry.
- `GET /api/journal/:id`: Retrieve single entry.

### 3.7 AI Coach Engine (`/api/coach/*`)
- `POST /api/coach/chat`: Stream response from LLM (OpenAI/Gemini) contextualized with user's active tasks, habits, and focus hours.

---

## 4. Middleware, Security & Rate Limiting (`middleware.ts`)

Create a Next.js `middleware.ts` at project root to protect all `/api/` and `/dashboard/` routes:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('tetheros_session')?.value;
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/api/auth');

  if ((isDashboardRoute || isApiRoute) && !token) {
    if (isApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

---

## 5. Beta Tester Onboarding & Deployment Steps (15 Testers)

### Step 1: Database Provisioning (Supabase / Neon DB)
1. Create a free/pro PostgreSQL instance on Supabase or Neon DB.
2. Obtain connection strings: `DATABASE_URL` (pooled) and `DIRECT_URL` (direct migration connection).
3. Enable `pgvector` extension in PostgreSQL console:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### Step 2: Environment Variables Configuration (`.env.production`)
Configure the following keys in Vercel or Railway deployment dashboard:

```env
# Database Connections
DATABASE_URL="postgresql://user:pass@ep-cool-db.us-east-1.aws.neon.tech/tetheros?pgbouncer=true"
DIRECT_URL="postgresql://user:pass@ep-cool-db.us-east-1.aws.neon.tech/tetheros"

# Authentication Security
NEXTAUTH_SECRET="super-secret-32-byte-string-key"
NEXTAUTH_URL="https://tetheros.vercel.app"

# AI Engine API
OPENAI_API_KEY="sk-proj-..."
# or GEMINI_API_KEY="AIzaSy..."

# Upstash Redis Rate Limiting
UPSTASH_REDIS_REST_URL="https://cool-redis-123.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AX...=="
```

### Step 3: Run Database Migration
Execute database schema push from local terminal:
```bash
npx prisma migrate dev --name init_production_schema
npx prisma db seed
```

### Step 4: Provision 15 Beta User Accounts
Seed 15 accounts for your initial beta test cohort in Prisma seed script `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const betaEmails = Array.from({ length: 15 }, (_, i) => `beta.user${i + 1}@example.com`);
  
  for (const email of betaEmails) {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: `Tester ${email.split('.')[1].split('@')[0]}`,
        role: 'BETA_TESTER',
      },
    });
  }
  console.log('15 Beta accounts successfully created!');
}

main();
```

### Step 5: Monitoring & Feedback Pipeline
1. **Sentry Error Tracking**: Set `NEXT_PUBLIC_SENTRY_DSN` to capture client-side runtime errors during user testing.
2. **Feedback Collection**: Add a "Send Feedback" modal in `Sidebar.tsx` pointing directly to a Discord webhook or Google Form for quick bug reporting.

---

*Document Version: 1.0.0 (Production Specification)*  
*Target Launch Ready: 15 Beta Testers Cohort*
