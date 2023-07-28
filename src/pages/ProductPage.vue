<template>
  <div>
    <CakeItem />
  </div>
</template>

<script>
export default {
  name: "ProductPage",
  components :{
    CakeItem :  () => import('@/components/CakeItem/CakeItem.vue')
  }
};
</script>

<style></style>
