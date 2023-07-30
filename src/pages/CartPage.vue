<template>
  <div
  v-if="cartItems.length > 0"
    class="cart-container is-flex is-justify-content-space-between is-flex-wrap-wrap">
    <CartItem
      v-for="(item, idx) in cartItems"
      :key="item.name"
      :name="item.name"
      :quantity="item.quantity"
      :price="item.price"
      :no="idx + 1"
      :image="item.img"
      :discount-price="item.discountPrice"
      :original-price="item.originalPrice"
      :stock="item.stock"
       />
    <div class="clear"></div>
    <div
      class="checkout-container is-flex is-justify-content-flex-end is-align-items-flex-end is-flex-direction-column">
      <p class="total-checkout">
        Total items: <span>{{ countQuantity }}</span>
      </p>
      <p class="total-checkout">
        Total price: <span class="has-text-weight-bold">{{ totalPrice }}$</span>
      </p>
      <button class="total-checkout-btn" @click="isShowCheckoutModal = true">
        Checkout

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512">
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>
    </div>

    <div
      class="modal modal-checkout"
      :class="isShowCheckoutModal && 'is-active'">
      <div class="modal-background" @click="isShowCheckoutModal = false"></div>
      <div class="modal-content">
        <h3>Checkout Cart</h3>
        <CartItem
          v-for="(item, idx) in cartItems"
          :key="item.name"
          :name="item.name"
          :quantity="item.quantity"
          :price="item.price"
          :no="idx + 1"
          :image="item.img"
          :discount-price="item.discountPrice"
          :original-price="item.originalPrice"
          :is-checkout="true"
          :item-notes="item.notes || ''" 
          :stock="item.stock"
          />
        <div class="clear"></div>
        <div
          class="checkout-container is-flex is-justify-content-flex-end is-align-items-flex-end is-flex-direction-column">
          <p class="total-checkout">
            Total items: <span>{{ countQuantity }}</span>
          </p>
          <p class="total-checkout">
            Total price:
            <span class="has-text-weight-bold">{{ totalPrice }}$</span>
          </p>
          <button class="total-checkout-btn" @click="submitOrder">
            Proceed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512">
              <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>
      <button
        class="modal-close is-large"
        @click="isShowCheckoutModal = false"
        aria-label="close"></button>
    </div>
  </div>
  <div v-else class=" has-text-centered ">
    <img src="https://www.pngfind.com/pngs/b/272-2727925_cart-png.png" />
    <h2 class="has-text-weight-bold">Cart Empty</h2>
    <p class="message-empty">Please add cake to cart to checkout</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getImgUrl, roundNumber2Decimals } from "@/helper";
export default {
  name: "CartPage",
  data() {
    return {
      isShowCheckoutModal: false,
    };
  },
  components: {
    CartItem: () => import("@/components/CartItem/CartItem.vue"),
  },
  computed: {
    ...mapState(["cartItems"]),
    countQuantity() {
      return this.cartItems.reduce(
        (result, item) => (result += item.quantity),
        0
      );
    },
    totalPrice() {
      return this.cartItems
        .reduce((result, item) => (result += item.price), 0)
        .toFixed(2);
    },
  },
  methods: {
    getImgUrl,
    roundNumber2Decimals,
    ...mapActions(['updateCartItems']),
    submitOrder() {
      console.log(this.cartItems);
      console.log(this.$router.push("/success"));
      this.updateCartItems([]);
      // this.$route
    },
  },
  mounted () {
    console.log(this.cartItems)
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  gap: 10px;

  .clear {
    width: 100%;
    height: 2px;
    background-color: #eee;
  }

  .checkout-container {
    width: 100%;
    gap: 10px;

    .total-checkout {
      font-size: 20px;
      font-weight: 600;
      width: 200px;
      display: flex;
      gap: 10px;

      span {
        font-weight: 400;
      }
    }

    .total-checkout-btn {
      padding: 5px 30px;
      font-size: 20px;
      font-weight: 600;
      background-color: hsl(141, 71%, 48%);
      color: white;
      border: none;
      outline: none;
      display: flex;
      gap: 10px;
      align-items: center;

      svg {
        color: white;
        fill: white;
      }
    }
  }

  .modal-checkout {
    .modal-content {
      h3 {
        font-size: 26px;
        font-weight: 600;
        text-align: center;
      }
      background-color: white;
      width: 900px;
      padding: 10px;

      .cart-item {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 990px) {
    .modal-checkout {
      .modal-content {
        h3 {
          font-size: 26px;
          font-weight: 600;
          text-align: center;
        }
        background-color: white;
        width: 96%;
        padding: 10px;

        .cart-item {
          width: 100%;
        }
      }
    }
  }
}

h2 {
  font-size: 32px;
}

.message-empty {
font-size: 16px;
}
</style>
