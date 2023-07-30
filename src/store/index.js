import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isClickAddBtn: false,
    toastMessage: "",
    toastType : "success",
    cartItems: [],
    isShowModalDelete: false,
    currentSelectedCake: "",
    isShowNotes: false,
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
    },
    updateCartItems(state, payload) {
      state.cartItems = payload;
      console.log(state.cartItems)
    },
    setShowDeleteModal(state, payload) {
      state.isShowModalDelete = payload.value;
      state.currentSelectedCake = payload.name;
    },
    setShowNotes(state, payload) {
      state.isShowNotes = payload.value;
      state.currentSelectedCake = payload.name
    },
    setToastType(state,payload) {
      console.log(payload)
      if(!payload){
        state.toastType = 'success'
        return
      }
      state.toastType  = payload
    }
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
    setShowDeleteModal({ commit }, payload) {
      commit("setShowDeleteModal", payload);
    },
    setShowNotes({ commit }, payload) {
      commit("setShowNotes", payload);
    },
    setToastType({commit},payload) {
      
      commit('setToastType',payload)
    }
  },
  modules: {},
});
