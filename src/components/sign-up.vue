<template>
  <section class="sign-up-modal">
    <p class="sign-up-title">Log in or sign up</p>

    <h1 class="sign-up-welcome">Welcome to RestInn</h1>
    <div class="sign-up-inputs-container">
      <input class="sign-up-input" type="text" placeholder="Your email" />
      <input class="sign-up-input" type="password" placeholder="Password" />
    </div>
  </section>
</template>

<script>
export default {
  name: "header-user-menu",

  data() {
    return {};
  },

  methods: {
    signUp() {
      this.$emit("signUp");
    },
    goToAboutPage() {
      this.$router.push("/about");
    },
  },
};
</script>
