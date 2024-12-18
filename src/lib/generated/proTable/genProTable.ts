import template from "lodash.template";
import { ProTableConfig } from "@/types/plus";

// 注意这里模板的换行处理
const baseTemplate = `import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';<%if (isPageHeader) {%>
import { PageHeaderWrapper } from '@ant-design/pro-layout';<%}%>
import { handleTableResponse } from '@/utils/utils';
import { <%= searchAPI %> } from './service';

const Index = () => {
  const formRef = useRef();
  const actionRef = useRef();<% if (isSort) { %>
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });<% } %>
  
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
      valueType: '<%= col.valueType %>',<% } %><% if (col.hideInSearch) { %>
      hideInSearch: true,<% } %>
    },<% }); %>];

  return (<% if(isPageHeader) {%>
    <PageHeaderWrapper><%}%>
      <ProTable
        headerTitle=""
        toolBarRender={() => []}
        actionRef={actionRef}
        formRef={formRef}
        columns={columns}
        rowKey="id"
        defaultSize="small"<% if (!isSearch) { %>
        search={false}<% } else { %>
        search={{ collapsed: false, collapseRender: false, labelWidth: 'auto' }}
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
          defaultPageSize: 10,<% if (isSort) { %>
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
  );
};

export default Index;`;

// 修改 genProTable.ts，添加columns处理
export function generateProTable(config: ProTableConfig): string {
  const compiled = template(baseTemplate);
  return compiled({
    isSort: config.isSort ?? false,
    isPageHeader: config.isPageHeader ?? false,
    isSearch: config.isSearch ?? true,
    searchAPI: config.searchAPI ?? "queryPageList",
    columns: config.columns || [],
  }).trim();
}
