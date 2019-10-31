import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Form, Icon, Select, Checkbox, Button, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import './style.css';
import FinancialFeeCommissionRange from './FinancialFeeCommissionRange';
import { isEmpty } from '../../../utils/commonUtil';

const FormItem = Form.Item;
const { Option } = Select;

let id;
let originalFinancialApp;

const DynamicFinancialFeeCommission = props => {
  const { t } = useTranslation();
  const { apps } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;
  const { financialFeeAndCommissions } = props.schemes;
  const [financialApps, setFinancialApps] = useState([]);

  useEffect(() => {
    props.fetchFeeCharge();
    props.fetchCommissionBasis();
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

  const add = () => {
    // can use data-binding to get
    const financialFeeKeys = getFieldValue('financialFeeKeys');
    const nextKeys = financialFeeKeys.concat(id++);
    // can use data-binding to set
    setFieldsValue({
      financialFeeKeys: nextKeys,
    });
  };

  const remove = k => {
    const deletedCode = getFieldValue(`${props.moduleName}[${k}][app]`);
    if (deletedCode) {
      const deleteRow = originalFinancialApp.filter(o => deletedCode.includes(o.code));
      setFinancialApps([...financialApps, deleteRow[0]]);
    }

    // can use data-binding to get
    const financialFeeKeys = getFieldValue('financialFeeKeys');
    // We need at least one financial key
    if (financialFeeKeys.length === 1) {
      return;
    }

    // can use data-binding to set
    setFieldsValue({
      financialFeeKeys: financialFeeKeys.filter(key => key !== k),
    });
  };

  useEffect(() => {
    id = !isEmpty(financialFeeAndCommissions) ? financialFeeAndCommissions.length : 1;
  }, [financialFeeAndCommissions]);

  useEffect(() => {
    originalFinancialApp = apps.filter(value => value.type === 'FINANCIAL');
    const selectedCode = financialFeeAndCommissions && financialFeeAndCommissions.map(k => k.app);
    if (selectedCode) {
      setFinancialApps(originalFinancialApp.filter(o => !selectedCode.includes(o.code)));
    } else {
      setFinancialApps(originalFinancialApp);
    }
  }, [apps]);

  getFieldDecorator('financialFeeKeys', {
    initialValue: !isEmpty(financialFeeAndCommissions)
      ? financialFeeAndCommissions.map((k, index) => index)
      : [0],
  });

  const financialFeeKeys = getFieldValue('financialFeeKeys');

  const handleAppSelect = (value, k) => {
    const replacedCode = getFieldValue(`${props.moduleName}[${k}][app]`);
    if (replacedCode) {
      setFinancialApps(originalFinancialApp.filter(o => replacedCode.includes(o.code)));
    } else {
      setFinancialApps(financialApps.filter(o => !value.includes(o.code)));
    }
  };

  const formItems =
    financialFeeKeys &&
    financialFeeKeys.map((k, index) => (
      <tr key={index}>
        <td style={{ borderTop: 'none' }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][app]`, {
              initialValue:
                financialFeeAndCommissions && financialFeeAndCommissions[k]
                  ? financialFeeAndCommissions[k].app
                  : undefined,
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

        <td style={{ borderTop: 'none', padding: 0 }} colSpan={9}>
          <FinancialFeeCommissionRange
            {...props}
            keyIndex={k}
            feeCommissions={
              financialFeeAndCommissions &&
              financialFeeAndCommissions[k] &&
              financialFeeAndCommissions[k].feeCommissions
            }
            moduleName={props.moduleName}
            subModuleName={'feeCommissions'}
          />
        </td>

        <td style={{ borderTop: 'none', width: 65 }}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`${props.moduleName}[${k}][active]`, {
              initialValue:
                financialFeeAndCommissions && financialFeeAndCommissions[k]
                  ? financialFeeAndCommissions[k].active
                  : false,
              valuePropName: 'checked',
            })(<Checkbox />)}
          </FormItem>
        </td>

        <td style={{ borderTop: 'none', width: 65 }}>
          <div className="icons-list">
            {financialFeeKeys.length > 1 ? (
              <Fragment>
                <Icon
                  className="dynamic-delete-button "
                  type="minus-circle-o"
                  onClick={() => remove(k)}
                />
              </Fragment>
            ) : null}
          </div>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <Card>
        <h5>{t('schemes.financialFeeAndCommissionLimits.title')}</h5>
        <Col span={24}>
          <table className="table table-responsive table-bordered ">
            <thead>
              <tr>
                <th>{t('schemes.financialFeeAndCommissionLimits.apps.label')}</th>
                <th colSpan={2}>
                  {t('schemes.financialFeeAndCommissionLimits.amountRange.label')}
                </th>
                <th colSpan={3}>{t('schemes.financialFeeAndCommissionLimits.fee.label')}</th>
                <th colSpan={3}>
                  {t('schemes.financialFeeAndCommissionLimits.commissions.label')}
                </th>
                <th width={65} />
                <th width={65}>{t('table.active.label')}</th>
                <th width={65}>{t('table.action.label')}</th>
              </tr>
              <tr>
                <th />
                <th>{t('schemes.financialFeeAndCommissionLimits.amountRange.from.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.amountRange.to.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.fee.percentage.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.fee.flat.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.fee.chargeType.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.commissions.basis.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.commissions.value.label')}</th>
                <th>{t('schemes.financialFeeAndCommissionLimits.commissions.max.label')}</th>
                <th width={65}>{t('table.action.label')}</th>
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

export default DynamicFinancialFeeCommission;
