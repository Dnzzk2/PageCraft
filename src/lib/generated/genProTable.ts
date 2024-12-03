export interface GenProTableType {
  isSort: boolean;
}

const genImports = () => {
  return `import ProTable from '@ant-design/pro-table';
import React, { useState } from 'react';
import { useRef } from 'react';
import { handleTableResponse } from '@/utils/utils';
import { queryPageList } from './service';`;
};

const genState = (isSort: boolean) => {
  let temp = `const formRef = useRef();
  const actionRef = useRef();`;

  if (isSort) {
    temp += `\n  const [pageInfo, setPageInfo] = useState({});`;
  }
  return temp;
};

const generateIndexColumn = (isSort: boolean) => {
  let temp = "";
  if (!isSort) {
    return "";
  } else {
    temp += `[\n    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      hideInSearch: true,
      width: '50px',
      render: (_, record, index) => pageInfo.pageSize * (pageInfo.current - 1) + index + 1,
    },
  ]`;
  }
  return temp;
};

export default function genProTableTemplate(props: GenProTableType): string {
  const { isSort } = props;

  let template = `${genImports()}
  
const Index = () => {
  ${genState(isSort)}
  
  const columns = ${generateIndexColumn(isSort)}

  return (
    <ProTable
      headerTitle=""
      toolBarRender={() => []}
      actionRef={actionRef}
      formRef={formRef}
      columns={columns}
      rowKey=""
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
        defaultPageSize: 10,
        ${
          isSort
            ? `  onChange: (current, pageSize) => {
          setPageInfo({ current, pageSize });
        },`
            : ""
        }
      }}
      form={{
        ignoreRules: false,
        validateTrigger: ['onBlur', 'onChange'],
      }}
    />
  );
};

export default Index;
`;

  return template.trim();
}
