import React from 'react';
import moment from 'moment';
import type { ColumnsType } from 'antd/lib/table';
import { IEpisode } from 'utils/types';

const columns: ColumnsType<IEpisode> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <strong style={{ color: 'green' }}>{text}</strong>,
  },
  {
    title: 'Episode',
    dataIndex: 'episode',
    key: 'episode',
    render: (text: string) => (
      <strong>{text}</strong>
    ),
  },
  {
    title: 'Air Date',
    dataIndex: 'air_date',
    key: 'air_date',
    render: (text: string) => (
      <strong>{text}</strong>
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
