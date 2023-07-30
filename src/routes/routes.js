import Vue from "vue";
import VueRouter from "vue-router";
import ProductPage from "../pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";
import SuccessPage from "@/pages/SuccessPage.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/products", component: ProductPage },
    { path: "/cart", component: CartPage },
    { path: "/success", component: SuccessPage },
    { path: "*", redirect: "/products" },
  ],
});
