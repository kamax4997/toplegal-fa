import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { Modal, Card, Spin } from 'antd';
import { LOCATIONQUERY } from 'utils/graphql/queries';
import { IModal } from 'utils/types/common';

const LocationModal : React.FC<IModal> = (props: IModal) => {
  const {
    isModalVisible,
    handleOk,
    handleCancel,
    id,
  } = props;
  const { data: response } = useQuery(LOCATIONQUERY, {
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
            description={response.location.name}
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Created"
            description={
              response.location.created
                ? `${moment(response.location.created).fromNow(true)} ago`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Dimension"
            description={
              response.location.dimension
                ? `${response.location.dimension}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Species"
            description={
              response.location.species
                ? `${response.location.species}`
                : 'None'
            }
          />
          <Card.Meta
            style={{ marginBottom: '15px' }}
            title="Type"
            description={
              response.location.type
                ? `${response.location.type}`
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
