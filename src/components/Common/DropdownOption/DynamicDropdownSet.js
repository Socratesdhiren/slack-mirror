import React, { Fragment, useEffect } from 'react';
import { Form, Input, Icon, Button, Col, Row } from 'antd';

import { isEmpty } from '../../../utils/commonUtil';
import './style.css';

const FormItem = Form.Item;

let id;

const DynamicDropdownSet = props => {
  const { values } = props.fields;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const remove = k => {
    // can use data-binding to get
    const keys = getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  const add = () => {
    // can use data-binding to get
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    setFieldsValue({
      keys: nextKeys,
    });
  };

  useEffect(() => {
    id = !isEmpty(values) ? values.length : 2;
  }, [values]);

  getFieldDecorator('keys', {
    initialValue: !isEmpty(values) ? values.map((k, index) => index) : [0, 1],
  });
  const keys = getFieldValue('keys');

  const formItems =
    keys &&
    keys.map(k => (
      <Row key={k}>
        <Col span={8}>
          <FormItem {...formItemLayout} colon={false} className="mr-3">
            {getFieldDecorator(`value[${k}][option]`, {
              rules: [{ required: true, message: 'Option is required' }],
              initialValue: values && values[k] ? values[k].option : undefined,
            })(<Input type="text" placeholder="Option" />)}
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem {...formItemLayout} colon={false} className="mr-3">
            {getFieldDecorator(`value[${k}][value]`, {
              rules: [{ required: true, message: 'Value is required' }],
              initialValue: values && values[k] ? values[k].value : undefined,
            })(<Input type="text" placeholder="Value" />)}
          </FormItem>
        </Col>

        {keys.length > 1 ? (
          <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => remove(k)} />
        ) : null}
      </Row>
    ));

  return (
    <Fragment>
      {formItems}
      <Row>
        <Col xl={{ span: 12 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
          <Button type="dashed" className="mb-3" onClick={() => add()}>
            <Icon type="plus" /> Add field
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DynamicDropdownSet;
