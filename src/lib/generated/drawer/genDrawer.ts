import template from "lodash.template";
import { DrawerConfig } from "./config";
import { lowerFirstLetter } from "../../utils";

const baseTemplate = `import React, { useState, useRef } from 'react';
import { Drawer, Space, Button} from 'antd';

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
      onClose={on<%= componentName %>Cancel}<% if(isFooter) {%>
      footer={
        <Space>
          <Button onClick={onNewDCancel}>取消</Button>
          <Button type="primary" onClick={onOk}>确定</Button>
        </Space>
      }
      footerStyle={{ textAlign: "right" }}<% } else { %>
      footer={false}<% } %>
    ></Drawer>
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
