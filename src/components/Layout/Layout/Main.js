import React, { Fragment } from 'react';

import 'index.css';
import AppHeader from 'components/Layout/Header';
import SideNav from 'components/Layout/SideNav';
import Footer from 'components/Layout/Footer';

const MainLayout = props => {

    return (
        <Fragment>
            <AppHeader />

            <div >
                <section>
                    <SideNav />

                    <main >{props.children}</main>
                </section>

                /* you can add notification here */
            </div>

            <Footer />
        </Fragment>
    );
};

export default MainLayout;
