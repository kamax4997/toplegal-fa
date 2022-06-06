import React from 'react';
import moment from 'moment';
import { Tag, Avatar } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ICharacter } from 'utils/types';

const columns: ColumnsType<ICharacter> = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar: string) => (
      <div style={{ cursor: 'pointer' }}>
        <Avatar size={50} src={avatar} key={avatar} />
      </div>
    ),
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <strong style={{ color: 'green' }}>{text}</strong>,
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
    render: (text: string) => (
      <strong>{text}</strong>
    ),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (text: string) => (
      <strong>{text}</strong>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => (
      <Tag color="purple" key={text}>
        {text.substr(0, 7)}
      </Tag>
    ),
  },
  {
    title: 'Species',
    dataIndex: 'species',
    key: 'species',
    render: (text: string) => (
      <Tag color="green" key={text}>
        {text.substr(0, 7)}
      </Tag>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (text:string) => (
      <Tag color="geekblue" key={text}>
        {text.substr(0, 7)}
      </Tag>
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
