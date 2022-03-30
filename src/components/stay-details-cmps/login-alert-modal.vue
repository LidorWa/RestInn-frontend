<template>
  <section class="login-alert-modal">
    <span class="material-icons close-sign-up" @click="closeModal">
      close
    </span>
    <p class="sign-up-title">Please note</p>

    <h1 class="sign-up-welcome">Log in to proceed</h1>
    <div class="modal-btns-container">
      <div class="sign-up-continue" @click="login">Log in</div>
      <div class="sign-up-continue" @click="demo">Guest user</div>
    </div>
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
    login() {
      this.$emit("login");
    },
    async demo() {
      const user = {
        username: "demo@gmail.com",
        password: "demo",
      };
      await this.$store.dispatch({ type: "login", user });
      this.$emit("demo");
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  closeSignUp() {},
  cleanData() {},
};
</script>
