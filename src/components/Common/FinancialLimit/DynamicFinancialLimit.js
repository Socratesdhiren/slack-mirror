import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Form, Icon, Select, Checkbox, Button, InputNumber, Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import './style.css';
import { isEmpty } from '../../../utils/commonUtil';

const FormItem = Form.Item;
const { Option } = Select;

let id;
let originalFinancialApp;

const DynamicFinancialLimit = props => {
  const { t } = useTranslation();
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;
  const { apps } = props;
  const { financialLimits } = props.schemes;
  const [financialApps, setFinancialApps] = useState([]);

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

  const handleMinAmtTrans = (rule, value, callback, index) => {
    if (value > getFieldValue(`${props.moduleName}[${index}][amountLimits][daily]`)) {
      callback('Min Amt/Tran must be less than or equal to daily limit.');
    }
    callback();
  };

  const handleMaxAmtTrans = (rule, value, callback, index) => {
    if (
      value > getFieldValue(`${props.moduleName}[${index}][amountLimits][daily]`) ||
      value < getFieldValue(`${props.moduleName}[${index}][amountLimits][minAmountPerTransaction]`)
    ) {
      callback(
        'Min Amt/Tran must be less than or equal to daily limit,and greater than or equals to Min Amt/Tran'
      );
    }
    callback();
  };

  const remove = k => {
    const deletedCode = getFieldValue(`${props.moduleName}[${k}][app]`);
    if (deletedCode) {
      const deleteRow = originalFinancialApp.filter(o => deletedCode.includes(o.code));
      setFinancialApps([...financialApps, deleteRow[0]]);
    }

    // can use data-binding to get
    const financialLimitKeys = getFieldValue('financialLimitKeys');
    // We need at least one limit key
    if (financialLimitKeys.length === 1) {
      return;
    }

    // can use data-binding to set
    setFieldsValue({
      financialLimitKeys: financialLimitKeys.filter(financialLimitKeys => financialLimitKeys !== k),
    });
  };

  const add = () => {
    // can use data-binding to get
    const financialLimitKeys = getFieldValue('financialLimitKeys');
    const nextKeys = financialLimitKeys.concat(id++);
    // can use data-binding to set
    setFieldsValue({
      financialLimitKeys: nextKeys,
    });
  };

  useEffect(() => {
    id = !isEmpty(financialLimits) ? financialLimits.length : 1;
  }, [financialLimits]);

  useEffect(() => {
    originalFinancialApp = apps.filter(value => value.type === 'FINANCIAL');
    const selectedCode = financialLimits && financialLimits.map(k => k.app);
    if (selectedCode) {
      setFinancialApps(originalFinancialApp.filter(o => !selectedCode.includes(o.code)));
    } else {
      setFinancialApps(originalFinancialApp);
    }
  }, [apps]);

  getFieldDecorator('financialLimitKeys', {
    initialValue: !isEmpty(financialLimits) ? financialLimits.map((k, index) => index) : [0],
  });

  const financialLimitKeys = getFieldValue('financialLimitKeys');

  const handleAppSelect = (value, k) => {
    const replacedCode = getFieldValue(`${props.moduleName}[${k}][app]`);
    if (replacedCode) {
      setFinancialApps(originalFinancialApp.filter(o => replacedCode.includes(o.code)));
    } else {
      setFinancialApps(financialApps.filter(o => !value.includes(o.code)));
    }
  };

  const formItems =
    financialLimitKeys &&
    financialLimitKeys.map((k, index) => (
      <tr key={k}>
        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][app]`, {
              initialValue:
                financialLimits && financialLimits[k] ? financialLimits[k].app : undefined,
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
                {financialApps instanceof Array &&
                  financialApps.map(d => <Option key={d.code}>{d.displayName}</Option>)}
              </Select>
            )}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][requestPerDay]`, {
              initialValue:
                financialLimits && financialLimits[k]
                  ? financialLimits[k].requestPerDay
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter request/day',
                },
                {
                  pattern: new RegExp('^[0-9]+$'),
                  message: 'Req/day must be number.',
                },
              ],
            })(<InputNumber placeholder="Enter request/day" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][requestPerMonth]`, {
              initialValue:
                financialLimits && financialLimits[k]
                  ? financialLimits[k].requestPerMonth
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter request/month',
                },
                {
                  pattern: new RegExp('^[0-9]+$'),
                  message: 'Req/month must be number.',
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
            {getFieldDecorator(`${props.moduleName}[${k}][amountLimits][daily]`, {
              initialValue:
                financialLimits && financialLimits[k]
                  ? financialLimits[k].amountLimits && financialLimits[k].amountLimits.daily
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter daily limit',
                },
                {
                  pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                  message: 'Daily limit must be number(two decimals are accepted).',
                },
              ],
            })(<InputNumber placeholder="Enter daily limit" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][amountLimits][monthly]`, {
              initialValue:
                financialLimits && financialLimits[k]
                  ? financialLimits[k].amountLimits && financialLimits[k].amountLimits.monthly
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter monthly limit',
                },
                {
                  pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                  message: 'Monthly limit must be number(two decimals are accepted).',
                },
              ],
            })(<InputNumber placeholder="Enter monthly limit" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][amountLimits][minAmountPerTransaction]`, {
              initialValue:
                financialLimits && financialLimits[k]
                  ? financialLimits[k].amountLimits &&
                    financialLimits[k].amountLimits.minAmountPerTransaction
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter minimum amount per transaction',
                },
                {
                  pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                  message: 'Min Amt/Tran must be number(two decimals are accepted).',
                },
                {
                  validator: (rule, value, callback) => handleMinAmtTrans(rule, value, callback, k),
                },
              ],
            })(<InputNumber placeholder="Enter Min Amt/Tran" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][amountLimits][maxAmountPerTransaction]`, {
              initialValue:
                financialLimits && financialLimits[k]
                  ? financialLimits[k].amountLimits &&
                    financialLimits[k].amountLimits.maxAmountPerTransaction
                  : undefined,
              rules: [
                {
                  required: true,
                  message: 'Please enter maximum amount per transaction',
                },
                {
                  pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                  message: 'Max Amt/Tran must be number(two decimals are accepted).',
                },
                {
                  validator: (rule, value, callback) => handleMaxAmtTrans(rule, value, callback, k),
                },
              ],
            })(<InputNumber placeholder="Enter Max Amt/Tran" style={{ width: '100%' }} />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none', width: 65 }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][active]`, {
              initialValue:
                financialLimits && financialLimits[k] ? financialLimits[k].active : undefined,
              valuePropName: 'checked',
            })(<Checkbox />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none', width: 65 }}>
          <div className="icons-list">
            {financialLimitKeys.length > 1 ? (
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
        <h5>{t('schemes.financialLimits.title')}</h5>
        <Col span={24}>
          <table className="table table-responsive table-bordered ">
            <thead>
              <tr>
                <th>{t('schemes.financialLimits.apps.label')}</th>
                <th>{t('schemes.financialLimits.requestPerDay.label')}</th>
                <th>{t('schemes.financialLimits.requestPerMonth.label')}</th>
                <th colSpan={4}>{t('schemes.financialLimits.amountLimits.label')}</th>
                <th width={65}>{t('table.active.label')}</th>
                <th width={65}>{t('table.action.label')}</th>
              </tr>
              <tr>
                <th colSpan={3} />
                <th>{t('schemes.financialLimits.amountLimits.daily.label')}</th>
                <th>{t('schemes.financialLimits.amountLimits.monthly.label')}</th>
                <th>{t('schemes.financialLimits.amountLimits.minAmountPerTransaction.label')}</th>
                <th>{t('schemes.financialLimits.amountLimits.maxAmountPerTransaction.label')}</th>
                <th width={65} />
                <th width={65} />
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

export default DynamicFinancialLimit;
