<template>
  <Header />
</template>

<script>
export default {
  name: "HeaderLayout",
  components : {
    Header : () => import('@/components/Header/Header.vue')
  }
};
</script>

<style></style>
