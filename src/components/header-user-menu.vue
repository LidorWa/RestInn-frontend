<template>
  <section class="header-user-menu">
    <p class="sign-up-option">Sign up</p>
    <p>Log in</p>
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
    goToAboutPage() {
      this.$router.push("/about");
    },
  },
};
</script>
