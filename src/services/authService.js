import axios from 'axios';
import { message } from 'antd';
import {push} from "connected-react-router";

import {loginFailure, loginSuccess, logoutSuccess} from "../actions/authAction";
import {setLocalStorage, clearLocalStorage} from '../utils/storageUtil';


export function login(username,password) {
    return function (dispatch) {
        return axios.post(`https://dev.citytech.global:1443/customers/v1/login`,{username,password}).then((response) => {
            dispatch(loginSuccess(response.data.data));
            setLocalStorage('token', response.data.data.token);
          //  dispatch(push('/app/dashboard'));
            message.success('Login Successfully')
        })
            .catch((error) => {
                dispatch(loginFailure(error.response.data.data));
            });
    };
}

export function logout() {

    return function (dispatch) {
        clearLocalStorage('token');
        dispatch(logoutSuccess());
        dispatch(push('/'));

        return false;
    };
}
