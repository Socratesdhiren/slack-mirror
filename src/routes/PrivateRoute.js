import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../components/Context/AuthContext';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const { authenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
