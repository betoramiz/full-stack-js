#!/usr/bin/env bun

const fs = require("node:fs/promises");
const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const { Command } = require("commander");
const Handlebars = require("handlebars");

const program = new Command();
const templatesDir = path.join(__dirname, "templates");

function toKebabCase(value) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function toPascalCase(value) {
  return toKebabCase(value)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function assertValidFeatureName(featureName) {
  if (!featureName) {
    throw new Error("Feature name is required.");
  }

  if (!/^[a-z][a-z0-9-]*$/.test(featureName)) {
    throw new Error(
      "Feature name must use kebab-case and start with a letter. Example: credit-cards",
    );
  }
}

function resolveFeaturePath(baseDir, featureName) {
  const cwd = process.cwd();
  const resolvedBaseDir = path.resolve(cwd, baseDir);
  const featurePath = path.resolve(resolvedBaseDir, featureName);

  if (!featurePath.startsWith(resolvedBaseDir + path.sep) && featurePath !== resolvedBaseDir) {
    throw new Error("Feature path must stay inside the selected base directory.");
  }

  return featurePath;
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function renderTemplate(templateName, variables) {
  const templatePath = path.join(templatesDir, templateName);
  const templateSource = await fs.readFile(templatePath, "utf8");
  const template = Handlebars.compile(templateSource, { noEscape: true, strict: true });

  return template(variables);
}

async function buildFiles(featureName) {
  const featureClassName = toPascalCase(featureName);
  const featureVariableName = featureName.replaceAll("-", "_");
  const templateVariables = {
    featureName,
    FeatureName: featureClassName,
    featureVariableName,
  };

  return [
    {
      path: `${featureClassName}.ts`,
      content: await renderTemplate("Feature.ts.hbs", templateVariables),
    },
    {
      path: `${featureName}.container.ts`,
      content: await renderTemplate("feature.container.ts.hbs", templateVariables),
    },
    {
      path: `${featureName}.dtos.ts`,
      content: await renderTemplate("feature.dtos.ts.hbs", templateVariables),
    },
    {
      path: `${featureName}.queries.ts`,
      content: await renderTemplate("feature.queries.ts.hbs", templateVariables),
    },
    {
      path: `${featureName}.routes.ts`,
      content: await renderTemplate("feature.routes.ts.hbs", templateVariables),
    },
    {
      path: `${featureName}.schemas.ts`,
      content: await renderTemplate("feature.schemas.ts.hbs", templateVariables),
    },
  ];
}

async function promptForFeatureName() {
  const rl = readline.createInterface({ input, output });

  try {
    return await rl.question("Feature name: ");
  } finally {
    rl.close();
  }
}

async function createFeature(rawName, options) {
  const promptedName = rawName || (await promptForFeatureName());
  const featureName = toKebabCase(promptedName);

  assertValidFeatureName(featureName);

  const featurePath = resolveFeaturePath(options.baseDir, featureName);
  const files = await buildFiles(featureName);

  await fs.mkdir(path.join(featurePath, "tests"), { recursive: true });
  await fs.mkdir(path.join(featurePath, "usecases"), { recursive: true });

  const createdFiles = [];
  const skippedFiles = [];

  for (const file of files) {
    const filePath = path.join(featurePath, file.path);

    if (await pathExists(filePath)) {
      skippedFiles.push(filePath);
      continue;
    }

    await fs.writeFile(filePath, file.content, "utf8");
    createdFiles.push(filePath);
  }

  console.log(`Feature generated at ${featurePath}`);

  if (createdFiles.length > 0) {
    console.log("\nCreated files:");
    createdFiles.forEach((filePath) => console.log(`- ${path.relative(process.cwd(), filePath)}`));
  }

  if (skippedFiles.length > 0) {
    console.log("\nSkipped existing files:");
    skippedFiles.forEach((filePath) => console.log(`- ${path.relative(process.cwd(), filePath)}`));
  }
}

program
  .name("create-feature")
  .description("Generate consistent feature folders for Bun and Hono applications")
  .version("0.1.0");

program
  .command("generate-feature", { isDefault: true })
  .alias("gf")
  .description("Generate a feature directory structure")
  .argument("[name]", "Feature name in kebab-case")
  .option("-b, --base-dir <path>", "Base directory where the feature will be generated", ".")
  .action(async (name, options) => {
    try {
      await createFeature(name, options);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  });

program.parseAsync(process.argv);
