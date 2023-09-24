import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        meta: {
            layout: "default",
            isShowFooter: true,
        },
        component: () => import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: { layout: "auth" },
        component: () => import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: { layout: "auth" },
        component: () => import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        meta: { text: "Profile", isShowFooter: true, layout: "default" },
        component: () => import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        meta: { layout: "default" },
        component: () => import(/* webpackChunkName: "logout" */ "../views/LogoutView.vue"),
    },
    {
        path: "/list-transaction",
        name: "list-transaction",
        meta: { text: "List transaction", isShowFooter: true, layout: "default" },
        component: () => import(/* webpackChunkName: "list-transaction" */ "../views/ListTransactionView.vue"),
    },
    {
        path: "/category",
        name: "category",
        meta: { text: "Category", isShowFooter: true, layout: "default" },
        component: () => import(/* webpackChunkName: "category" */ "../views/CategoryView.vue"),
    },
    {
        path: "/add-transaction",
        name: "add-transaction",
        meta: { text: "Add transaction", isShowFooter: true, layout: "default" },
        component: () => import(/* webpackChunkName: "add-transaction" */ "../views/AddTransactionView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
