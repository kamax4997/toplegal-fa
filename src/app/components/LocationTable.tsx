import React, { useState, useRef, useEffect } from 'react';
import type { ColumnType, TableProps } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/lib/table/interface';
import type { InputRef } from 'antd';
import {
  Table,
  Input,
  Button,
  Space,
  Spin,
} from 'antd';

import { ITable, ILocationTable } from 'utils/types';
import columns from 'utils/columns/locationColumns';
import LocationModal from './Modal/LocationModal';

type DataIndex = keyof ILocationTable;

const LocationTable: React.FC<ITable> = (props: ITable) => {
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
  const [modifiedColumns, setModifiedColumns] = useState<ILocationTable[]>();

  const onChange: TableProps<ILocationTable>['onChange'] = (newPagination, filters:any) => {
    const object:any = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null) {
        // eslint-disable-next-line
        object[key] = filters[key][0];
      }
    });
    setFilter(object);
    setPagination(newPagination);
  };

  const handleSearch = (
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };
  const showModal = (
    e: React.MouseEvent<HTMLElement>,
    index: string,
  ) => {
    e.stopPropagation();
    setID(index);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILocationTable> => ({
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
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
    const tempColumns:ILocationTable[] = [];
    columns.forEach((column:any, index:number) => {
      const numbers = [0, 1, 2];
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
      <LocationModal
        handleCancel={handleCancel}
        handleOk={handleOk}
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

export default LocationTable;
