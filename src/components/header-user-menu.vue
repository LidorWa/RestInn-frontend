<template>
  <section class="header-user-menu">
    <p v-if="!isLoggerIn" class="sign-up-option" @click="signUp">Sign up</p>
    <p v-if="!isLoggerIn" @click="signUp">Log in</p>
    <p v-if="isLoggerIn" @click="logout">Log out</p>
    <hr />
    <p @click="goToExplorePage" class="user-menu-explore">Explore</p>
    <p v-if="isLoggerIn" @click="goToMyTrips">My trips</p>
    <p v-if="isLoggerIn && isHosting" @click="goToDashBoardPage">Dashboard</p>
    <p>Host your home</p>
    <p>Help</p>
    <p @click="goToAboutPage">About</p>
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
    goToMyTrips() {
      this.$emit("goToMyTrips");
    },
    goToDashBoardPage() {
      this.$emit("goToDashboard");
    },
    goToExplorePage() {
      this.$emit("goToExplore");
    },
  },
  computed: {
    isLoggerIn() {
      const user = this.$store.getters.getLoggedInUser;
      return user ? true : false;
    },
    isHosting() {
      const orders = this.$store.getters.getOrders;
      if (orders) return !!orders.length;
      return false;
    },
  },
};
</script>
