import React from 'react';
import { Modal } from 'antd';

const ApproveModel = props => {
  Modal.confirm({
    title: props.title,
    width: props.width,
    cancelText: 'No',
    okText: 'Yes',
    onOk() {
      props.approveEntity({ id: props.id });
    },
  });
};

export default ApproveModel;
