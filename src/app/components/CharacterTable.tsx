import React, { useState, useRef, useEffect } from 'react';
import type { ColumnType, TableProps } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterValue } from 'antd/lib/table/interface';
import type { InputRef } from 'antd';
import {
  Table,
  Input,
  Button,
  Space,
  Spin,
} from 'antd';

import { ITable, ICharactersTable } from 'utils/types';
import columns from 'utils/columns/characterColumns';
import CharacterModal from './Modal/CharacterModal';

type Characters = keyof ICharactersTable;

const DashBoardTable: React.FC<ITable> = (props: ITable) => {
  const {
    moreLoading,
    data,
    pagination,
    setFilter,
    setPagination,
  } = props;
  const searchInput = useRef<InputRef>(null);
  const [id, setID] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modifiedColumns, setModifiedColumns] = useState<ICharactersTable[]>();

  const onChange: TableProps<ICharactersTable>['onChange'] = (newPagination, filters: Record<string, FilterValue | null>) => {
    const filterObj: {[key: string]: string} = {};
    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue !== null) {
        if (Array.isArray(filterValue)) {
          filterObj[key] = filterValue[0].toString();
        }
      }
    });
    setFilter(filterObj);
    setPagination(newPagination);
  };

  const showModal = (
    e: React.MouseEvent<HTMLElement>,
    index: string,
  ) => {
    e.stopPropagation();
    setID(index);
    setIsModalVisible(true);
  };

  const getColumnSearchProps = (dataIndex: Characters): ColumnType<ICharactersTable> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase()
      .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  useEffect(() => {
    const tempColumns: ICharactersTable[] = [];
    columns.forEach((column: any, index: number) => {
      const numbers = [1, 4, 5, 6, 7];
      if (numbers.indexOf(index) !== -1) {
        tempColumns.push({
          ...column,
          ...getColumnSearchProps(column.dataIndex),
        });
      } else {
        tempColumns.push({
          ...column,
        });
      }
    });
    setModifiedColumns(tempColumns);
  }, []);

  return (
    <Spin
      size="large"
      spinning={moreLoading}
      style={
        { alignSelf: 'center' }
      }
    >
      <CharacterModal
        handleCancel={() => setIsModalVisible(false)}
        handleOk={() => setIsModalVisible(false)}
        isModalVisible={isModalVisible}
        id={id}
      />
      <Table
        // eslint-disable-next-line
        onRow={(rowIndex) => {
          return {
            onClick: (event) => {
              showModal(event, rowIndex.key.toString());
            },
          };
        }}
        columns={modifiedColumns}
        dataSource={data}
        pagination={{
          showSizeChanger: false,
          ...pagination,
        }}
        onChange={onChange}
        scroll={{ y: 700 }}
      />
    </Spin>
  );
};

export default DashBoardTable;
