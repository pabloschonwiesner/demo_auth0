import Vue from 'vue';
import Vuex from 'vuex';
import products from './products';
import clients from './clients';

Vue.use(Vuex);

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // eslint-disable-next-line prefer-template
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  return JSON.parse(jsonPayload);
}

const store = new Vuex.Store({
  state: {
    user: [],
    roles: [],
    permissions: [],
  },
  getters: {
    hasPermission: (state) => (permission) => {
      let arrayPermissions = [];
      let itIsAllowed = false;

      if (Array.isArray(permission)) {
        arrayPermissions = permission;
      } else {
        arrayPermissions.push(permission);
      }

      try {
        arrayPermissions.forEach((item) => {
          if (state.permissions.indexOf(item) >= 0) {
            itIsAllowed = true;
            // eslint-disable-next-line no-throw-literal
            throw 'Break';
          }
        });
        return itIsAllowed;
      } catch (err) {
        return itIsAllowed;
      }
    },
  },
  mutations: {
    USER(state, user) { state.user = user; },
    ROLES(state, roles) { state.roles = roles; },
    PERMISSIONS(state, permissions) { state.permissions = permissions; },
  },
  actions: {
    async setSessionData({ commit }) {
      // eslint-disable-next-line no-underscore-dangle
      const authToken = await this._vm.$auth.getTokenSilently();
      console.log(authToken);
      const token = parseJwt(authToken);
      const user = [];

      // eslint-disable-next-line no-underscore-dangle
      const keys = Object.keys(this._vm.$auth.user);
      // eslint-disable-next-line no-underscore-dangle
      const values = Object.values(this._vm.$auth.user);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < keys.length; i++) {
        user.push({ property: keys[i], value: values[i] });
      }

      commit('USER', user);
      commit('ROLES', token['https://integrapablo.herokuapp.com/roles']);
      commit('PERMISSIONS', token.permissions);
    },
  },
  modules: {
    products,
    clients,
  },
});

export default store;
