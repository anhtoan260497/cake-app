import Vue from "vue";
import VueRouter from "vue-router";
import ProductPage from "../pages/ProductPage.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/products", component: ProductPage },
    { path: "*", redirect :'/products' },
  ],
});
