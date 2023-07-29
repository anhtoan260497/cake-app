<template>
  <div id="app">
    <Toast v-if="isClickAddBtn" :message="toastMessage" />
    <Layout />
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  components: {
    Layout: () => import("@/layout/Layout.vue"),
    Toast: () => import("@/components/Toast/Toast.vue"),
  },
  computed: {
    ...mapState(["isClickAddBtn", "toastMessage"]),
  },
  methods: {
    ...mapActions(["handleClickAddButton"]),
  },
  watch: {
    isClickAddBtn() {
      if (this.isClickAddBtn) {
        setTimeout(() => {
          this.handleClickAddButton(false);
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  .body {
    max-width: 1200px;
    margin: auto;
  }
}

@media only screen and (max-width: 1199px) {
  #app {
    .body {
      max-width: 96%;
    }
  }
}
</style>
