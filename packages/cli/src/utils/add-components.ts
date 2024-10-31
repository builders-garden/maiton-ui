import { MaitonConfig } from "@/src/utils/get-config";
import { handleError } from "@/src/utils/handle-error";
import { logger } from "@/src/utils/logger";
import { registryResolveItemsTree } from "@/src/utils/registry";
import { spinner } from "@/src/utils/spinner";
import { updateFiles } from "@/src/utils/updaters/update-files";

export async function addComponents(
  components: string[],
  config: MaitonConfig,
  options: {
    overwrite?: boolean;
    silent?: boolean;
    isNewProject?: boolean;
  }
) {
  options = {
    overwrite: false,
    silent: false,
    isNewProject: false,
    ...options,
  };

  const registrySpinner = spinner(`Checking registry.`, {
    silent: options.silent,
  })?.start();
  const tree = await registryResolveItemsTree(components, config);
  if (!tree) {
    registrySpinner?.fail();
    return handleError(new Error("Failed to fetch components from registry."));
  }
  registrySpinner?.succeed();

  await updateFiles(tree.files, config, {
    overwrite: options.overwrite,
    silent: options.silent,
  });

  if (tree.docs) {
    logger.info(tree.docs);
  }
}
