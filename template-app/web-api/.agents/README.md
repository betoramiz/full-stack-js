# Agent Skills for Web API

This directory contains specialized skills for building and maintaining the Bun + Hono + Drizzle web API using Clean Architecture principles.

## Skills Overview

### Core Architecture Skills

#### 1. **ts-architecture**
Complete architectural guidance for the backend, including feature module structure, layer responsibilities, and cross-cutting concerns.

**Use when:**
- Adding new feature modules
- Refactoring existing code
- Understanding project organization
- Working with containers and dependency injection

**Key references:**
- `project-map.md` - Comprehensive architecture overview
- `feature-module-example.md` - Complete feature implementation

#### 2. **ts-usecases**
Application use case patterns using the Result monad for error handling.

**Use when:**
- Implementing business logic
- Creating CRUD operations
- Handling expected failures
- Coordinating domain entities with persistence

**Key references:**
- `usecase-patterns.md` - Common use case shapes (create, get, update, delete)
- `detailed-examples.md` - Complete examples with proper imports
- `auth-examples.md` - Real authentication use cases with bcrypt and JWT

#### 3. **ts-routing**
Hono routing, middleware, validation, and HTTP layer patterns.

**Use when:**
- Creating HTTP endpoints
- Applying authentication or logging
- Validating requests with Zod
- Formatting responses

**Key references:**
- `middleware-guide.md` - Auth, logging, and custom middleware
- `validation-guide.md` - Zod schema patterns and error handling
- `response-patterns.md` - Using the `respond()` helper

### Database Skills

#### 4. **db-migrations**
Database schema definitions, migrations, and advanced Drizzle ORM patterns.

**Use when:**
- Creating or modifying database tables
- Generating migrations
- Writing complex queries
- Implementing transactions

**Key references:**
- `migrations-guide.md` - Schema conventions and migration workflow
- `drizzle-patterns.md` - Complex queries, joins, and transactions

### Quality Assurance

#### 5. **ts-testing**
Testing strategy and patterns for domain entities, use cases, and routes using Vitest.

**Use when:**
- Writing unit tests for entities
- Testing use cases with mocks
- Integration testing routes
- Database integration tests

**Key references:**
- `testing-strategy.md` - Test design principles
- `test-examples.md` - Complete test implementations

### Rapid Development

#### 6. **quick-api**
Step-by-step checklist for rapidly building complete API features.

**Use when:**
- Starting a new feature from scratch
- Need a quick reference
- Want to ensure nothing is missed

**Key references:**
- `common-operations.md` - Update, delete, search, pagination patterns

## Skill Selection Guide

Choose the appropriate skill based on your task:

| Task | Primary Skill | Secondary Skills |
|------|--------------|------------------|
| Add new feature | quick-api | ts-architecture, ts-usecases |
| Add authentication | ts-usecases (auth-examples) | ts-routing, db-migrations |
| Create endpoint | ts-routing | ts-usecases |
| Database schema | db-migrations | ts-architecture |
| Business logic | ts-usecases | ts-architecture |
| Write tests | ts-testing | ts-usecases, ts-routing |
| Complex query | db-migrations (drizzle-patterns) | ts-usecases |
| Add middleware | ts-routing (middleware-guide) | ts-architecture |
| Validation | ts-routing (validation-guide) | ts-usecases |

## Architecture Principles

All skills follow these core principles:

1. **Clean Architecture** - Features organized in layers (domain, use case, infrastructure)
2. **Result Pattern** - Use cases return `Result<T, ErrorResponse>` instead of throwing
3. **Factory Pattern** - Routes, queries, and entities use factory functions
4. **Dependency Injection** - Containers wire dependencies explicitly
5. **Domain Validation** - Entities enforce invariants, routes validate input shape
6. **Explicit Failures** - Expected errors return `fail(AppError.*)`, unexpected errors throw
7. **Path Aliases** - Use `@db/*` and `@shared/*` for imports
8. **TypeScript Extensions** - All imports use `.ts` extensions

## Common Patterns

### Creating a Resource

```
Schema → Entity → Queries → UseCase → Route → Container → Mount
```

### Result Handling

```ts
// Use case
const result = Entity.create(...);
if (!result.ok) {
  return fail(result.error);
}

// Route
const result = await useCase.execute(command);
return respond(c, result);
```

### Middleware Order

```
Logger → Auth → Routes
```

### Error Handling

```
Validation errors → 400 with { errors: {...} }
Business errors → Result.fail → respond() → { error: "..." }
Unexpected errors → Global handler → 500
```

## File Organization

```
src/
├── app.ts                 # Hono app and global error handler
├── index.ts              # Entry point and route mounting
├── env.config.ts         # Environment validation
├── db/
│   ├── connection.ts     # Database client
│   ├── drizzle.config.ts # Migration config
│   └── schemas/          # Table schemas
│       ├── index.ts
│       ├── users.schema.ts
│       ├── auth.schema.ts
│       └── relations.ts
├── shared/               # Cross-cutting concerns
│   ├── result.ts
│   ├── respond.ts
│   ├── errors/
│   │   ├── AppError.ts
│   │   └── ErrorTypes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── logger.middleware.ts
│   ├── validation-errors.ts
│   └── db-errors.ts
└── features/
    └── <feature>/
        ├── <Feature>.ts
        ├── <feature>.schemas.ts
        ├── <feature>.queries.ts
        ├── <feature>.routes.ts
        ├── <feature>.container.ts
        ├── usecases/
        │   ├── create.usecase.ts
        │   ├── getById.usecase.ts
        │   ├── list.usecase.ts
        │   └── errors.ts
        └── tests/
            ├── <Feature>.spec.ts
            └── usecases/
                └── create.usecase.spec.ts
```

## Quick Commands

```bash
# Development
bun run dev                     # Start with hot reload

# Database
bun run db:generate:migration   # Generate migration
bun run db:migrate             # Apply migrations
bun run db:remove:migration    # Drop migration

# Testing
bun run test                   # Run all tests
```

## Best Practices

1. **Start with quick-api** for new features
2. **Read references** before implementing complex patterns
3. **Follow the checklist** to ensure completeness
4. **Write tests** as you build features
5. **Use typed queries** via ReturnType pattern
6. **Apply middleware** in correct order
7. **Validate early** with Zod schemas
8. **Keep routes thin** - logic belongs in use cases
9. **Test domain** entities in isolation
10. **Document patterns** when you discover new ones

## Contributing to Skills

When updating skills:

1. Keep examples based on actual codebase
2. Update references when patterns change
3. Add new patterns to appropriate skill
4. Keep README.md in sync
5. Test examples before documenting
