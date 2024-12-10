import template from "lodash.template";
import { DrawerConfig } from "./config";
import { lowerFirstLetter } from "../../utils";

const baseTemplate = `import { Drawer } from 'antd';
import React from 'react';

const <%= componentName %> = (props) => {
  const { <%= lowerComponentName %>Open, on<%= componentName %>Cancel, <%= lowerComponentName %>Value } = props;

  const onOk = () => {
    on<%= componentName %>Cancel();
  };

  return (
    <Drawer
      width={600}
      destroyOnClose
      title="弹窗"
      maskClosable={false}
      open={<%= lowerComponentName %>Open}
      onClose={on<%= componentName %>Cancel}
      <% if(isFooter) {%>
      footer={
        <div>
          <Button>取消</Button>
          <Button>确定</Button>
        </div>
      }
      <% } else { %>
      footer={false}
      <% } %>
    >
    </Drawer>
  );
};

export default <%= componentName %>;`;

export function generateDrawerComponent(config: DrawerConfig): string {
  const { componentName, isFooter } = config;
  const lowerComponentName = lowerFirstLetter(componentName);

  const compiled = template(baseTemplate);
  return compiled({
    componentName,
    lowerComponentName,
    isFooter,
  }).trim();
}
