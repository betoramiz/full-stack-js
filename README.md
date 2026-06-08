# Pitaya Fullstack TypeScript Starter

A modern, high-performance Fullstack TypeScript template designed to accelerate the development of web applications. This project offers a robust development environment out of the box, combining a fast Bun-powered backend, a client application workspace, and custom developer tools.

## Repository Structure

The project is organized into three main directories:

- **[`web-api/`](file:///c:/code/Pitaya/fullstack-js/web-api)**: High-performance backend API.
- **[`web-ui/`](file:///c:/code/Pitaya/fullstack-js/web-ui)**: Client application (intended for Angular).
- **[`tools/`](file:///c:/code/Pitaya/fullstack-js/tools)**: Developer CLI tools for automating workflow scaffolding.

---

## Backend: `web-api`

The backend is a light, fast, and secure API built on top of modern JavaScript runtimes and frameworks.

### Tech Stack
* **Runtime**: [Bun](https://bun.sh/) — ultra-fast JavaScript/TypeScript runtime, bundler, and package manager.
* **Framework**: [Hono](https://hono.dev/) — minimalist, lightweight, and fast web framework.
* **ORM**: [Drizzle ORM](https://orm.drizzle.team/) — type-safe, lightweight TypeScript ORM for SQL databases.
* **Database**: [PostgreSQL](https://www.postgresql.org/) — robust open-source relational database.
* **Validation**: [Zod](https://zod.dev/) — TypeScript-first schema declaration and validation.
* **Logging**: [Pino](https://github.com/pinojs/pino) — low overhead JSON logger.
* **Testing**: [Vitest](https://vitest.dev/) — fast, next-generation testing framework.

### Getting Started

1. Navigate to the backend directory:
   ```bash
   cd web-api
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Configure environment variables. Copy the `.env.example` file (or create a `.env` file) with your configuration:
   ```env
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   ```
4. Run database migrations:
   ```bash
   bun run db:generate:migration
   bun run db:migrate
   ```
5. Start the development server (with hot-reloading):
   ```bash
   bun run dev
   ```
6. Run unit/integration tests:
   ```bash
   bun run test
   ```

---

## Frontend: `web-ui`

This directory is designated for the frontend user interface application.

* **Status**: **Pending Documentation & Setup**
* **Target Stack**: [Angular](https://angular.dev/)
* **Note**: Currently, the `web-ui` workspace is empty. Documentation, setup instructions, and frontend architecture details will be added here once the Angular application is initialized.

---

## Developer Tools: `tools`

To maintain a consistent codebase structure and speed up development, this repository includes a custom CLI tool (`create-feature`) for scaffolding new backend modules.

For detailed instructions, refer to the [tools documentation](file:///c:/code/Pitaya/fullstack-js/tools/README.md).

### How to Scaffold a Feature

When you need to add a new domain or module (e.g., `products`, `orders`) to the `web-api` backend:

1. Use the scaffolding CLI tool:
   ```bash
   bunx --cwd tools create-feature purchases --base-dir ../web-api/src/features
   ```
   *Alternatively, if you installed the package dependencies inside `tools`, you can run `bunx create-feature` from the project directories.*

2. This will generate a consistent clean architecture directory structure in your features directory:
   ```txt
   web-api/src/features/purchases/
     ├── tests/
     ├── usecases/
     ├── Purchases.ts
     ├── purchases.container.ts
     ├── purchases.dtos.ts
     ├── purchases.queries.ts
     ├── purchases.routes.ts
     └── purchases.schemas.ts
   ```

3. Register your new routes container in [`web-api/src/index.ts`](file:///c:/code/Pitaya/fullstack-js/web-api/src/index.ts).

---

## Prerequisites

To run this repository locally, you will need:

* [Bun](https://bun.sh/) (>= 1.0.0) installed on your system.
* A running instance of [PostgreSQL](https://www.postgresql.org/).
