#!/usr/bin/env node
import { example } from "@/src/commands/example";
import { Command } from "commander";

import { description, version } from "../package.json";
import { add } from "./commands/add";
import { init } from "./commands/init";

function main() {
  const program = new Command()
    .name("maiton")
    .description(description)
    .version(version || "0.0.0", "-v, --version", "display the version number");

  program.addCommand(example).addCommand(init).addCommand(add);

  program.parse();
}

main();
