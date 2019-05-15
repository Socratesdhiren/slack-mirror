
// axios to fetch the rest api
import axios from 'axios';

//import { API_URL } from '../constants/appConfig';
import { http404Error, http500Error } from '../actions/httpErrorAction';
//import configureStore from '../store/configureStore';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from './storageUtil';

//const store = configureStore();
const API_URL = process.env.REACT_APP_REST_API_HOST;
export const httpBase = () => {
    const api = axios.create({
        baseURL: `${API_URL}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getLocalStorage('token'),
        },
        responseType: 'json',
    });

    api.interceptors.response.use(
        response => {
            if (response.headers && response.headers['x-xsrf-token']) {
                setLocalStorage('token', response.headers['x-xsrf-token']);
            }
            return response;
        },
        error => {
            if (401 === error.response.status) {
                clearLocalStorage('token');
                clearLocalStorage('userName');
                clearLocalStorage('fullName');
                clearLocalStorage('user');
              //  store.dispatch(push('/'));
            }
            if (404 === error.response.status) {
             //   store.dispatch(http404Error());
             //   store.dispatch(push('/404'));
            }
            if (500 === error.response.status) {
              //  store.dispatch(http500Error());
              //  store.dispatch(push('/500'));
            }
            return Promise.reject(error);
        }
    );

    return api;
};
