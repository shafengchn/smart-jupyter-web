
export default [
    {
        path: '/login',
        name: "login",
        component: () => import("../views/login/login.vue")
    },
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/framework/index.vue'),
        children: [],
    }
]