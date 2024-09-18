import React, { lazy } from 'react';
// import { getBooleanFromENV } from 'components/utils';

import Home from '@/view/Home';
import PageA from '@/view/PageA';
import PageB from '@/view/PageB';
import Login from '@/view/User/Login';
import Account from '@/view/User/Account';

const routes = [
    {
        main: 'dashboard',
        path: '/main',
        title: 'overall',
        component: Home,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'dashboard',
        path: '/user/account',
        title: 'sensor',
        component: Account,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    },
    {
        main: 'equipment_management',
        path: '/pageA',
        title: 'equipment_list',
        component: PageA,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'equipment_management',
        path: '/pageB',
        title: 'event_management',
        component: PageB,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    }
];

// //------- BEGIN: 藉由feature flag開關routes----------
// if (getBooleanFromENV('REACT_APP_IS_JAVA_OPEN', false)) {
//     routes.push({
//         path: '/animate/:param?',
//         title: 'Animate',
//         component: Animate,
//         exact: true,
//         authRequired: false,
//         layouts: ['NavLeft'],
//     });
// }

export default routes;
