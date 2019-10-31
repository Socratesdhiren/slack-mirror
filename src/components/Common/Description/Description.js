import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './index.css';
import responsive from './responsive';

const Description = ({ term, column, children }) => (
  <Row type="flex">
    <Col {...responsive[column]}>{term && <div className="term">{term}</div>}</Col>
    <Col xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={16}>
      {children !== null && children !== undefined && <div className="detail">{children}</div>}
    </Col>
  </Row>
);

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;
