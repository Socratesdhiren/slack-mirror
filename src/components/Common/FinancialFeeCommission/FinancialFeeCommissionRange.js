import React, { Fragment, useEffect } from 'react';
import { Form, Icon, Select, Button, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../utils/commonUtil';

const FormItem = Form.Item;

let id;

const FinancialFeeCommissionRange = props => {
  const { t } = useTranslation();
  const { feeCharges, commissionBasis } = props;

  const { form, keyIndex, feeCommissions } = props;
  const { getFieldDecorator, getFieldValue } = props.form;

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

  const handleAmtRangeTo = (rule, value, callback, index) => {
    if (
      value <
      getFieldValue(
        `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${index}][[amountRange][from]]`
      )
    ) {
      callback('"Amount range to" must be greater than or equal to "amount range from".');
    }
    callback();
  };

  const handleAmtRangeFrom = (rule, value, callback, index) => {
    if (
      value <=
      getFieldValue(
        `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${index -
          1}][[amountRange][to]]`
      )
    ) {
      callback('"Amount range from" must be greater than previous amount range.');
    }
    callback();
  };

  const addRange = () => {
    // can use data-binding to get
    const rangeKeys = form.getFieldValue(`rangeKeys[${keyIndex}]`);
    const nextKeys = rangeKeys.concat(id++);
    // can use data-binding to set
    form.setFieldsValue({
      [`rangeKeys[${keyIndex}]`]: nextKeys,
    });
  };

  const removeRange = k => {
    // can use data-binding to get
    const rangeKeys = form.getFieldValue(`rangeKeys[${keyIndex}]`);
    // We need at least one range key
    if (rangeKeys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      [`rangeKeys[${keyIndex}]`]: rangeKeys.filter(key => key !== k),
    });
  };

  useEffect(() => {
    id = !isEmpty(feeCommissions) ? feeCommissions.length : 1;
  }, [feeCommissions]);

  getFieldDecorator(`rangeKeys[${keyIndex}]`, {
    initialValue: !isEmpty(feeCommissions) ? feeCommissions.map((k, index) => index) : [0],
  });

  const rangeKeys = getFieldValue(`rangeKeys[${keyIndex}]`);

  const formItems =
    rangeKeys &&
    rangeKeys.map((k, index) => (
      <table key={k}>
        <tbody>
          <tr style={{ margin: 0 }}>
            <td style={{ borderTop: 'none', borderRight: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[amountRange][from]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].amountRange && feeCommissions[k].amountRange.from
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please enter amount range from',
                      },
                      {
                        pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                        message: 'Amount range from must be number(two decimals are accepted).',
                      },
                      {
                        validator: (rule, value, callback) =>
                          handleAmtRangeFrom(rule, value, callback, index),
                      },
                    ],
                  }
                )(<InputNumber placeholder="Enter amount" style={{ width: '100%' }} />)}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[amountRange][to]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].amountRange && feeCommissions[k].amountRange.to
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please enter amount range to',
                      },
                      {
                        pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                        message: 'Amount range to must be number(two decimals are accepted).',
                      },
                      {
                        validator: (rule, value, callback) =>
                          handleAmtRangeTo(rule, value, callback, index),
                      },
                    ],
                  }
                )(<InputNumber placeholder="Enter amount" style={{ width: '100%' }} />)}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[fee][percentage]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].fee && feeCommissions[k].fee.percentage
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please enter fee percent',
                      },
                      {
                        pattern: new RegExp('^\\d{0,2}(\\.\\d{1,2})?$|100$'),
                        message: 'Percentage must be between 0-100(two decimals are accepted).',
                      },
                    ],
                  }
                )(<InputNumber placeholder="Enter fee %" style={{ width: '100%' }} />)}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[fee][flat]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].fee && feeCommissions[k].fee.flat
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please enter flat fee',
                      },
                      {
                        pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                        message: 'Flat fee must be number(two decimals are accepted).',
                      },
                    ],
                  }
                )(<InputNumber placeholder="Enter flat fee" style={{ width: '100%' }} />)}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[fee][chargeType]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].fee && feeCommissions[k].fee.chargeType
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please select fee type',
                      },
                    ],
                  }
                )(
                  <Select placeholder="Select fee type" dropdownMatchSelectWidth={false}>
                    {feeCharges instanceof Array &&
                      feeCharges.map((d, index) => (
                        <Select.Option key={index} value={d.code}>
                          {d.displayName}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[commission][basis]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].commission && feeCommissions[k].commission.basis
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please select commission basis',
                      },
                    ],
                  }
                )(
                  <Select placeholder="Select commission basis" dropdownMatchSelectWidth={false}>
                    {commissionBasis instanceof Array &&
                      commissionBasis.map((d, index) => (
                        <Select.Option key={index} value={d.code}>
                          {d.displayName}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none' }}>
              {getFieldValue(
                `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[commission][basis]]`
              ) === 'FLAT' ? (
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(
                    `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[commission][value]]`,
                    {
                      initialValue:
                        feeCommissions && feeCommissions[k]
                          ? feeCommissions[k].commission && feeCommissions[k].commission.value
                          : undefined,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter commission value',
                        },
                      ],
                    }
                  )(<InputNumber placeholder="Enter value" style={{ width: '100%' }} />)}
                </FormItem>
              ) : (
                <FormItem {...formItemLayout}>
                  {getFieldDecorator(
                    `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[commission][value]]`,
                    {
                      initialValue:
                        feeCommissions && feeCommissions[k]
                          ? feeCommissions[k].commission && feeCommissions[k].commission.value
                          : undefined,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter commission value',
                        },
                        {
                          pattern: new RegExp('^\\d{0,2}(\\.\\d{1,2})?$|100$'),
                          message: 'Value must be between 0-100(two decimals are accepted).',
                        },
                      ],
                    }
                  )(<InputNumber placeholder="Enter value" style={{ width: '100%' }} />)}
                </FormItem>
              )}
            </td>

            <td style={{ borderTop: 'none' }}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(
                  `${props.moduleName}[${props.keyIndex}]${props.subModuleName}[${k}][[commission][max]]`,
                  {
                    initialValue:
                      feeCommissions && feeCommissions[k]
                        ? feeCommissions[k].commission && feeCommissions[k].commission.max
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please enter commission maximum',
                      },
                      {
                        pattern: new RegExp('^\\d+(\\.\\d{1,2})?$'),
                        message: 'Max amount must be number(two decimals are accepted).',
                      },
                    ],
                  }
                )(<InputNumber placeholder="Enter max commission" style={{ width: '100%' }} />)}
              </FormItem>
            </td>

            <td style={{ borderTop: 'none', borderRight: 'none', width: 65 }}>
              <div className="icons-list">
                {rangeKeys.length > 1 ? (
                  <Icon
                    className="dynamic-delete-button "
                    type="delete"
                    onClick={() => removeRange(k)}
                  />
                ) : null}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    ));

  return (
    <Fragment>
      {formItems}
      <Button type="link" onClick={() => addRange()}>
        <Icon type="plus" />
        Add range
      </Button>
    </Fragment>
  );
};

export default FinancialFeeCommissionRange;
