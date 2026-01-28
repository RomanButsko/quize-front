# Quize Frontend

A quiz builder application where you can create, edit, and publish quizzes. Built with Next.js 16 and designed with scalability in mind.

## What is this?

This is the frontend for a quiz management system. You can:

- View a dashboard of all your quizzes
- Create new quizzes with a drag-and-drop editor
- Add different block types: headings, questions (text, radio, checkbox), buttons, footers
- Save drafts and publish when ready
- View published quizzes

## Tech Stack

| Technology                | Why                                                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Next.js 16**            | Latest App Router with React Server Components. Gives us great SSR, file-based routing, and server-side data fetching out of the box.                                                                                                            |
| **TypeScript**            | Type safety. Catches bugs early and makes refactoring less scary.                                                                                                                                                                                |
| **Material UI 7**         | Comprehensive component library. Speeds up development significantly when you need consistent, accessible UI components.                                                                                                                         |
| **TanStack Query**        | Server state management done right. Handles caching, background refetching, and loading states. Much cleaner than managing API state manually.                                                                                                   |
| **Redux Toolkit**         | Client state for the quiz editor. Zustand would be a lighter alternative for this project's scope, but Redux was chosen for its superior DevTools (time-travel debugging is helpful with complex editor state) and predictable reducer patterns. |
| **dnd-kit**               | Drag and drop for the quiz editor. Modern, accessible, and works well with React 18+.                                                                                                                                                            |
| **Feature-Sliced Design** | Architectural methodology. More on this below.                                                                                                                                                                                                   |

## Architecture: Feature-Sliced Design (FSD)

The codebase follows [Feature-Sliced Design](https://feature-sliced.design/) — an architectural methodology for frontend projects. The folder structure might look unusual if you haven't seen it before:

```
src/
├── app/          # Next.js App Router pages and layouts
├── widgets/      # Large, self-contained UI blocks (Header, QuizTable, EditorCanvas)
├── features/     # User interactions and business logic (quiz-editor, quiz-render)
├── entities/     # Business entities (quiz, quiz-block)
├── shared/       # Reusable utilities, UI components, API client, store
```

**Why FSD?**

- Clear boundaries between layers
- Easy to find where code should live
- Scales well as the project grows
- Enforces unidirectional dependencies (widgets can use features, features can use entities, etc.)

**A note on "over-engineering":** Some parts of this codebase might seem more structured than necessary for the current feature set. That's intentional — the project was built with expansion in mind. For example, the API layer has separate query factories, dedicated mutation hooks, and centralized route definitions. For a small app, you could inline all of this. But when you're adding more entities and features, having this structure already in place saves time.

## Running Locally

### Prerequisites

- Node.js 20+
- npm
- Backend API running (see backend repo)

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If not set, defaults to `http://localhost:8000`.

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start development server     |
| `npm run build`     | Build for production         |
| `npm run start`     | Start production server      |
| `npm run lint`      | Run ESLint                   |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format`    | Format code with Prettier    |

## Known Limitations & Trade-offs

Given the small scope of this application and the timeframe for completion, some features were intentionally left out. These are things I'd add in a production environment:

### Quiz submission isn't fully functional

The "submit quiz" flow exists in the UI, but the actual submission logic (collecting answers, sending to backend, showing results) isn't complete. This wasn't a priority for the current phase — the focus was on the quiz builder and management side. The foundation is there, it just needs the actual implementation.

### Next.js features not utilized

- **No caching strategies** — I'm not using route segment caching, or `revalidate` options. For a larger app with more traffic, proper caching would reduce server load and improve response times.
- **No Incremental Static Regeneration (ISR)** — Published quizzes could be statically generated and revalidated on-demand, but currently everything is fetched fresh.
- **No Streaming / Suspense boundaries** — Could improve perceived performance by streaming content progressively instead of waiting for all data.
- **No Parallel Routes or Intercepting Routes** — These could be useful for modals (e.g., quick quiz preview) but weren't needed for current functionality.

### Missing application features

- **No autosave** — Currently requires manual save. Autosave with debouncing would prevent data loss.
- **No quiz duplication** — Can't clone an existing quiz as a starting point.
- **No block templates** — Pre-built block combinations could speed up quiz creation.

### No authentication

There's no user authentication. All quizzes are visible to everyone. In a real product, I'd want user accounts, permissions, etc.

### No optimistic updates

Mutations wait for the server response before updating the UI. For a snappier feel, I could add optimistic updates to the save/publish actions.

### No error boundaries

If something crashes, we get the default Next.js error page. App should have proper error boundaries with recovery options.

### No tests

There are no unit or integration tests. For a production app, I'd want tests for the editor logic, API layer, and critical user flows.

## API Expectations

The frontend expects a REST API with these endpoints:

| Method | Endpoint               | Description      |
| ------ | ---------------------- | ---------------- |
| GET    | `/quizzes`             | List all quizzes |
| GET    | `/quizzes/:id`         | Get quiz by ID   |
| POST   | `/quizzes`             | Create new quiz  |
| PUT    | `/quizzes/:id`         | Update quiz      |
| POST   | `/quizzes/:id/publish` | Publish quiz     |

## Project Structure Highlights

```
src/
├── app/                      # Next.js pages
│   ├── page.tsx              # Dashboard
│   ├── quiz/[id]/            # View quiz
│   └── quiz/edit/[id]/       # Edit quiz
├── entities/
│   ├── quiz/
│   │   ├── api/              # Query & mutation hooks
│   │   └── model/            # Types, mappers, query keys
│   └── quiz-block/
│       ├── model/            # Block type definitions
│       └── ui/               # Block render components
├── features/
│   ├── quiz-editor/          # Editor DnD logic
│   └── quiz-render/          # Quiz display logic
├── widgets/
│   ├── editor-canvas/        # Main editor area
│   ├── editor-layout/        # Editor page layout
│   ├── header/               # App header with save/publish
│   └── quiz-table/           # Dashboard table
└── shared/
    ├── api/                  # API client, routes, query client
    ├── store/                # Redux store & editor slice
    └── ui/                   # Shared UI components
```
