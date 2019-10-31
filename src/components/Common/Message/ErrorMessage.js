import React, { Fragment } from 'react';
import { Alert } from 'antd';

import { isEmpty } from '../../../utils/commonUtil';

const ErrorMessage = props => {
  const { error } = props;

  return (
    <Fragment>
      {!isEmpty(error) && (
        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
          <Alert message={error.message} type="error" showIcon />
        </div>
      )}
    </Fragment>
  );
};

export default ErrorMessage;
