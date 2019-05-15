import React, { Fragment } from 'react';

import SideNavList from './SideNavList';
import ChildrenList from './ChildrenList';

const SideNav = () => {
    return (
        <Fragment>
            <SideNavList />
            <ChildrenList />
        </Fragment>
    );
};

export default SideNav;
