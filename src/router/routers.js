import { LOGIN_PAGE_NAME } from "./index";

export default [
    {
        path: '/login',
        name: LOGIN_PAGE_NAME,
        component: () => import("../views/login/login.vue")
    },
    {
        path: '/',
        name: '_index',
        component: () => import('../views/framework/index.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/index/home.vue'),
            }
        ]
    },

]