import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isClickAddBtn: false,
    toastMessage: "",
    cartItems: [],
  },
  getters: {},
  mutations: {
    handleClickAddButton(state, payload) {
      state.isClickAddBtn = payload;
    },
    setToastMessage(state, payload) {
      state.toastMessage = payload;
    },
    AddCartItem(state, payload) {
      const cloneCartItem = [...state.cartItems];
      cloneCartItem.push(payload);
      state.cartItems = cloneCartItem;
      console.log(state.cartItems)
    },
    updateCartItems(state, payload) {
      state.cartItems = payload;
      console.log(state.cartItems)
    },
  },
  actions: {
    handleClickAddButton({ commit }, payload) {
      commit("handleClickAddButton", payload);
    },
    setToastMessage({ commit }, payload) {
      commit("setToastMessage", payload);
    },
    AddCartItem({ commit }, payload) {
      commit("AddCartItem", payload);
    },
    updateCartItems({ commit }, payload) {
      commit("updateCartItems", payload);
    },
  },
  modules: {},
});
