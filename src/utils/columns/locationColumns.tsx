import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ILocation } from 'utils/types';

const columns: ColumnsType<ILocation> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <strong style={{ color: 'green' }}>{text}</strong>,
  },
  {
    title: 'Dimension',
    dataIndex: 'dimension',
    key: 'dimension',
    render: (text: string) => (
      <strong>{text}</strong>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (text:string) => (
      <Tag color="geekblue" key={text}>
        {text.substr(0, 7)}
      </Tag>
    ),
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    render: (date: Date) => (
      <strong>{`${moment(date).fromNow(true)} ago`}</strong>
    ),
  },
];

export default columns;
