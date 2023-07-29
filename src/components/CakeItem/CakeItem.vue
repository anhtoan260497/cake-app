<template>
  <div class="cake-item">
    <img class="image" :src="getImgUrl(img)" alt="chuoi" />
    <div class="cake-item-info">
      <p class="cake-item-name">{{ name }}</p>
      <p
        class="cake-item-description"
        title=" Decadent chocolate fudge cake with a rich, moist texture.">
        {{ desc }}
      </p>
      <div class="is-flex is-justify-content-space-between">
        <div class="cake-item-price is-flex is-align-items-flex-end">
          <p class="cake-item-discount-price">
            {{ discountPrice || originalPrice }}$
          </p>
          <p v-if="discountPrice" class="cake-item-real-price">
            {{ originalPrice }}$
          </p>
        </div>
        <button class="add-cart-btn">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from "@/helper/index";
export default {
  name: "CakeItem",
  props: {
    name: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    isOnDiscount: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss">
@import "./CakeItem.scss";
</style>
