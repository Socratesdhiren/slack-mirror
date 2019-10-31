import React, { Fragment } from 'react';

import AppHeader from 'components/Layout/Header';

const StaticLayout = props => {
    return (
        <Fragment>
            <section>
                <section>
                    <AppHeader />
                    {props.children}
                </section>
            </section>
        </Fragment>
    );
};

export default StaticLayout;
