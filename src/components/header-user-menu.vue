<template>
  <section class="header-user-menu">
    <p v-if="!isLoggerIn" class="sign-up-option" @click="signUp">Sign up</p>
    <p v-if="!isLoggerIn" @click="signUp">Log in</p>
    <p v-if="isLoggerIn" @click="logout">Log out</p>
    <hr />
    <p>Host your home</p>
    <p>Help</p>
    <p @click="goToAboutPage">About</p>
    <p @click="goToDashBoardPage">Host Dashboard</p>
  </section>
</template>

<script>
export default {
  name: "header-user-menu",

  data() {
    return {
      user: null,
    };
  },

  methods: {
    logout() {
      this.$emit("logout");
    },
    signUp() {
      this.$emit("openSignUp");
    },
    goToAboutPage() {
      this.$router.push("/about");
    },
    goToDashBoardPage() {
      this.$emit("goToDashboard");
    },
  },
  computed: {
    isLoggerIn() {
      const user = this.$store.getters.getLoggedInUser;
      return user ? true : false;
    },
  },
};
</script>
