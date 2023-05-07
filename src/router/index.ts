import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
},
{
    path: '/',
    name: 'index',
    component: () => import('../views/index/index.vue'),
    meta: {
        isShow: false,
        title: '首页'
    },
    redirect: 'goods',
    children: [{
        path: 'goods',
        name: 'goods',
        meta: {
            isShow: true,
            title: '商品列表'
        },
        component: () => import('../views/goods/goods.vue')
    },
    {
        path: 'user',
        name: 'user',
        meta: {
            isShow: true,
            title: '用户列表'
        },
        component: () => import('../views/user/user.vue'),
    },
    {
        path: 'role',
        name: 'role',
        meta: {
            isShow: true,
            title: '角色列表'
        },
        component: () => import('../views/role/role.vue'),
    },
    {
        path: 'authority',
        name: 'authority',
        meta: {
            isShow: false,
            title: '权限列表'
        },
        component: () => import('../views/authority/authority.vue'),
    },
    {
        path: 'sale',
        name: 'sale',
        meta: {
            isShow: true,
            title: '销量列表'
        },
        component: () => import('../views/sale/sale.vue'),
    },
    {
        path: 'lesson',
        name: 'lesson',
        meta: {
            isShow: true,
            title: '课程列表'
        },
        component: () => import('../views/lesson/lesson.vue'),
    },
    {
        path: 'viedo',
        name: 'viedo',
        meta: {
            isShow: true,
            title: '大屏展示'
        },
        component: () => import('../views/viedo/viedo.vue'),
    },
    {
        path: 'vshow',
        name: 'vshow',
        meta: {
            isShow: true,
            title: 'CSS展示'
        },
        component: () => import('../views/vshow/vshow.vue'),
    }
    ]
}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const token: string | null = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
        next('login')
    } else {
        next()
    }
})
export default router;