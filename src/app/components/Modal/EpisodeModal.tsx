import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { Modal, Card, Spin } from 'antd';
import { EPISODEQUERY } from 'utils/graphql/queries';
import { IModal } from 'utils/types/common';

const LocationModal : React.FC<IModal> = (props: IModal) => {
  const {
    isModalVisible,
    handleOk,
    handleCancel,
    id,
  } = props;
  const { data: response } = useQuery(EPISODEQUERY, {
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
        >
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Name"
            description={response.episode.name}
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Created"
            description={
              response.episode.created
                ? `${moment(response.episode.created).fromNow(true)} ago`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="episode"
            description={
              response.episode.episode
                ? `${response.episode.episode}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Species"
            description={
              response.episode.species
                ? `${response.episode.species}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Air Date"
            description={
              response.episode.air_date
                ? `${response.episode.air_date}`
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

export default LocationModal;
