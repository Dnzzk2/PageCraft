export interface GenProTableType {
  isSort: boolean;
}

export default function genProTableTemplate(props: GenProTableType): string {
  const { isSort } = props;

  const stateDefinition = isSort
    ? [
        `  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });`,
      ]
    : null;

  const paginationConfig = isSort
    ? [
        `        onChange: (current, pageSize) => {`,
        `          setPageInfo({ current, pageSize });`,
        `        },`,
      ]
    : null;

  const codeLines = [
    `import ProTable from '@ant-design/pro-table';`,
    `import React, { useState, useRef } from 'react';`,
    `import { handleTableResponse } from '@/utils/utils';`,
    ``,
    `const Index = () => {`,
    `  const formRef = useRef();`,
    `  const actionRef = useRef();`,
    ...stateDefinition,
    ``,
    `  const columns = [`,
    `    {`,
    `      title: '序号',`,
    `      dataIndex: 'index',`,
    `      key: 'index',`,
    `      align: 'center',`,
    `      hideInSearch: true,`,
    `      width: '50px',`,
    `      render: (_, record, index) =>`,
    `        pageInfo.pageSize * (pageInfo.current - 1) + index + 1,`,
    `    },`,
    `  ];`,
    ``,
    `  return (`,
    `    <ProTable`,
    `      headerTitle=""`,
    `      toolBarRender={() => []}`,
    `      actionRef={actionRef}`,
    `      formRef={formRef}`,
    `      columns={columns}`,
    `      rowKey=""`,
    `      size="small"`,
    `      search={{`,
    `        collapsed: false,`,
    `        collapseRender: false,`,
    `        labelWidth: 'auto',`,
    `      }}`,
    `      beforeSearchSubmit={(params) => ({`,
    `        searchObject: params,`,
    `      })}`,
    `      request={async (params) => {`,
    `        // const res = await queryPageList(params);`,
    `        return handleTableResponse({ actionRef, res });`,
    `      }}`,
    `      pagination={{`,
    `        defaultPageSize: 10,`,
    ...paginationConfig,
    `      }}`,
    `      form={{`,
    `        ignoreRules: false,`,
    `        validateTrigger: ['onBlur', 'onChange'],`,
    `      }}`,
    `    />`,
    `  );`,
    `};`,
    ``,
    `export default Index;`,
  ];

  return codeLines.filter((line) => line !== null).join("\n");
}
