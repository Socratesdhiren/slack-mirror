import React, { Fragment } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const InputTextArea = Input.TextArea;
const RejectModel = props => {
  const { getFieldDecorator } = props.form;
  const { isModalVisible, modelHide } = props;

  const rejectOk = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        const searchData = JSON.parse(JSON.stringify(values));
        props.rejectEntity(searchData);
        props.modelHide();
      }
    });
  };

  return (
    <Fragment>
      <Modal
        width="387px"
        title={props.header || 'Reject'}
        visible={isModalVisible}
        onCancel={modelHide}
        destroyOnClose={true}
        footer={[
          <Button key="submit" type="primary" onClick={rejectOk}>
            Reject
          </Button>,
          <Button key="back" onClick={modelHide}>
            Cancel
          </Button>,
        ]}
      >
        {props.title}
        <section className="form-v1-container">
          <Form onSubmit={rejectOk} className="agent-reject-form">
            {getFieldDecorator('id', { initialValue: props.id })(<Input type="hidden" />)}
            <FormItem>
              {getFieldDecorator(props.remark, {
                rules: [{ required: true, message: `Please enter ${props.remark}` }],
              })(<InputTextArea maxLength={250} />)}
            </FormItem>
          </Form>
        </section>
      </Modal>
    </Fragment>
  );
};

export default Form.create()(RejectModel);
