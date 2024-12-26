import template from "lodash.template";
import { DetailFieldConfig } from "@/lib/types/plus";
import { lowerFirstLetter } from "../../utils";

export interface DetailConfig {
  componentName: string;
  componentType: "modal" | "drawer";
  detailAPI: string;
  fields?: DetailFieldConfig[];
}

const modalTemplate = `import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Spin } from 'antd';
import { <%= detailAPI %> } from '../service';

const <%= componentName %> = (props) => {
  const { <%= lowerComponentName %>Open, <%= lowerComponentName %>Cancel, <%= lowerComponentName %>Value } = props;
  const [spinning, setSpinning] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    queryDetail();
  }, []);

  // 查询详情
  const queryDetail = async () => {
    setSpinning(true);
    try {
      const res = await <%= detailAPI %>({ id: <%= lowerComponentName %>Value.id });
      if (res.rspCode === '000000') {
        setDetailData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinning(false);
    }
  };

  return (
    <Modal
      width={600}
      destroyOnClose
      title="详情"
      open={<%= lowerComponentName %>Open}
      onCancel={<%= lowerComponentName %>Cancel}
      footer={false}
    >
      <Spin spinning={spinning}>
        <Descriptions column={1}>
          <% fields.forEach(function(field) { %>
          <Descriptions.Item label="<%= field.label %>">{detailData?.<%= field.name %> || '-'}</Descriptions.Item><% }); %>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default <%= componentName %>;`;

const drawerTemplate = `import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Spin } from 'antd';
import { <%= detailAPI %> } from '../service';

const <%= componentName %> = (props) => {
  const { <%= lowerComponentName %>Open, <%= lowerComponentName %>Cancel, <%= lowerComponentName %>Value } = props;
  const [spinning, setSpinning] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    queryDetail();
  }, []);

  // 查询详情
  const queryDetail = async () => {
    setSpinning(true);
    try {
      const res = await <%= detailAPI %>({ id: <%= lowerComponentName %>Value.id });
      if (res.rspCode === '000000') {
        setDetailData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinning(false);
    }
  };

  return (
    <Drawer
      width={600}
      destroyOnClose
      title="详情"
      open={<%= lowerComponentName %>Open}
      onClose={<%= lowerComponentName %>Cancel}
    >
      <Spin spinning={spinning}>
        <Descriptions column={1}>
          <% fields.forEach(function(field) { %>
          <Descriptions.Item label="<%= field.label %>">{detailData?.<%= field.name %> || '-'}</Descriptions.Item><% }); %>
        </Descriptions>
      </Spin>
    </Drawer>
  );
};

export default <%= componentName %>;`;

export function generateDetailComponent(config: DetailConfig): string {
  const { componentName, componentType, detailAPI, fields = [] } = config;
  const lowerComponentName = lowerFirstLetter(componentName);

  const templateStr =
    componentType === "drawer" ? drawerTemplate : modalTemplate;
  const compiled = template(templateStr, {
    interpolate: /<%=([\s\S]+?)%>/g,
    evaluate: /<%([\s\S]+?)%>/g,
  });

  return compiled({
    componentName,
    lowerComponentName,
    detailAPI,
    fields,
  }).trim();
}
