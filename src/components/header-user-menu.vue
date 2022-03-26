<template>
  <section class="header-user-menu">
    <p class="sign-up-option" @click="signUp">Sign up</p>
    <p @click="signUp">Log in</p>
    <hr />
    <p>Host your home</p>
    <p>Help</p>
    <p @click="goToAboutPage">About</p>
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
