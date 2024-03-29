import Vue from 'vue';
import Router from 'vue-router';
// Views
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        /*{
            path: '/auth',
            name: 'services',
            component: () => import('./views/Services.vue'),
        },
        {
            path: '/register',
            name: 'team',
            component: () => import('./views/Team.vue'),
        },*/
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '*',
            name: '404',
            component: () => import('./views/errors/404'),
        },
    ],
});
