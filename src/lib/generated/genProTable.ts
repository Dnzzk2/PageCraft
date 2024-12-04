import template from "lodash.template";

interface ProTableConfig {
  isSort?: boolean;
  headerTitle?: string;
  rowKey?: string;
}

// 注意这里模板的换行处理
const baseTemplate = `import ProTable from '@ant-design/pro-table';
import React, { useState } from 'react';
import { useRef } from 'react';
import { handleTableResponse } from '@/utils/utils';
import { queryPageList } from './service';

const Index = () => {
  const formRef = useRef();
  const actionRef = useRef();<% if (isSort) { %>
  const [pageInfo, setPageInfo] = useState({});<% } %>
  
  const columns = [<% if (isSort) { %>
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      hideInSearch: true,
      width: '50px',
      render: (_, record, index) => pageInfo.pageSize * (pageInfo.current - 1) + index + 1,
    },<% } %>
  ];

  return (
    <ProTable
      headerTitle="<%= headerTitle %>"
      toolBarRender={() => []}
      actionRef={actionRef}
      formRef={formRef}
      columns={columns}
      rowKey="<%= rowKey %>"
      defaultSize="small"
      search={{ collapsed: false, collapseRender: false, labelWidth: 'auto' }}
      beforeSearchSubmit={(params) => {
        return {
          searchObject: params,
        };
      }}
      request={async (params) => {
        const res = await queryPageList(params);
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
    />
  );
};

export default Index;`;

export function generateProTable(config: ProTableConfig): string {
  const compiled = template(baseTemplate);
  return compiled({
    isSort: config.isSort ?? false,
    headerTitle: config.headerTitle ?? "",
    rowKey: config.rowKey ?? "id",
  }).trim();
}
