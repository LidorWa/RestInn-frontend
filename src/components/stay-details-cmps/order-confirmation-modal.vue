<template>
  <section class="order-confirmation-modal">
    <p class="confirm-title">Order confirmation</p>

    <h1 class="confirm-text">One more step!</h1>
    <div class="modal-btns-container">
      <div class="sign-up-continue" @click="reserve">Reserve</div>
      <div class="sign-up-continue" @click="closeModal">Go back</div>
    </div>
  </section>
</template>

<script>
export default {
  // props: {
  // },
  data() {
    return {};
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>
