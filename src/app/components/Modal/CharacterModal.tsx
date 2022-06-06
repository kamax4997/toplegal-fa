import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import {
  Modal,
  Card,
  Spin,
} from 'antd';
import { CHARACTERQUERY } from 'utils/graphql/queries';
import { IModal } from 'utils/types/common';

const CharacterModal : React.FC<IModal> = (props: IModal) => {
  const {
    isModalVisible,
    handleOk,
    handleCancel,
    id,
  } = props;
  const { data: response } = useQuery(CHARACTERQUERY, {
    variables: {
      id,
    },
  });

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {response ? (
        <Card
          style={{ width: 240, marginLeft: 110 }}
          cover={<img alt="example" src={response.character.image} className="modal-image" />}
        >
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Name"
            description={response.character.name}
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Joined"
            description={
              response.character.created
                ? `${moment(response.character.created).fromNow(true)} ago`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Gender"
            description={
              response.character.gender
                ? `${response.character.gender}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Species"
            description={
              response.character.species
                ? `${response.character.species}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Status"
            description={
              response.character.status
                ? `${response.character.status}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Type"
            description={
              response.character.type
                ? `${response.character.type}`
                : 'None'
            }
          />
        </Card>
      ) : (
        <div className="modal-spinner">
          <Spin size="large" />
        </div>
      )}
    </Modal>
  );
};

export default CharacterModal;
