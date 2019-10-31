import React, {useState, Fragment,useContext} from 'react';
import {Form, Icon, Input, Button, Row} from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import AppFooter from "../Layout/Footer";
import { AuthContext } from '../Context/AuthContext';
import Message from '../Common/Message';

const FormItem = Form.Item;

const LoginForm  = props =>  {
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                login(values).catch(error => {
                    setErrorMessage(error.response.data);
                });
            }
        })
    };

        const {getFieldDecorator} = props.form;

        return (
            <Fragment>
                <Message error={errorMessage} />
            <div className="login-form">
                <div className="logo">
                    <img alt="logo"/>
                    <span>abcdefgh</span>
                </div>

                <Form onSubmit={handleSubmit}  layout="vertical">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email"
                            />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </FormItem>
                    <Row>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign in
                        </Button>
                    </Row>
                </Form>
            </div>
                {/*<div className="footer">*/}
                    {/*<AppFooter/>*/}
                {/*</div>*/}

            </Fragment>
        );
    };

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
