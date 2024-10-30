import { components } from "@/registry/registry-components";
import { lib } from "@/registry/registry-lib";
import { Registry } from "@/registry/schema";

export const registry: Registry = [...lib, ...components];
