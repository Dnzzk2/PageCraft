import template from "lodash.template";
import { CommonConfig } from "./config";
import { lowerFirstLetter } from "../../utils";

const stateTemplate = `const [<%= baseName %>Open, set<%= componentName %>Open] = useState(false);
const [<%= baseName %>Value, set<%= componentName %>Value] = useState({});<% if (isForm) { %>
const [<%= baseName %>Type, set<%= componentName %>Type] = useState('');<% } %>

const <%= baseName %>Cancel = () => {
  set<%= componentName %>Open(false);
};

const to<%= componentName %> = (<% if (isForm) { %> type,<% } %>record = {}) => {
  set<%= componentName %>Value(record);
  set<%= componentName %>Open(true);<% if (isForm) { %>
  set<%= componentName %>Type(type);<% } %>
};`;

export function generateState(config: CommonConfig): string {
  const { componentName, isForm } = config;
  const baseName = lowerFirstLetter(componentName);

  const compiled = template(stateTemplate);
  return compiled({
    componentName,
    baseName,
    isForm,
  }).trim();
}
