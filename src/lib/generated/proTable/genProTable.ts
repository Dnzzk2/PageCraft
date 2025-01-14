import template from "lodash.template";
import { ProTableConfig } from "@/lib/types/plus";

const baseTemplate = `import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';<%if (isPageHeader) {%>
import { PageHeaderWrapper } from '@ant-design/pro-layout';<%}%><%if (showAdd || showDetail || showDelete) {%>
import { Button, Divider, Space, Popconfirm, message } from 'antd';<%}%>
import { handleTableResponse } from '@/utils/utils';
import { <%= searchAPI %><% if (showDelete) {%>, <%= deleteAPI %><%}%> } from './service';<%if (showAdd) {%>
import <%= addName %> from './components/<%= addName %>';<%}%><%if (showDetail) {%>
import <%= detailName %> from './components/<%= detailName %>';<%}%>

const Index = () => {
  const formRef = useRef();
  const actionRef = useRef();<% if (isSort) { %>
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });<% } %><%if (showAdd) {%><% if (formLength > 0 || editAPI || addAPI) { %>
  const [<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Type, set<%= addName %>Type] = useState('C');<% } %>
  const [<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Open, set<%= addName %>Open] = useState(false);
  const [<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Value, set<%= addName %>Value] = useState({});<%}%><%if (showDetail) {%>
  const [<%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Open, set<%= detailName %>Open] = useState(false);
  const [<%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Value, set<%= detailName %>Value] = useState({});<%}%>

  <%if (showAdd) {%>
  const <%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Cancel = () => {
    set<%= addName %>Open(false);
  };
  const handle<%= addName %> = (<% if (formLength > 0 || editAPI || addAPI) { %>type, <% } %>record = {}) => {<% if (formLength > 0 || editAPI || addAPI) { %>
    set<%= addName %>Type(type);<% } %>
    set<%= addName %>Value(record);
    set<%= addName %>Open(true);
  };<%}%><%if (showDetail) {%>
  const <%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Cancel = () => {
    set<%= detailName %>Open(false);
  };
  const handle<%= detailName %> = (record = {}) => {
    set<%= detailName %>Value(record);
    set<%= detailName %>Open(true);
  };<%}%><%if (showDelete) {%>

  // 删除
  const handleDelete = async (params) => {
    try {
      const res = await <%= deleteAPI %>(params);
      if (res.rspCode === '000000') {
        message.success('删除成功!');
        actionRef.current.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };<%}%>

  const columns = [<% if (isSort) { %>{
      title: '序号',
      dataIndex: 'index', 
      key: 'index',
      align: 'center',
      hideInSearch: true,
      width: '50px',
      render: (_, record, index) => pageInfo.pageSize * (pageInfo.current - 1) + index + 1,
    },<% } %><% columns.forEach(function(col) { %>{
      title: '<%= col.title %>',
      dataIndex: '<%= col.dataIndex %>',<% if (col.valueType && col.valueType !== "input") { %>
      valueType: '<%= col.valueType %>',<% } %><% if (col.valueType== 'select') { %>
      valueEnum:new Map(LIST.map(item => [item.value, item.label])),<% } %><% if (col.hideInSearch) { %>
      hideInSearch: true,<% } %>
    },<% }); %><%if (showAdd || showDetail || showDelete) {%>{
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      hideInSearch: true,
      render: (_, record) => (
        <Space split={<Divider type="vertical" />} size={0}><%if (showEdit) {%>
          <Button type="link" onClick={() => handle<%= addName %>('U', record)}>
            编辑
          </Button><%}%><%if (showDetail) {%>
          <Button type="link" onClick={() => handle<%= detailName %>(record)}>
            详情
          </Button><%}%><%if (showDelete) {%>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => handleDelete({ id: record.id })}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm><%}%>
        </Space>
      ),
    },<%}%>];

  return (
    <><% if(isPageHeader) {%>
      <PageHeaderWrapper><%}%>
        <ProTable
        headerTitle=""
        toolBarRender={() => [<%if (showAdd) {%>
          <Button type="primary" onClick={() => handle<%= addName %>(<% if (formLength > 0 || editAPI || addAPI) { %> 'C' <% } %>)}>
            新增
          </Button>,<%}%>
        ]}
        actionRef={actionRef}
        formRef={formRef}
        columns={columns}
        rowKey="id"
        defaultSize="small"<% if (!isSearch) { %>
        search={false}<% } else { %>
        search={{ labelWidth: 'auto' }}
        beforeSearchSubmit={(params) => {
          return {
            searchObject: params,
          };
        }}<% } %>
        request={async (params) => {
          const res = await <%= searchAPI %>(params);
          return handleTableResponse({ actionRef, res });
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,<% if (isSort) { %>
          onChange: (current, pageSize) => {
            setPageInfo({ current, pageSize });
          },<% } %>
        }}
        form={{
          ignoreRules: false,
          validateTrigger: ['onBlur', 'onChange'],
        }}
      /><% if(isPageHeader) {%>
    </PageHeaderWrapper><%}%>
    <%if (showAdd) {%>
    {<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Open && (
      <<%= addName %>
        <%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Open={<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Open}
        <%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Cancel={<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Cancel}<% if (formLength > 0 || editAPI || addAPI) { %>
        <%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Type={<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Type}<% } %>
        <%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Value={<%= addName.charAt(0).toLowerCase() + addName.slice(1) %>Value}
        actionRef={actionRef}
      />
    )}<%}%><%if (showDetail) {%>
    {<%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Open && (
      <<%= detailName %>
        <%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Open={<%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Open}
        <%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Cancel={<%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Cancel}
        <%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Value={<%= detailName.charAt(0).toLowerCase() + detailName.slice(1) %>Value}
      />
    )}<%}%>
    </>
  );
};

export default Index;`;

export function generateProTable(config: ProTableConfig): string {
  const compiled = template(baseTemplate);

  const {
    isSort,
    isPageHeader,
    isSearch,
    searchAPI,
    columns,
    showAdd,
    addName,
    showEdit,
    showDetail,
    detailName,
    showDelete,
    deleteAPI,
    formLength,
    editAPI,
    addAPI,
  } = config;

  return compiled({
    isSort: isSort ?? false,
    isPageHeader: isPageHeader ?? false,
    isSearch: isSearch ?? true,
    searchAPI: searchAPI || "queryPageList",
    columns: columns || [],
    showAdd: showAdd ?? false,
    addName: addName || "NewModal",
    showEdit: showEdit ?? false,
    showDetail: showDetail ?? false,
    detailName: detailName || "DetailModal",
    showDelete: showDelete ?? false,
    deleteAPI: deleteAPI || "delete",
    formLength: formLength || 0,
    editAPI: editAPI || false,
    addAPI: addAPI || false,
  }).trim();
}
