 // imports custom Components
 import {
    LOG_IN_SUCCESS,
     LOG_IN_FAILURE,
     LOG_OUT_SUCCESS
 } from '../constant/actionTypes';

const INITIAL_STATE = {
    token:null,
    isAuthenticated:false,
    isLoading: false,
    errors:{}
};

/**
 * A reducer takes two agruments , the current state and an action.
 */

export default function (state,action) {
    state = state || INITIAL_STATE;

    switch (action.type) {
        case LOG_IN_SUCCESS:
            return Object.assign({},state,{
                isLoading: false,
                token: action.data,
                isAuthenticated: true
            });

        case LOG_IN_FAILURE:
            return Object.assign({},state,{
                isAuthenticated:false,
                token:null,
                isLoading: false,
                errors:action.error
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({},state,{
                isAuthenticated:false,
                token: null,
                errors:{},
                isLoading: false,
            });

        default:
            return state;
    }
}