<template>
  <article class="toast-message message is-success">
    <div class="message-header">
      <p>Success</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
    {{ message }}
    </div>
  </article>
</template>

<script>
export default {
  name: "ToastMessage",
  props : {
    message : {
        type : String, 
        default : ''
    }
  }
};
</script>

<style lang="scss">
@import "./Toast.scss";
</style>
