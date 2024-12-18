import template from "lodash.template";
import { FormFieldTypeValue } from "@/lib/types/plus";
import { lowerFirstLetter } from "../../utils";

export interface ModalConfig {
  componentName: string;
  fields?: Array<{
    name: string;
    label: string;
    fieldType: FormFieldTypeValue;
    required: boolean;
  }>;
  addAPI?: string;
  editAPI?: string;
  detailAPI?: string;
}

const componentTemplate = `import React, { useEffect, useState } from 'react';
import { Modal, Form, message, Spin } from 'antd';
import { ProForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDatePicker, ProFormDateRangePicker, ProFormDigit } from '@ant-design/pro-components';<% if (addAPI || editAPI) { %>
import { <%= addAPI %><% if (editAPI) { %>, <%= editAPI %><% } %> } from '../service';<% } %><% if (detailAPI) { %>
import { <%= detailAPI %> } from '../service';<% } %>

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const <%= componentName %> = (props) => {
  const { <%= lowerComponentName %>Open, on<%= componentName %>Cancel, <%= lowerComponentName %>Type, <%= lowerComponentName %>Value, actionRef } = props;
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [form] = Form.useForm();<% if (detailAPI) { %>

  useEffect(() => {
    if (<%= lowerComponentName %>Type === 'C') return;
    queryDetail();
  }, []);

  // 查询详情
  const queryDetail = async () => {
    setSpinning(true);
    try {
      const res = await <%= detailAPI %>({ id: <%= lowerComponentName %>Value.id });
      if (res.rspCode === '000000') {
        form.setFieldsValue(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinning(false);
    }
  };<% } %><% if (addAPI || editAPI) { %>

  // 新增/编辑
  const handleSubmit = async (params) => {
    setLoading(true);
    try {
      let res = {};
      if (<%= lowerComponentName %>Type === 'C') {
        res = await <%= addAPI %>(params);
      } else {
        res = await <%= editAPI %>({ ...params, id: <%= lowerComponentName %>Value.id });
      }
      if (res.rspCode === '000000') {
        message.success(\`\${<%= lowerComponentName %>Type === 'C' ? '新增成功!' : '编辑成功'}\`);
        on<%= componentName %>Cancel();
        actionRef.current.reload();
      } else if (res.rspCode === '999000') {
        message.error(res.rspMsg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };<% } %>

  const renderContent = () => {
    return (
      <Spin spinning={spinning}><% fields.forEach(function(field) { %><% if (field.fieldType === "textarea") { %>
        <ProFormTextArea
          name="<%= field.name %>"
          label="<%= field.label %>"
          fieldProps={{ autoSize: { minRows: 4, maxRows: 10 }, maxLength: 200, showCount: true }}<% if (field.required) { %>
          rules={[{ required: true, message: '请输入<%= field.label %>' }]}<% } %>
        /><% } else if (field.fieldType === "select") { %>
        <ProFormSelect
          name="<%= field.name %>"
          label="<%= field.label %>"
          placeholder="请选择<%= field.label %>"<% if (field.required) { %>
          rules={[{ required: true, message: '请选择<%= field.label %>' }]}<% } %>
          options={[]}
        /><% } else if (field.fieldType === "date") { %>
        <ProFormDatePicker
          name="<%= field.name %>"
          label="<%= field.label %>"<% if (field.required) { %>
          rules={[{ required: true, message: '请选择<%= field.label %>' }]}<% } %>
        /><% } else if (field.fieldType === "dateRange") { %>
        <ProFormDateRangePicker
          name="<%= field.name %>"
          label="<%= field.label %>"<% if (field.required) { %>
          rules={[{ required: true, message: '请选择<%= field.label %>' }]}<% } %>
        /><% } else if (field.fieldType === "number") { %>
        <ProFormDigit
          name="<%= field.name %>"
          label="<%= field.label %>"
          fieldProps={{ precision: 0 }}<% if (field.required) { %>
          rules={[{ required: true, message: '请输入<%= field.label %>' }]}<% } %>
        /><% } else { %>
        <ProFormText
          name="<%= field.name %>"
          label="<%= field.label %>"<% if (field.required) { %>
          rules={[{ required: true, message: '请输入<%= field.label %>' }]}<% } %>
        /><% } %><% }); %>
      </Spin>
    );
  };

  return (
    <Modal
      width={600}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title={<%= lowerComponentName %>Type === 'C' ? '新增' : '编辑'}
      open={<%= lowerComponentName %>Open}
      onCancel={on<%= componentName %>Cancel}
      okButtonProps={{ loading }}
      okText="确定"
      cancelText="取消"
      onClick={async () => {<% if (addAPI || editAPI) { %>
        const values = await form.validateFields();
        await handleSubmit(values);
        <% } %><% if (!addAPI && !editAPI) { %>
        on<%= componentName %>Cancel();<% } %>
      }}
    >
      <ProForm form={form} submitter={false} layout="horizontal" {...formLayout}>
        {renderContent()}
      </ProForm>
    </Modal>
  );
};

export default <%= componentName %>;`;

export function generateModalComponent(config: ModalConfig): string {
  const { componentName, fields = [], addAPI, editAPI, detailAPI } = config;
  const lowerComponentName = lowerFirstLetter(componentName);

  const compiled = template(componentTemplate, {
    interpolate: /<%=([\s\S]+?)%>/g,
    evaluate: /<%([\s\S]+?)%>/g,
  });
  return compiled({
    componentName,
    lowerComponentName,
    fields,
    addAPI,
    editAPI,
    detailAPI,
  }).trim();
}
