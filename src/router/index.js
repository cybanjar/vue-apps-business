import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue')
    },
    {
        path: '/data-post',
        name: 'dataPost',
        component: () => import('@/views/auth/DataPost.vue')
    },
    {
        path: '/new-post',
        name: 'newPost',
        component: () => import('@/views/dashboard/NewPost.vue')
    },
    {
        path: "/notFound",
        name: "notFound",
        component: () => import('@/views/notFound.vue')
    },
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router