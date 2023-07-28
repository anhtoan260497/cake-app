<template>
  <div id="app">
    <Layout />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components : {
    Layout : () => import('@/layout/Layout.vue')
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
