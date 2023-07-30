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
        <button class="add-cart-btn" @click="handleClickAddBtn">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getImgUrl, roundNumber2Decimals } from "@/helper";
import { mapActions, mapState } from "vuex";
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
  computed: {
    ...mapState(["cartItems"]),
  },
  methods: {
    ...mapActions([
      "handleClickAddButton",
      "setToastMessage",
      "AddCartItem",
      "updateCartItems",
      "setToastType",
    ]),
    getImgUrl,
    roundNumber2Decimals,
    handleClickAddBtn() {
      this.handleClickAddButton(true);
      this.setToastMessage("Add To Cart");
      if (this.cartItems.length === 0) {
        this.AddCartItem({
          name: this.name,
          quantity: 1,
          price: this.discountPrice || this.originalPrice,
          img: this.img,
          discountPrice: this.discountPrice,
          originalPrice: this.originalPrice,
          stock: this.stock,
        });
        this.setToastMessage("Add To Cart");
        this.setToastType("success");
        return;
      }
      const idx = this.cartItems.findIndex((item) => item.name === this.name);
      if (idx < 0) {
        this.AddCartItem({
          name: this.name,
          quantity: 1,
          price: this.discountPrice || this.originalPrice,
          img: this.img,
          discountPrice: this.discountPrice,
          originalPrice: this.originalPrice,
          stock: this.stock,
        });
        this.setToastMessage("Add To Cart");
        this.setToastType("success");
        return;
      }
      const cloneCartItems = [...this.cartItems];
      if (cloneCartItems[idx].quantity + 1 > this.stock) {
        this.setToastType("error");
        this.setToastMessage("Out of Stock, please choose another");
        return;
      }
      this.setToastMessage("Add To Cart");
      this.setToastType("success");
      cloneCartItems[idx].quantity += 1;
      cloneCartItems[idx].price = this.discountPrice
        ? this.discountPrice * cloneCartItems[idx].quantity
        : this.originalPrice * cloneCartItems[idx].quantity;
      this.updateCartItems(cloneCartItems);
    },
  },
};
</script>

<style lang="scss">
@import "./CakeItem.scss";
</style>
