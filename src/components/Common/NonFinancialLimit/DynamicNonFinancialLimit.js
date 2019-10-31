import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Form, Icon, Select, Checkbox, Button, Row, Col, InputNumber, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import './style.css';
import { isEmpty } from '../../../utils/commonUtil';

const FormItem = Form.Item;
const { Option } = Select;

let id;
let originalNonFinancialApp;

const DynamicNonFinancialLimit = props => {
  const { t } = useTranslation();
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;
  const { apps, commissionTypes } = props;
  const { nonFinancialLimits } = props.schemes;
  const [nonFinancialApps, setNonFinancialApps] = useState([]);

  useEffect(() => {
    props.fetchCommissionType();
  }, []);

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

  const handleReqPerMonth = (rule, value, callback, index) => {
    if (value < getFieldValue(`${props.moduleName}[${index}][requestPerDay]`)) {
      callback('Req/Month must be greater than or equal to Req/Day.');
    }
    callback();
  };

  const remove = k => {
    const deletedCode = getFieldValue(`${props.moduleName}[${k}][app]`);
    if (deletedCode) {
      const deleteRow = originalNonFinancialApp.filter(o => deletedCode.includes(o.code));
      setNonFinancialApps([...nonFinancialApps, deleteRow[0]]);
    }

    // can use data-binding to get
    const nonFinancialLimitKeys = getFieldValue('nonFinancialLimitKeys');
    // We need at least one passenger
    if (nonFinancialLimitKeys.length === 1) {
      return;
    }

    // can use data-binding to set
    setFieldsValue({
      nonFinancialLimitKeys: nonFinancialLimitKeys.filter(key => key !== k),
    });
  };

  const add = () => {
    // can use data-binding to get
    const nonFinancialLimitKeys = getFieldValue('nonFinancialLimitKeys');
    const nextKeys = nonFinancialLimitKeys.concat(id++);
    // can use data-binding to set
    setFieldsValue({
      nonFinancialLimitKeys: nextKeys,
    });
  };

  useEffect(() => {
    id = !isEmpty(nonFinancialLimits) ? nonFinancialLimits.length : 1;
  }, [nonFinancialLimits]);

  useEffect(() => {
    originalNonFinancialApp = apps.filter(value => value.type === 'NON-FINANCIAL');
    const selectedCode = nonFinancialLimits && nonFinancialLimits.map(k => k.app);
    if (selectedCode) {
      setNonFinancialApps(originalNonFinancialApp.filter(o => !selectedCode.includes(o.code)));
    } else {
      setNonFinancialApps(originalNonFinancialApp);
    }
  }, [apps]);

  getFieldDecorator('nonFinancialLimitKeys', {
    initialValue: !isEmpty(nonFinancialLimits) ? nonFinancialLimits.map((k, index) => index) : [0],
  });

  const nonFinancialLimitKeys = getFieldValue('nonFinancialLimitKeys');

  const handleAppSelect = (value, k) => {
    const replacedCode = getFieldValue(`${props.moduleName}[${k}][app]`);
    if (replacedCode) {
      setNonFinancialApps(originalNonFinancialApp.filter(o => replacedCode.includes(o.code)));
    } else {
      setNonFinancialApps(nonFinancialApps.filter(o => !value.includes(o.code)));
    }
  };

  const formItems =
    nonFinancialLimitKeys &&
    nonFinancialLimitKeys.map((k, index) => (
      <tr key={k}>
        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][app]`, {
              initialValue:
                nonFinancialLimits && nonFinancialLimits[k] ? nonFinancialLimits[k].app : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please select the app',
                },
              ],
            })(
              <Select
                showSearch
                placeholder="Select app"
                dropdownMatchSelectWidth={false}
                onSelect={value => handleAppSelect(value, k)}
              >
                {nonFinancialApps instanceof Array &&
                  nonFinancialApps.map(d => <Option key={d.code}>{d.displayName}</Option>)}
              </Select>
            )}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][requestPerDay]`, {
              initialValue:
                nonFinancialLimits && nonFinancialLimits[k]
                  ? nonFinancialLimits[k].requestPerDay
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter request/day',
                },
                {
                  pattern: new RegExp('^[0-9]+$'),
                  message: 'Req/day must be number with no decimals.',
                },
              ],
            })(<InputNumber placeholder="Enter request/day" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][requestPerMonth]`, {
              initialValue:
                nonFinancialLimits && nonFinancialLimits[k]
                  ? nonFinancialLimits[k].requestPerMonth
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter request/month',
                },
                {
                  pattern: new RegExp('^[0-9]+$'),
                  message: 'Req/month must be number with no decimals.',
                },
                {
                  validator: (rule, value, callback) => handleReqPerMonth(rule, value, callback, k),
                },
              ],
            })(<InputNumber placeholder="Enter request/month" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][fee]`, {
              initialValue:
                nonFinancialLimits && nonFinancialLimits[k] ? nonFinancialLimits[k].fee : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter fee',
                },
                {
                  pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                  message: 'Fee must be number(two decimals are accepted).',
                },
              ],
            })(<InputNumber placeholder="Enter fee" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <Row span={24}>
            <Col span={12}>
              <FormItem {...formItemLayout} className="mr-1">
                {getFieldDecorator(`${props.moduleName}[${k}][commission][amount]`, {
                  initialValue:
                    nonFinancialLimits && nonFinancialLimits[k]
                      ? nonFinancialLimits[k].commission && nonFinancialLimits[k].commission.amount
                      : undefined,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter commission',
                    },
                    {
                      pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                      message: 'Commisison must be number(two decimals are accepted).',
                    },
                  ],
                })(<InputNumber placeholder="Enter commission" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} className="ml-1">
                {getFieldDecorator(`${props.moduleName}[${k}][commission][type]`, {
                  initialValue:
                    nonFinancialLimits && nonFinancialLimits[k]
                      ? nonFinancialLimits[k].commission && nonFinancialLimits[k].commission.type
                      : undefined,
                  rules: [
                    {
                      required: true,
                      message: 'Please select commission type',
                    },
                  ],
                })(
                  <Select placeholder="Select type" dropdownMatchSelectWidth={false}>
                    {commissionTypes instanceof Array &&
                      commissionTypes.map((d, index) => (
                        <Select.Option key={index} value={d.code}>
                          {d.displayName}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </td>

        <td style={{ borderTop: 'none', width: 65 }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][active]`, {
              initialValue:
                nonFinancialLimits && nonFinancialLimits[k]
                  ? nonFinancialLimits[k].active
                  : undefined,
              valuePropName: 'checked',
            })(<Checkbox />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none', width: 65 }}>
          <div className="icons-list">
            {nonFinancialLimitKeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button "
                type="minus-circle-o"
                onClick={() => remove(k)}
              />
            ) : null}
          </div>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <Card>
        <h5>{t('schemes.nonFinancialLimits.title')}</h5>
        <Col span={24}>
          <table className="table table-responsive table-bordered ">
            <thead>
              <tr>
                <th>{t('schemes.nonFinancialLimits.apps.label')}</th>
                <th>{t('schemes.nonFinancialLimits.requestPerDay.label')}</th>
                <th>{t('schemes.nonFinancialLimits.requestPerMonth.label')}</th>
                <th>{t('schemes.nonFinancialLimits.fee.label')}</th>
                <th>{t('schemes.nonFinancialLimits.commission.label')}</th>
                <th width={65}>{t('table.active.label')}</th>
                <th width={65}>{t('table.action.label')}</th>
              </tr>
            </thead>
            <tbody>{formItems}</tbody>
          </table>
          <Button className="mt-2 mb-2 ml-2" type="dashed" onClick={() => add()}>
            <Icon type="plus" />
            Add more
          </Button>
        </Col>
      </Card>
    </Fragment>
  );
};

export default DynamicNonFinancialLimit;
