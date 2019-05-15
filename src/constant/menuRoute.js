export default [
    {
        name: 'Dashboard',
        key: 'dashboard',
        path: '/dashboard',
        iconName: 'ion-md-speedometer',
    },
    {
        name: 'Currencies',
        key: 'currencies',
        path: '/currencies',
        iconName: 'icon ion-md-cash',
    },
    {
        name: 'Countries',
        key: 'countries',
        path: '/countries',
        iconName: 'icon ion-md-globe',
    },
    {
        name: 'Partners',
        key: 'partners',
        path: '/partners',
        iconName: 'icon ion-md-people',
    },
    {
        name: 'Commission/Fee',
        key: 'commissions',
        path: '/commissions',
        iconName: 'icon ion-md-calculator',
    },
    {
        name: 'Globals',
        key: 'globals',
        path: '/globals',
        iconName: 'icon ion-md-construct',
        children: [
            {
                name: 'ID Types',
                key: 'globals/id-types',
                searchKey: 'ID Types',
                path: '/globals/id-types',
            },
            {
                name: 'Income Sources',
                key: 'globals/income-sources',
                searchKey: 'Income Sources',
                path: '/globals/income-sources',
            },
            {
                name: 'Remittances Resason',
                key: 'globals/remittance-reasons',
                searchKey: 'Remittances Resason',
                path: '/globals/remittance-reasons',
            },
        ],
    },
];
