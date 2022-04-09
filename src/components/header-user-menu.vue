<template>
  <section class="header-user-menu">
    <p v-if="!isLoggedIn" class="sign-up-option" @click="signUp(true)">
      Sign up
    </p>
    <p v-if="!isLoggedIn" @click="signUp(false)">Log in</p>
    <p v-if="isLoggedIn" @click="logout">Log out</p>
    <hr />
    <p @click="goToExplorePage" class="user-menu-explore">Explore</p>
    <p v-if="isLoggedIn" @click="goToMyTrips">My Trips</p>
    <p v-if="isLoggedIn" @click="goToDashBoardPage">Dashboard</p>
    <p v-if="!isHosting">Host your home</p>
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
    signUp(isNew) {
      this.$emit("openSignUp", isNew);
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
    isLoggedIn() {
      const user = this.$store.getters.getLoggedInUser;
      return user ? true : false;
    },
    isHosting() {
      const orders = this.$store.getters.getHostOrders;
      if (orders) return !!orders.length;
      return false;
    },
  },
};
</script>
