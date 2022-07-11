import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { domain, clientId, audience } from '../auth_config.json';
import { Auth0Plugin } from './auth';

import App from './App.vue';
import router from './router';
import store from './store';
import api from './services/api';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

const VueApp = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

api.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-underscore-dangle
    const token = await VueApp.$auth.getTokenSilently();
    // const token = 'jjjjj';
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => { Promise.reject(err); },
);

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    return router.push('/error401');
  }
  return Promise.reject(error);
});

export default VueApp;
