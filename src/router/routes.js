
export default [
    {
        path: '/login',
        name: "login",
        component: () => import("../views/login/login.vue")
	},
	{
        path: '/401',
        name: "401",
        component: () => import("../views/error/401.vue")
    },
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/framework/index.vue'),
        children: [],
    }
]