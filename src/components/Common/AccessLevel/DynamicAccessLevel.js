import React, { Fragment, useEffect, useState } from 'react';
import { Form, Icon, Select, Checkbox, Button, DatePicker, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import './style.css';
import { isEmpty } from '../../../utils/commonUtil';
import RemoveModel from '../ModelBox/RemoveModel';

const FormItem = Form.Item;
const { Option } = Select;

let id;

const DynamicAccessLevel = props => {
  const { t } = useTranslation();

  const { roles, branches, departments } = props;
  const { accessLevels } = props.users;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [endOpen, setEndOpen] = useState(false);

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };
  const dateFormItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 16 },
    },
  };

  const disabledDate = current => {
    return current && current < moment().endOf('day');
  };

  const disabledToDate = toDate => {
    if (!toDate || !fromDate) {
      return false;
    }
    return toDate.valueOf() <= fromDate.valueOf();
  };

  const onFromChange = value => {
    setFromDate(value);
  };

  const onToChange = value => {
    setToDate(value);
  };

  const handleFromOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleToOpenChange = open => {
    setEndOpen(open);
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
    id = !isEmpty(accessLevels) ? accessLevels.length : 1;
  }, [accessLevels]);

  getFieldDecorator('keys', {
    initialValue: !isEmpty(accessLevels) ? accessLevels.map((k, index) => index) : [0],
  });

  const keys = getFieldValue('keys');

  const formItems =
    keys &&
    keys.map(k => (
      <tr key={k}>
        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][department]`, {
              initialValue:
                accessLevels && accessLevels[k] ? accessLevels[k].department : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please select the department',
                },
              ],
            })(
              <Select showSearch placeholder="Select user department">
                {departments instanceof Array &&
                  departments.map(d => <Option key={d.id}>{d.name}</Option>)}
              </Select>
            )}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][branch]`, {
              initialValue: accessLevels && accessLevels[k] ? accessLevels[k].branch : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please select the branch',
                },
              ],
            })(
              <Select showSearch placeholder="Select branch">
                {branches instanceof Array &&
                  branches.map(d => <Option key={d.id}>{d.name}</Option>)}
              </Select>
            )}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][role]`, {
              initialValue: accessLevels && accessLevels[k] ? accessLevels[k].role : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please select the role',
                },
              ],
            })(
              <Select showSearch placeholder="Select user role">
                {roles instanceof Array && roles.map(d => <Option key={d.id}>{d.name}</Option>)}
              </Select>
            )}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none', width: 80 }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][active]`, {
              initialValue: accessLevels && accessLevels[k] ? accessLevels[k].active : undefined,
              valuePropName: 'checked',
            })(<Checkbox />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <Row>
            <FormItem {...formItemLayout}>
              {getFieldDecorator(`${props.moduleName}[${k}][expiring]`, {
                initialValue:
                  accessLevels && accessLevels[k] ? accessLevels[k].expiring : undefined,
                valuePropName: 'checked',
              })(<Checkbox />)}
            </FormItem>
            {getFieldValue(`${props.moduleName}[${k}][expiring]`) === true && (
              <Fragment>
                <FormItem {...dateFormItemLayout} label="From">
                  {getFieldDecorator(`${props.moduleName}[${k}][fromDate]`, {
                    rules: [
                      {
                        required: true,
                        message: 'Please select the effective date',
                      },
                    ],
                  })(
                    <DatePicker
                      placeholder="Form Date"
                      format="MM-DD-YYYY"
                      disabledDate={disabledDate}
                      onChange={onFromChange}
                      onOpenChange={handleFromOpenChange}
                    />
                  )}
                </FormItem>

                <FormItem {...dateFormItemLayout} label="To">
                  {getFieldDecorator(`${props.moduleName}[${k}][toDate]`, {
                    rules: [
                      {
                        required: true,
                        message: 'Please select the effective date',
                      },
                    ],
                  })(
                    <DatePicker
                      placeholder="To Date"
                      format="MM-DD-YYYY"
                      disabledDate={disabledToDate}
                      onChange={onToChange}
                      onOpenChange={handleToOpenChange}
                    />
                  )}
                </FormItem>
              </Fragment>
            )}
          </Row>
        </td>

        <td style={{ borderTop: 'none', width: 80 }}>
          <div className="icons-list">
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button "
                type="minus-circle-o"
                onClick={() => RemoveModel({ k: k, remove: remove })}
              />
            ) : null}
          </div>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      {formItems}
      <Button className="m-2" type="dashed" onClick={() => add()}>
        <Icon type="plus" />
        Add Access Level
      </Button>
    </Fragment>
  );
};

export default DynamicAccessLevel;
