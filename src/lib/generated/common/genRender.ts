import template from "lodash.template";
import { CommonConfig } from "./config";
import { lowerFirstLetter } from "../../utils";

const renderTemplate = `{<%= baseName %>Open && (
  <<%= componentName %>
    <%= baseName %>Open={<%= baseName %>Open}
    on<%= componentName %>Cancel={<%= baseName %>Cancel}
    <%= baseName %>Value={<%= baseName %>Value}
  />
)}`;

export function generateRender(config: CommonConfig): string {
  const { componentName } = config;
  const baseName = lowerFirstLetter(componentName);

  const compiled = template(renderTemplate);
  return compiled({
    componentName,
    baseName,
  }).trim();
}
