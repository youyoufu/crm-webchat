import task from '@/api/task';
import { ActionTree, ActionContext, GetterTree, MutationTree } from 'vuex';

const state = {
  all: []
};

const getters = {};
// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  }
};
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
