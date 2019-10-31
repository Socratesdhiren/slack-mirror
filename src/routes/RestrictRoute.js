import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../components/Context/AuthContext';

const Restrict = ({ component: Component, layout: Layout, ...rest }) => {
    const { authenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: props.location },
                        }}
                    />
                ) : (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            }
        />
    );
};

export default Restrict;
