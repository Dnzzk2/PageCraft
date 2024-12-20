import template from "lodash.template";
import { FormFieldTypeValue } from "@/lib/types/plus";
import { lowerFirstLetter } from "../../utils";

export interface DrawerConfig {
  componentName: string;
  fields?: Array<{
    name: string;
    label: string;
    fieldType: FormFieldTypeValue;
    required: boolean;
    uploadConfig?: {
      listType?: string;
      acceptType?: string;
      multiple?: boolean;
    };
  }>;
  addAPI?: string;
  editAPI?: string;
  detailAPI?: string;
  isFooter?: boolean;
}

const baseTemplate = `import React, { useEffect, useState } from 'react';
import { Drawer, Form, message, Spin, Space, Button } from 'antd';<% if (fields.length > 0) { %>
import { ProForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDatePicker, ProFormDateRangePicker, ProFormDigit } from '@ant-design/pro-components';
import { UploadFile } from 'xydata-tools';<% } %><% if (addAPI || editAPI || detailAPI) { %>
import {<%if (addAPI) { %><%= addAPI %><% } %><% if (editAPI) { %>, <%= editAPI %><% } %><% if(detailAPI) { %>, <%= detailAPI %><% } %> } from '../service';<% } %>
<% if (addAPI || editAPI || fields.length > 0) { %>
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};<% } %>

const <%= componentName %> = (props) => {
  const { <%= lowerComponentName %>Open, on<%= componentName %>Cancel, <% if (addAPI || editAPI || fields.length > 0) { %><%= lowerComponentName %>Type, <% } %><%= lowerComponentName %>Value, <% if (addAPI || editAPI || fields.length > 0) { %>actionRef<% } %> } = props;
  const [loading, setLoading] = useState(false);<% if (addAPI || editAPI || fields.length > 0) { %>
  const [spinning, setSpinning] = useState(false);
  const [form] = Form.useForm();<% } %><% if (detailAPI) { %>

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
      <% if (addAPI) { %>
      if (<%= lowerComponentName %>Type === 'C') {
        res = await <%= addAPI %>(params);
      }<% } %><% if (editAPI) { %>
      else {
        res = await <%= editAPI %>({ ...params, id: <%= lowerComponentName %>Value.id });
      }
      <% } %>
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
  };<% } %><% if (addAPI || editAPI || fields.length > 0) { %>

  const renderContent = () => {
    return (
      <Spin spinning={spinning}><% fields.forEach(function(field) { %><% if (field.fieldType === "textarea") { %>
        <ProFormTextArea
          name="<%= field.name %>"
          label="<%= field.label %>"
          fieldProps={{ autoSize: { minRows: 4, maxRows: 10 }, maxLength: 200, showCount: true }}
          rules={[{ whitespace: true }, { required: true, message: '请输入<%= field.label %>' }]}
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
        /><% } else if (field.fieldType === "upload") { %>
        <UploadFile
          form={form}
          name="<%= field.name %>"
          label="<%= field.label %>"
          listType="<%= field.uploadConfig?.listType || 'picture-card' %>"
          accept="<%= field.uploadConfig?.acceptType || 'image/*' %>"
          multiple={<%= field.uploadConfig?.multiple || false %>}
          checkFile={{
            maxSize: 1024,
          }}
          max={2}<% if (field.required) { %>
          rules={[{ required: true, message: '请上传<%= field.label %>' }]}<% } %>
        /><% } else { %>
        <ProFormText
          name="<%= field.name %>"
          label="<%= field.label %>"
          rules={[{ whitespace: true }<% if (field.required) { %>,{ required: true, message: '请输入<%= field.label %>' }<% } %>]}
        /><% } %><% }); %>
      </Spin>
    );
  };<% } %>

  return (
    <Drawer
      width={600}
      destroyOnClose
      title={<% if (addAPI || editAPI) { %><%= lowerComponentName %>Type === 'C' ? '新增' : '编辑'<% } else { %>'抽屉'<% } %>}
      open={<%= lowerComponentName %>Open}
      onClose={on<%= componentName %>Cancel}<% if (isFooter) { %>
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={on<%= componentName %>Cancel}>取消</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={async () => {<% if (addAPI || editAPI) { %>
              const values = await form.validateFields();
              await handleSubmit(values);
              <% } else { %>
              on<%= componentName %>Cancel();<% } %>
            }}
          >
          确定
          </Button>
        </Space>
      }<% } %>
    ><% if (addAPI || editAPI || fields.length > 0) { %>
      <ProForm form={form} submitter={false} layout="horizontal" {...formLayout}>
        {renderContent()}
      </ProForm><% } %>
    </Drawer>
  );
};

export default <%= componentName %>;`;

export function generateDrawerComponent(config: DrawerConfig): string {
  const {
    componentName,
    fields = [],
    addAPI,
    editAPI,
    detailAPI,
    isFooter,
  } = config;
  const lowerComponentName = lowerFirstLetter(componentName);

  const compiled = template(baseTemplate, {
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
    isFooter,
  }).trim();
}
