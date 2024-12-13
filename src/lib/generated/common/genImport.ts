import { CommonConfig } from "./config";
import template from "lodash.template";

const importTemplate = `import <%= componentName %> from './components/<%= componentName %>';`;

export function generateImport(config: CommonConfig): string {
  const { componentName } = config;

  const compiled = template(importTemplate);
  return compiled({
    componentName,
  }).trim();
}
