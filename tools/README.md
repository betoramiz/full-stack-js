# Core CLI (`create-feature`)

A small scaffolding CLI for generating consistent feature folders in Bun and Hono applications.

## Installation

You can install this tool as a development dependency.

From the local directory:

```bash
bun add -d ./tools
```

Or from a published package (if applicable):

```bash
bun add -d core-cli
```

## Usage

Once installed, the CLI is available via the `create-feature` command (using `bunx`).

### Generate a Feature

You can run the default generator command using `create-feature` directly:

```bash
bunx create-feature purchases --base-dir src/features
```

#### Shortcuts / Aliases

The default command is `generate-feature` (alias `gf`). Because it is configured as the default command, you can run it in any of the following ways:

- **Direct (Implicit command):**
  ```bash
  bunx create-feature purchases --base-dir src/features
  ```
- **With shortcut (`gf`):**
  ```bash
  bunx create-feature gf purchases --base-dir src/features
  ```
- **Explicit command (`generate-feature`):**
  ```bash
  bunx create-feature generate-feature purchases --base-dir src/features
  ```

This creates the following structure:

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

### Interactive Mode

If you do not pass a feature name, the CLI will prompt you for one:

```bash
bunx create-feature
```

## Options

- `-b, --base-dir <path>`: The base directory where the feature folder will be generated (defaults to `.` if not specified).

## Templates

Templates are stored in:

```txt
templates/
```

Available variables in templates:

```txt
{{featureName}}          kebab-case feature name (e.g., credit-cards)
{{FeatureName}}          PascalCase feature name (e.g., CreditCards)
{{featureVariableName}}  underscore variable name (e.g., credit_cards)
```
