import path from "path";
import {
  getMaitonConfig,
  MaitonConfig,
  RawMaitonConfig,
  resolveConfigPaths,
} from "@/src/utils/get-config";
import fg from "fast-glob";
import fs from "fs-extra";
import { loadConfig } from "tsconfig-paths";

type ProjectInfo = {
  framework: Framework;
  isSrcDir: boolean;
  isRSC: boolean;
  isTsx: boolean;
  aliasPrefix: string | null;
};

const PROJECT_SHARED_IGNORE = [
  "**/node_modules/**",
  ".next",
  "public",
  "dist",
  "build",
];

export const FRAMEWORKS = {
  "next-app": {
    name: "next-app",
    label: "Next.js",
    links: {
      installation: "https://www.maiton.xyz/getting-started",
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  "next-pages": {
    name: "next-pages",
    label: "Next.js",
    links: {
      installation: "https://www.maiton.xyz/getting-started",
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  manual: {
    name: "manual",
    label: "Manual",
    links: {
      installation: "https://www.maiton.xyz/getting-started",
      tailwind: "https://tailwindcss.com/docs/installation",
    },
  },
};

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS];

export async function getProjectInfo(cwd: string): Promise<ProjectInfo | null> {
  const [configFiles, isSrcDir, isTsx, aliasPrefix] = await Promise.all([
    fg.glob("**/{next,vite,astro}.config.*|gatsby-config.*|composer.json", {
      cwd,
      deep: 3,
      ignore: PROJECT_SHARED_IGNORE,
    }),
    fs.pathExists(path.resolve(cwd, "src")),
    isTypeScriptProject(cwd),
    getTsConfigAliasPrefix(cwd),
  ]);

  const isUsingAppDir = await fs.pathExists(
    path.resolve(cwd, `${isSrcDir ? "src/" : ""}app`)
  );

  const type: ProjectInfo = {
    framework: FRAMEWORKS["manual"],
    isSrcDir,
    isRSC: false,
    isTsx,
    aliasPrefix,
  };

  // Next.js.
  if (configFiles.find((file) => file.startsWith("next.config."))?.length) {
    type.framework = isUsingAppDir
      ? FRAMEWORKS["next-app"]
      : FRAMEWORKS["next-pages"];
    type.isRSC = isUsingAppDir;
    return type;
  }

  return type;
}

export async function getTsConfigAliasPrefix(cwd: string) {
  const tsConfig = await loadConfig(cwd);

  if (tsConfig?.resultType === "failed" || !tsConfig?.paths) {
    return null;
  }

  // This assume that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (
      paths.includes("./*") ||
      paths.includes("./src/*") ||
      paths.includes("./app/*")
    ) {
      return alias.at(0) ?? null;
    }

    if (paths.includes("./@/*")) {
      // invalid alias for now
      // so rewrite it inside the tsconfig.json
      const currentTsConfig = await fs.readJSON(`${cwd}/tsconfig.json`);
      const validPathTsConfig = {
        ...currentTsConfig,
        compilerOptions: {
          ...currentTsConfig.compilerOptions,
          paths: {
            ...currentTsConfig.compilerOptions.paths,
            [alias]: paths.map((path) => path.replace("./@/", "./")),
          },
        },
      };
      fs.writeFile(
        `${cwd}/tsconfig.json`,
        JSON.stringify(validPathTsConfig, null, 2),
        "utf-8"
      );
      return alias.at(0) ?? null;
    }
  }

  return null;
}

export async function isTypeScriptProject(cwd: string) {
  const files = await fg.glob("tsconfig.*", {
    cwd,
    deep: 1,
    ignore: PROJECT_SHARED_IGNORE,
  });

  return files.length > 0;
}

export async function getTsConfig() {
  try {
    const tsconfigPath = path.join("tsconfig.json");
    const tsconfig = await fs.readJSON(tsconfigPath);

    if (!tsconfig) {
      throw new Error("tsconfig.json is missing");
    }

    return tsconfig;
  } catch (error) {
    return null;
  }
}

export async function getProjectConfig(
  cwd: string,
  defaultProjectInfo: ProjectInfo | null = null
): Promise<MaitonConfig | null> {
  // Check for existing component config.
  const [existingConfig, projectInfo] = await Promise.all([
    getMaitonConfig(cwd),
    !defaultProjectInfo
      ? getProjectInfo(cwd)
      : Promise.resolve(defaultProjectInfo),
  ]);

  if (existingConfig) {
    return existingConfig;
  }

  if (!projectInfo) {
    return null;
  }

  const config: RawMaitonConfig = {
    $schema: "https://maiton.xyz/schema.json",
    rsc: projectInfo.isRSC,
    tsx: projectInfo.isTsx,
    style: "default",
    aliases: {
      components: `${projectInfo.aliasPrefix}/app/frames/components`,
      lib: `${projectInfo.aliasPrefix}/app/frames/lib`,
      utils: `${projectInfo.aliasPrefix}/app/frames/lib/utils`,
    },
  };

  return await resolveConfigPaths(cwd, config);
}
