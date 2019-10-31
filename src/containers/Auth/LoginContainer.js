import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authService from '../../services/authService';

// Import custom components
import loginForm from '../../components/Auth/loginForm';

export class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Submit the form.
     *
     * @param {object} formData
     */
    submitForm (formProps)  {

        this.props.actions.login(formProps);
    };

    render() {
        return (
            <loginForm
                submitForm={this.submitForm}
                {...this.props}
            />
        )
    }

}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer)
