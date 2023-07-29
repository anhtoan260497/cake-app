<template>
  <div id="app">
    <Layout />
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Layout: () => import("@/layout/Layout.vue"),
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
