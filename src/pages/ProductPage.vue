<template>
  <div class="cake-list-container is-flex is-flex-wrap-wrap">
    <CakeItem
      v-for="item in cakeJSON"
      :key="item.name"
      :name="item.name"
      :desc="item.description"
      :img="item.image_url"
      :is-on-discount="item.is_on_discount"
      :stock="item.stock_count"
      :original-price="item.original_price"
      :discount-price="item.discounted_price"
      />
  </div>
</template>

<script>
import productJSON from "../json/products.json";

export default {
  name: "ProductPage",
  data() {
    return {
      cakeJSON: productJSON,
    };
  },
  components: {
    CakeItem: () => import("@/components/CakeItem/CakeItem.vue"),
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.cake-list-container {
  gap :10px;
}

@media only screen and (max-width : 768px) {
  .cake-list-container {
    gap : 20px
  }
}

</style>
