import Vue from 'vue';
import VueRouter from 'vue-router';
import authGuard from '../auth/authGuard';

// import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';

import ClientView from '../views/clients/ClientView.vue';
import ClientList from '../views/clients/ClientList.vue';
import ClientNew from '../views/clients/ClientNew.vue';
import ClientDetail from '../views/clients/ClientDetail.vue';

import ProductView from '../views/products/ProductView.vue';
import ProductList from '../views/products/ProductList.vue';
import ProductNew from '../views/products/ProductNew.vue';
import ProductDetail from '../views/products/ProductDetail.vue';

import Error401 from '../views/Error401View.vue';

Vue.use(VueRouter);

const routes = [
  // { path: '/login', name: 'login', component: LoginView },
  {
    path: '/', name: 'home', component: HomeView, beforeEnter: authGuard,
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientView,
    children: [
      { path: 'list', component: ClientList, beforeEnter: authGuard },
      { path: 'new', component: ClientNew, beforeEnter: authGuard },
      { path: 'detail/:id/:name?/:surname?', component: ClientDetail, beforeEnter: authGuard },
    ],
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView,
    children: [
      { path: 'list', component: ProductList, beforeEnter: authGuard },
      { path: 'new', component: ProductNew, beforeEnter: authGuard },
      { path: 'detail/:code/:description?/:price?', component: ProductDetail, beforeEnter: authGuard },
    ],
  },
  { path: '/error401', component: Error401 },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
