import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isHostPartner} from '../utils/permissionUtil'

const Authorization = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isHostPartner() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/403',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

export default Authorization;
