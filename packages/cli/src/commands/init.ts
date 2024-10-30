import { existsSync, promises as fs } from "fs";
import path from "path";
import { preFlightInit } from "@/src/preflights/preflight-init";
import { resolveConfigPaths } from "@/src/utils/get-config";
import { getPackageManager } from "@/src/utils/get-package-manager";
import { getProjectConfig, getProjectInfo } from "@/src/utils/get-project-info";
import { handleError } from "@/src/utils/handle-error";
import { highlighter } from "@/src/utils/highlighter";
import { logger } from "@/src/utils/logger"; // simple custom logger with highlighter

import { Command } from "commander";
import { execa } from "execa";
import prompts from "prompts";
import { z } from "zod";

import { addComponents } from "../utils/add-components";
import { spinner } from "../utils/spinner";

const PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

export const initOptionsSchema = z.object({
  cwd: z.string(),
  // components: z.array(z.string()).optional(),
  yes: z.boolean(),
  defaults: z.boolean(),
  force: z.boolean(),
  silent: z.boolean(),
  isNewProject: z.boolean(),
  srcDir: z.boolean().optional(),
});

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", true)
  .option("-d, --defaults,", "use default configuration.", false)
  .option("-f, --force", "force overwrite of existing configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-s, --silent", "mute output.", false)
  .option(
    "--src-dir",
    "use the src directory when creating a new project.",
    false
  )
  .action(async (opts) => {
    try {
      // use this to log a deprecation message
      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        isNewProject: false,
        ...opts,
      });

      await runInit(options);

      logger.log(
        `${highlighter.success(
          "Success!"
        )} Project initialization completed.\nYou may now add components.`
      );
      logger.break();
    } catch (error) {
      handleError(error);
    }
  });

// export async function runInit(cwd: string, config: Config) {
//   const spinner = ora(`Initializing project...`)?.start();

//   // Ensure all resolved paths directories exist.
//   for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
//     // Determine if the path is a file or directory.
//     // TODO: is there a better way to do this?
//     let dirname = path.extname(resolvedPath)
//       ? path.dirname(resolvedPath)
//       : resolvedPath;

//     // If the utils alias is set to something like "@/lib/utils",
//     // assume this is a file and remove the "utils" file name.
//     // TODO: In future releases we should add support for individual utils.
//     if (key === "utils" && resolvedPath.endsWith("/utils")) {
//       // Remove /utils at the end.
//       dirname = dirname.replace(/\/utils$/, "");
//     }

//     if (!existsSync(dirname)) {
//       await fs.mkdir(dirname, { recursive: true });
//     }
//   }

//   const extension = config.tsx ? "ts" : "js";

//   // Write cn file.
//   await fs.writeFile(
//     `${config.resolvedPaths.utils}.${extension}`,
//     extension === "ts" ? templates.UTILS : templates.UTILS_JS,
//     "utf8"
//   );

//   spinner?.succeed();

//   // Install dependencies.
//   const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
//   const packageManager = await getPackageManager(cwd);

//   // TODO: add support for other icon libraries.
//   const deps = [
//     ...PROJECT_DEPENDENCIES,
//     config.style === "new-york" ? "@radix-ui/react-icons" : "lucide-react",
//   ];

//   await execa(
//     packageManager,
//     [packageManager === "npm" ? "install" : "add", ...deps],
//     {
//       cwd,
//     }
//   );
//   dependenciesSpinner?.succeed();
// }

export async function runInit(
  options: z.infer<typeof initOptionsSchema> & {
    skipPreflight?: boolean;
  }
) {
  let projectInfo;
  if (!options.skipPreflight) {
    const preflight = await preFlightInit(options);
    projectInfo = preflight.projectInfo;
  } else {
    projectInfo = await getProjectInfo(options.cwd);
  }

  const projectConfig = await getProjectConfig(options.cwd, projectInfo);

  if (!projectConfig) {
    throw new Error("Failed to get project configuration.");
  }

  if (!options.yes) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlighter.info(
        "components.json"
      )}. Proceed?`,
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  // Write components.json.
  const componentSpinner = spinner(`Writing components.json.`).start();
  const targetPath = path.resolve(options.cwd, "components.json");
  await fs.writeFile(
    targetPath,
    JSON.stringify(projectConfig, null, 2),
    "utf8"
  );
  componentSpinner.succeed();

  // // Add components.
  const fullConfig = await resolveConfigPaths(options.cwd, projectConfig);

  const dependenciesSpinner = spinner(`Installing dependencies...`).start();
  const packageManager = await getPackageManager(options.cwd);
  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...PROJECT_DEPENDENCIES],
    {
      cwd: options.cwd,
    }
  );
  dependenciesSpinner.succeed();

  // Write cn file.
  const utilsSpinner = spinner(`Writing utils file...`).start();
  await addComponents(["utils"], projectConfig, {
    overwrite: true,
    silent: options.silent,
    isNewProject: options.isNewProject,
  });
  utilsSpinner.succeed();

  return fullConfig;
}
