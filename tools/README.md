# Bun Hono Feature CLI

A small scaffolding CLI for generating consistent feature folders in Bun and Hono applications.

## Install

From a local path:

```bash
bun add -d ../path/to/bun-hono-feature-cli
```

From a published package:

```bash
bun add -d bun-hono-feature-cli
```

## Usage

```bash
bun-hono-feature generate-feature purchases --base-dir src/features
```

This creates:

```txt
src/features/purchases/
  tests/
  usecases/
  Purchases.ts
  purchases.container.ts
  purchases.dtos.ts
  purchases.queries.ts
  purchases.routes.ts
  purchases.schemas.ts
```

## Interactive Usage

If no feature name is passed, the CLI prompts for one:

```bash
bun-hono-feature generate-feature
```

## Templates

Templates are stored in:

```txt
templates/
```

Available variables:

```txt
{{featureName}}          kebab-case feature name, for example credit-cards
{{FeatureName}}          PascalCase feature name, for example CreditCards
{{featureVariableName}}  underscore variable name, for example credit_cards
```
