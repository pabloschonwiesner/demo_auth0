/* eslint-disable no-shadow */
import api from '@/services/api';

const state = {
  products: [
    { code: 1, description: 'Coca Cola', price: 145.60 },
    { code: 2, description: 'Harina', price: 54.00 },
    { code: 3, description: 'Azucar', price: 57.00 },
    { code: 4, description: 'Yerba', price: 270.55 },
  ],
  product: {
    code: 0,
    description: '',
    price: 0.0,
  },
};

const mutations = {
  PRODUCTS(state, products) { state.products = products; },
  SELECT_PRODUCT(state, code) { state.product = { ...state.products.find((c) => c.code === Number(code)) }; },
  CLEAR_PRODUCT(state) { state.product = { code: 0, description: '', price: 0.0 }; },
  ADD_PRODUCT(state) {
    const product = { ...state.product };
    product.code = state.products.length + 1;
    state.products.push(product);
  },
  UPDATE_PRODUCT(state) {
    const product = { ...state.product };
    const index = state.products.findIndex((c) => c.code === Number(product.code));
    state.products[index] = { ...product };
  },
  DELETE_PRODUCT(state) {
    const product = { ...state.product };
    const index = state.products.findIndex((c) => c.code === Number(product.code));
    state.products.splice(index, 1);
  },
  PRODUCT_PROP(state, { property, value }) { state.product[property] = value; },
};

const actions = {
  // eslint-disable-next-line
  async getProductsHttp({ state }) { return await api.get('/products') },
  async getProductHttp({ commit }, code) {
    await api.get(`/products/${code}`);
    commit('SELECT_PRODUCT', code);
  },
  async createProductHttp({ state, commit }) {
    await api.post('/products', state.product);
    commit('ADD_PRODUCT');
  },
  async updateProductHttp({ state, commit }) {
    await api.put('/products', state.product);
    commit('UPDATE_PRODUCT');
  },
  async deleteProductHttp({ state, commit }) {
    await api.delete(`/products/${state.product.code}`);
    commit('DELETE_PRODUCT');
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
