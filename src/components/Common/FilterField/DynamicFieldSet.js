import React, { Fragment, useState } from 'react';
import { Form, Input, Icon, Button, Select, Col, Row, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import './style.css';
import { exactMatchByKey } from '../../../utils/commonUtil';

const FormItem = Form.Item;
const { Option } = Select;

let id = 1;

const DynamicFieldSet = props => {
  const { t } = useTranslation();

  const { filterFields } = props;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  const [condition, setCondition] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8, offset: 1 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
    labelAlign: 'left',
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      md: { span: 21, offset: 2 },
      xs: { span: 24 },
      sm: { span: 20 },
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

  const handleFieldNameChange = (value, k) => {
    props.form.resetFields(`${props.moduleName}[${k}][condition]`);
    props.form.resetFields(`${props.moduleName}[${k}][value]`);
    if (value) {
      const conditionList = exactMatchByKey(value, filterFields, 'code');

      condition[`${k}`] = conditionList.conditions;
      setCondition(condition);

      dropdownOptions[`${k}`] = conditionList.dropDownDatas;
      setDropdownOptions(dropdownOptions);

      props.form.setFieldsValue({
        [`${props.moduleName}[${k}][customizable]`]: conditionList.customizable,
      });
      props.form.setFieldsValue({
        [`${props.moduleName}[${k}][dataType]`]: conditionList.dataType,
      });
    }
  };

  const disabledFromDate = fromDate => {
    if (!fromDate || !toDate) {
      return false;
    }
    return fromDate.valueOf() > toDate.valueOf();
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

  getFieldDecorator('keys', { initialValue: [0] });
  const keys = getFieldValue('keys');

  const formItems = keys.map(k => (
    <Row className="dynamic-field" key={k}>
      {getFieldDecorator(`${props.moduleName}[${k}][customizable]`, {})(<Input type="hidden" />)}
      {getFieldDecorator(`${props.moduleName}[${k}][dataType]`, {})(<Input type="hidden" />)}

      <Col span={6}>
        <FormItem {...formItemLayout} label="Fields">
          {getFieldDecorator(`${props.moduleName}[${k}][field]`, {
            rules: [
              {
                required: true,
                message: 'Please fill the search criteria to filter the records',
              },
            ],
          })(
            <Select
              showSearch
              placeholder="Select Field"
              onChange={value => handleFieldNameChange(value, k)}
            >
              {filterFields && filterFields.map(d => <Option key={d.code}>{d.title}</Option>)}
            </Select>
          )}
        </FormItem>
      </Col>

      <Col span={6}>
        <FormItem {...formItemLayout} label="Condition">
          {getFieldDecorator(`${props.moduleName}[${k}][condition]`, {
            rules: [
              {
                required: true,
                message: 'Please fill the search criteria to filter the records',
              },
            ],
          })(
            <Select showSearch placeholder="Select Condition">
              {condition &&
                condition[`${k}`] &&
                condition[`${k}`].map(d => <Option key={d.code}>{d.title}</Option>)}
            </Select>
          )}
        </FormItem>
      </Col>

      {getFieldValue(`reportModel[${k}][condition]`) === 'between' ? (
        <Fragment>
          <Col span={6}>
            <FormItem {...formItemLayout} label="From Date">
              {getFieldDecorator(`${props.moduleName}[${k}][fromDate]`, {
                rules: [
                  {
                    required: true,
                    message: 'Please fill the search criteria to filter the records',
                  },
                ],
              })(
                <DatePicker
                  format="MM-DD-YYYY"
                  disableDate={disabledFromDate}
                  onChange={onFromChange}
                  onOpenChange={handleFromOpenChange}
                />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem {...formItemLayout} label="To Date">
              {getFieldDecorator(`${props.moduleName}[${k}][toDate]`, {
                rules: [
                  {
                    required: true,
                    message: 'Please fill the search criteria to filter the records',
                  },
                ],
              })(
                <DatePicker
                  format="MM-DD-YYYY"
                  disabledDate={disabledToDate}
                  onChange={onToChange}
                  onOpenChange={handleToOpenChange}
                />
              )}
            </FormItem>
          </Col>
        </Fragment>
      ) : getFieldValue(`reportModel[${k}][dataType]`) === 'dropdown' ? (
        <Col span={6}>
          <FormItem {...formItemLayout} label="Value">
            {getFieldDecorator(`${props.moduleName}[${k}][value]`, {
              rules: [
                {
                  required: true,
                  message: 'Please fill the search criteria to filter the records',
                },
              ],
            })(
              <Select showSearch placeholder="Select dropdown">
                {dropdownOptions &&
                  dropdownOptions[`${k}`] &&
                  dropdownOptions[`${k}`].map(d => <Option key={d.code}>{d.title}</Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
      ) : getFieldValue(`reportModel[${k}][dataType]`) === 'Date' ? (
        <Col span={6}>
          <FormItem {...formItemLayout} label="Value">
            {getFieldDecorator(`${props.moduleName}[${k}][value]`, {
              rules: [
                {
                  required: true,
                  message: 'Please fill the search criteria to filter the records',
                },
              ],
            })(<DatePicker format="MM-DD-YYYY" />)}
          </FormItem>
        </Col>
      ) : (
        <Col span={6}>
          <FormItem {...formItemLayout} label="Value">
            {getFieldDecorator(`${props.moduleName}[${k}][value]`, {
              rules: [
                {
                  required: true,
                  message: 'Please fill the search criteria to filter the records',
                },
              ],
            })(<Input type="text" placeholder={t('roles.name.placeholder')} />)}
          </FormItem>
        </Col>
      )}

      {keys.length > 1 ? (
        <Icon
          className="dynamic-delete-button ml-2"
          type="minus-circle-o"
          onClick={() => remove(k)}
        />
      ) : null}
    </Row>
  ));

  return (
    <Fragment>
      {formItems}
      <Row>
        <Col xl={{ span: 12 }} lg={{ span: 10 }} md={{ span: 20, offset: 2 }} sm={24}>
          <Button className="mt-2 ml-3" type="dashed" onClick={() => add()}>
            <Icon type="plus" />
            {t('add.condition.button.label')}
          </Button>
        </Col>
      </Row>

      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button className="ant-btn btn-custom-field mt-2 ml-3" htmlType="submit">
          {t('search.button.label')}
        </Button>
      </Form.Item>
    </Fragment>
  );
};

export default DynamicFieldSet;
