import template from "lodash.template";
import { ModalConfig } from "./config";
import { lowerFirstLetter } from "../../utils";

const componentTemplate = `import { Modal } from 'antd';
import React from 'react';

const <%= componentName %> = (props) => {
  const { <%= baseName %>Open, on<%= componentName %>Cancel, <%= baseName %>Value } = props;

  const onOk = () => {
    on<%= componentName %>Cancel();
  };

  return (
    <Modal
      width={600}
      destroyOnClose
      title="弹窗"
      maskClosable={false}
      open={<%= baseName %>Open}
      onCancel={on<%= componentName %>Cancel}
      onOk={onOk}
    >
    </Modal>
  );
};

export default <%= componentName %>;`;

export function generateModalComponent(config: ModalConfig): string {
  const { componentName } = config;
  const baseName = lowerFirstLetter(componentName);

  const compiled = template(componentTemplate);
  return compiled({
    componentName,
    baseName,
  }).trim();
}
