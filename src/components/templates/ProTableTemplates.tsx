"use client";

import React from "react";
import { InfoType } from "@/type/InfoType";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const info: InfoType = {
  title: "ProTable页面模板",
  description: "快速构建ProTable页面，最基础的模板",
  updatedAt: "2024-12-02",
  language: "javascript",
  template: (isSort: boolean) =>
    `import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import { handleTableResponse } from '@/utils/utils';

const Index = () => {
  const formRef = useRef();
  const actionRef = useRef();
  ${
    isSort
      ? `const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });\n`
      : ""
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      hideInSearch: true,
      width: '50px',
      render: (_, record, index) => 
        pageInfo.pageSize * (pageInfo.current - 1) + index + 1,
    },
  ];

  return (
    <ProTable
      headerTitle=""
      toolBarRender={() => []}
      actionRef={actionRef}
      formRef={formRef}
      columns={columns}
      rowKey=""
      size="small"
      search={{
        collapsed: false,
        collapseRender: false,
        labelWidth: 'auto',
      }}
      beforeSearchSubmit={(params) => ({
        searchObject: params,
      })}
      request={async (params) => {
        // const res = await queryPageList(params);
        return handleTableResponse({ actionRef, res });
      }}
      pagination={{
        defaultPageSize: 10,
        onChange: (current, pageSize) => {
          setPageInfo({ current, pageSize });
        },
      }}
      form={{
        ignoreRules: false,
        validateTrigger: ['onBlur', 'onChange'],
      }}
    />
  );
};

export default Index;
`,
};

const ProTableTemplates = () => {
  return (
    <div>
      <h2>ProTableTemplates</h2>
      <SyntaxHighlighter
        language="javascript"
        style={oneDark}
        className="syntax-highlighter"
        customStyle={{
          fontSize: "12px",
          height: "300px",
        }}
      >
        {info.template(true)}
      </SyntaxHighlighter>
    </div>
  );
};

export default ProTableTemplates;
