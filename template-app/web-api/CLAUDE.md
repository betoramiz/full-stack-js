# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bun-based REST API built with Hono framework, using PostgreSQL with Drizzle ORM. The architecture follows Clean Architecture principles with a feature-based organization pattern.

## Development Commands

### Running the Application
```bash
bun run dev           # Run with hot-reload
bun install          # Install dependencies
```

### Database Operations
```bash
bun run db:generate:migration  # Generate new migration from schema changes
bun run db:migrate             # Run pending migrations
bun run db:remove:migration    # Drop a migration
```

### Testing
```bash
bun run test         # Run all tests with Vitest
```

## Architecture

### Feature-Based Structure

The application is organized by features (e.g., `users`, `auth`), where each feature has:

- **Domain Entity** (`User.ts`, `Auth.ts`): Encapsulates business logic and validation. Uses static factory methods (`create()` for new instances, `reconstitute()` for DB data).
- **Use Cases** (`usecases/*.usecase.ts`): Application logic implementing specific operations. Each use case is a class with an `execute()` method.
- **Queries** (`*.queries.ts`): Database access layer using Drizzle ORM. Factory functions that return query objects.
- **Routes** (`*.routes.ts`): HTTP endpoints using Hono router. Factory functions that wire use cases to HTTP handlers.
- **Container** (`*.container.ts`): Dependency injection setup. Instantiates queries, use cases, and routes.
- **Schemas** (`*.schemas.ts`): Zod schemas for request/response validation.

### Result Pattern

The codebase uses a Result pattern (`src/shared/result.ts`) for error handling:
- `Result<T, E>` = `Success<T>` | `Failure<E>`
- Use `ok(value)` for success and `fail(error)` for failure
- Check `result.ok` to discriminate between success/failure
- The `respond()` helper (`src/shared/respond.ts`) automatically converts Results to HTTP responses

### Database Schema

Located in `src/db/schemas/`:
- `users.schema.ts`: Users table
- `auth.schema.ts`: Authentication credentials table
- `relations.ts`: Drizzle relations between tables

Tables use UUID primary keys. The `users` table references `auth` table via `authId`.

### Path Aliases

Configured in `tsconfig.json`:
- `@db/*` → `src/db/*`
- `@shared/*` → `src/shared/*`

### Authentication

- JWT-based authentication using Hono's JWT middleware
- Secret configured via `SECRET` environment variable (minimum 28 characters)
- Auth middleware applied to protected routes (see `src/shared/middleware/auth.middleware.ts`)
- Register/login flows in `src/features/auth/`

### Error Handling

- Global error handler in `src/app.ts` catches DB errors and HTTP exceptions
- `AppError` class (`src/shared/errors/AppError.ts`) for application errors with status codes
- `parseDbError()` (`src/shared/db-errors.ts`) translates database errors to user-friendly messages
- Use cases return `Result<T, ErrorResponse>` instead of throwing exceptions

### Environment Configuration

Required environment variables (validated via Zod in `src/env.config.ts`):
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: development | production | test
- `SECRET`: JWT signing secret (min 28 chars)

## Testing

Tests use Vitest and are colocated in `tests/` folders within each feature directory. Test files follow the pattern `*.spec.ts`.

## Adding New Features

1. Create feature directory under `src/features/`
2. Define domain entity with static factory methods
3. Create database schema in `src/db/schemas/`
4. Generate and run migration
5. Implement queries factory function
6. Create use cases with `execute()` methods returning `Result`
7. Define Zod validation schemas
8. Create routes factory function using `zValidator` middleware
9. Wire everything in container file
10. Register routes in `src/index.ts`
