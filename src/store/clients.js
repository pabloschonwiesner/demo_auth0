/* eslint-disable no-shadow */
import api from '@/services/api';

const state = {
  clients: [
    { id: 1, name: 'Pablo', surname: 'Schonwiesner' },
    { id: 2, name: 'Marisa', surname: 'Perez' },
    { id: 3, name: 'Fernando', surname: 'Gomez' },
    { id: 4, name: 'Carla', surname: 'Fernandez' },
  ],
  client: {
    id: 0,
    name: '',
    surname: '',
  },
};

const mutations = {
  CLIENTS(state, clients) { state.clients = clients; },
  SELECT_CLIENT(state, id) {
    state.client = { ...state.clients.find((c) => c.id === Number(id)) };
  },
  CLEAR_CLIENT(state) { state.client = { id: 0, name: '', surname: '' }; },
  ADD_CLIENT(state) {
    const client = { ...state.client };
    client.id = state.clients.length + 1;
    state.clients.push(client);
  },
  UPDATE_CLIENT(state) {
    const client = { ...state.client };
    const index = state.clients.findIndex((c) => c.id === Number(client.id));
    state.clients[index] = { ...client };
  },
  DELETE_CLIENT(state) {
    const client = { ...state.client };
    const index = state.clients.findIndex((c) => c.id === Number(client.id));
    state.clients.splice(index, 1);
  },
  CLIENT_PROP(state, { property, value }) { state.client[property] = value; },
};

const actions = {
  // eslint-disable-next-line
  async getClientsHttp({ state }) { await api.get('/clients'); },
  async getClientHttp({ commit }, id) {
    await api.get(`/clients/${id}`);
    commit('SELECT_CLIENT', id);
  },
  async createClientHttp({ state, commit }) {
    await api.post('/clients', state.client);
    commit('ADD_CLIENT');
  },
  async updateProductHttp({ state, commit }) {
    await api.put('/clients', state.client);
    commit('UPDATE_CLIENT');
  },
  async deleteClientHttp({ state, commit }) {
    await api.delete(`/clients/${state.client.id}`);
    commit('DELETE_CLIENT');
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
