import React from 'react';
import { Modal } from 'antd';

const RemoveModel = props => {
  Modal.confirm({
    title: 'Are you sure you want to remove the record?',
    width: '450px',
    okText: 'Yes',
    cancelText: 'No',
    onOk() {
      props.remove(props.k);
    },
  });
};

export default RemoveModel;
