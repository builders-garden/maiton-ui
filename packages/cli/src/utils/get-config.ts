import path from "path";
import { highlighter } from "@/src/utils/highlighter";
import { resolveImport } from "@/src/utils/resolve-import";
import { cosmiconfig } from "cosmiconfig";
import { loadConfig } from "tsconfig-paths";
import { z } from "zod";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "@/components";
export const DEFAULT_UTILS = "@/lib/utils";
export const DEFAULT_TAILWIND_CSS = "app/globals.css";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig("components", {
  searchPlaces: ["components.json"],
});

export const rawMaitonConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    rsc: z.coerce.boolean().default(false),
    tsx: z.coerce.boolean().default(true),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      lib: z.string().optional(),
      ui: z.string().optional(),
    }),
  })
  .strict();

export type RawMaitonConfig = z.infer<typeof rawMaitonConfigSchema>;

export const configMaitonSchema = rawMaitonConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
  }),
});

export type MaitonConfig = z.infer<typeof configMaitonSchema>;

export async function getMaitonConfig(cwd: string) {
  const config = await getRawMaitonConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function resolveConfigPaths(cwd: string, config: RawMaitonConfig) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd);

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${
        tsConfig.message ?? ""
      }`.trim()
    );
  }

  return configMaitonSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      components: await resolveImport(config.aliases["components"], tsConfig),
      // ui: config.aliases["ui"]
      //   ? await resolveImport(config.aliases["ui"], tsConfig)
      //   : path.resolve(
      //       (await resolveImport(config.aliases["components"], tsConfig)) ??
      //         cwd,
      //       "ui"
      //     ),
      lib: config.aliases["lib"]
        ? await resolveImport(config.aliases["lib"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["utils"], tsConfig)) ?? cwd,
            ".."
          ),
    },
  });
}

export async function getRawMaitonConfig(
  cwd: string
): Promise<RawMaitonConfig | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return configMaitonSchema.parse(configResult.config);
  } catch (error) {
    console.error(error);
    const componentPath = `${cwd}/components.json`;
    throw new Error(
      `Invalid configuration found in ${highlighter.info(componentPath)}.`
    );
  }
}
