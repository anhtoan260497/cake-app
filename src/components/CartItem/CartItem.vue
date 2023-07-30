<template>
  <div class="cart-item">
    <img class="cart-item-image" :src="getImgUrl(image)" />
    <div class="infomation">
      <p class="cart-item-name">{{ name }}</p>
      <div class="cart-info-price">
        <p class="cart-info-price-discount">
          {{ discountPrice || originalPrice }}$
        </p>
        <p v-if="discountPrice" class="cart-info-price-original">
          {{ originalPrice }}$
        </p>
      </div>
      <button
        v-if="!isCheckout"
        class="add-notes"
        @click="setShowNotes({ name, value: true })">
        Add Notes
      </button>
      <div class="item-notes" v-if="itemNotes && isCheckout">
        <span>Notes:</span>
        <p>{{ itemNotes }}</p>
      </div>
      <div
        class="note-container"
        v-if="
          (!isCheckout && isShowNotes && name === currentSelectedCake) || notes
        ">
        <textarea
          v-model="notes"
          placeholder="note maximum 25 letters"
          maxlength="25"
          @focusout="setShowNotes({ value: false, name: '' })" />
        <svg
          title="close"
          @click="handleClickClose"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512">
          <path
            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </div>
      <div class="cart-info-quantity">
        <button
          v-if="!isCheckout"
          class="quantity-btn"
          @click="updateQuantity('add')">
          +
        </button>
        <p
          class="quantity-btn quantity"
          :class="isCheckout && 'quantity-checkout'">
          {{ quantity }} {{ isCheckout ? "x" : "" }}
          {{ isCheckout ? discountPrice || originalPrice : "" }}
          {{ isCheckout ? "=" : "" }}
          {{
            isCheckout
              ? discountPrice
                ?  roundNumber2Decimals(quantity * discountPrice)
                : roundNumber2Decimals(quantity * originalPrice)
              : ""
          }}{{ isCheckout ? "$" : "" }}
        </p>
        <button
          v-if="!isCheckout"
          class="quantity-btn"
          @click="updateQuantity('minus')">
          -
        </button>
        <button
          v-if="!isCheckout"
          class="quantity-btn"
          @click="setShowDeleteModal({ name, value: true })">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512">
            <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
    </div>
    <div
      class="modal"
      :class="isShowModalDelete && name === currentSelectedCake && 'is-active'">
      <div
        class="modal-background"
        @click="setShowDeleteModal({ name: '', value: false })"></div>
      <div class="modal-content">
        <p>
          Delete <span class="has-text-weight-semibold">{{ name }}</span> from
          Cart ?
        </p>
        <div class="modal-button-container is-flex is-justify-content-center">
          <button @click="deleteItem">Yes</button>
          <button @click="setShowDeleteModal({ name: '', value: false })">
            No
          </button>
        </div>
      </div>
      <button
        class="modal-close is-large"
        @click="setShowDeleteModal({ name: '', value: false })"
        aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import { getImgUrl, roundNumber2Decimals } from "@/helper";
import { mapActions, mapState } from "vuex";
export default {
  name: "CartItem",
  data() {
    return {
      notes: "",
      notesTimeout: "",
    };
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    no: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    itemNotes: {
      type: String,
      default: "",
    },
    stock: {
      type : Number,
      default : 0
    }
  },
  computed: {
    ...mapState([
      "cartItems",
      "isShowModalDelete",
      "currentSelectedCake",
      "isShowNotes",
    ]),
  },
  methods: {
    ...mapActions([
      "handleClickAddButton",
      "setToastMessage",
      "AddCartItem",
      "updateCartItems",
      "setShowDeleteModal",
      "setShowNotes",
      "setToastType"
    ]),
    getImgUrl,
    roundNumber2Decimals,
    updateQuantity(type) {
      this.handleClickAddButton(true);
      const idx = this.cartItems.findIndex((item) => item.name === this.name);
      const cloneCartItems = [...this.cartItems];
      console.log(this.stock)
      if (type === "add") {
        if(cloneCartItems[idx].quantity + 1 > this.stock) {
        this.setToastType('error')
        this.setToastMessage("Out of Stock, please choose another");
        return
      }
      this.setToastMessage("Add To Cart");
      this.setToastType('success')
        cloneCartItems[idx].quantity += 1;
        this.setToastMessage("Add To Cart");
      }
      if (type === "minus") {
        cloneCartItems[idx].quantity -= 1;
        this.setToastMessage("Remove 1 cake");
        this.setToastType('success')
      }
      cloneCartItems[idx].price = this.discountPrice
        ? this.discountPrice * cloneCartItems[idx].quantity
        : this.originalPrice * cloneCartItems[idx].quantity;
      this.updateCartItems(cloneCartItems);
    },
    deleteItem() {
      this.handleClickAddButton(true);
      this.setToastMessage("Delete Cake");
      const idx = this.cartItems.findIndex((item) => item.name === this.name);
      const cloneCartItems = [...this.cartItems];
      cloneCartItems.splice(idx, 1);
      this.updateCartItems(cloneCartItems);
      this.setShowDeleteModal(false);
    },
    handleClickClose() {
      this.setShowNotes({ value: false, name: "" });
      this.notes = "";
    },
  },
  watch: {
    notes() {
      if (this.notesTimeout) clearTimeout(this.notesTimeout);
      this.notesTimeout = setTimeout(() => {
        const idx = this.cartItems.findIndex((item) => item.name === this.name);
        const cloneCartItems = [...this.cartItems];
        cloneCartItems[idx].notes = this.notes;
        this.updateCartItems(cloneCartItems);
      }, 500);
    },
  },
};
</script>

<style lang="scss">
@import "./CartItem.scss";
</style>
