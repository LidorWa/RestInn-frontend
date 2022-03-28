<template>
  <section class="order-alert-modal">
    <p class="sign-up-title">Please note</p>

    <h1 class="sign-up-welcome">{{ alertModalMessage }}</h1>
    <div class="sign-up-continue" @click="closeModal">Close</div>
  </section>
</template>

<script>
export default {
  name: "order-alert-modal",
  props: {
    alertModalMessage: {
      type: String,
      reqired: true,
    },
  },
  data() {
    return {};
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  closeSignUp() {},
  cleanData() {},
};
</script>
