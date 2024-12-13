import template from "lodash.template";
import { CommonConfig } from "./config";
import { lowerFirstLetter } from "../../utils";

const stateTemplate = `const [<%= baseName %>Open, set<%= componentName %>Open] = useState(false);
const [<%= baseName %>Value, set<%= componentName %>Value] = useState({});

const <%= baseName %>Cancel = () => {
  set<%= componentName %>Open(false);
};

const to<%= componentName %> = (record = {}) => {
  set<%= componentName %>Value(record);
  set<%= componentName %>Open(true);
};`;

export function generateState(config: CommonConfig): string {
  const { componentName } = config;
  const baseName = lowerFirstLetter(componentName);

  const compiled = template(stateTemplate);
  return compiled({
    componentName,
    baseName,
  }).trim();
}
