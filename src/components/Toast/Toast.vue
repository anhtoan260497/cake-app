<template>
  <article
    class="toast-message message"
    :class="{'active-toast ': isClickAddBtn,'is-danger' : type !== 'success','is-success' : type === 'success' }">
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
import { mapState } from "vuex";
export default {
  name: "ToastMessage",
  computed : {
    ...mapState(["isClickAddBtn"])
  },
  props: {
    message: {
      type: String,
      default: "",
    },
    type : {
      type : String, 
      default : 'success'
    }
  },
mounted (){
  console.log(this.type)
}
};
</script>

<style lang="scss">
@import "./Toast.scss";
</style>
