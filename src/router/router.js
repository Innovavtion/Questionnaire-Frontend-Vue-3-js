import MainPage from "../pages/Main.vue";
import RegisterPage from "../pages/Register.vue";
import LoginPage from "../pages/Login.vue";
import NotFound from "../pages/404.vue";

import AdminPolls from "../pages/Admin/Polls/Polls.vue"
import AdminPoll from "../pages/Admin/Polls/Poll.vue"
import AdminPollsLayout from "../pages/Admin/PollsLoyout.vue"
import AdminUsers from "../pages/Admin/Users.vue"

import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            if (JSON.parse(localStorage.getItem('user'))) {
                next({ name: 'main' })
            } else {
                next()
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        beforeEnter: (to, from, next) => {
            if (JSON.parse(localStorage.getItem('user'))) {
                next({ name: 'main' })
            } else {
                next()
            }
        }
    },
    {
        path: '/polls',
        component: AdminPollsLayout,
        children: [
            {
                path: '',
                component: AdminPolls,
            },
            {
                path: ':id',
                component: AdminPoll,
            },
        ],
    },
    {
        path: '/editUsers',
        name: 'editUsers',
        component: AdminUsers,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;