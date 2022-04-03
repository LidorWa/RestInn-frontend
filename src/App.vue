<template>
  <section class="app-container">
    <sign-up
      :class="{ showSignUp: isSignUp }"
      @closeSignUp="closeSignUp"
      ref="signup"
    />
    <!-- overlay  -->
    <div v-if="isSignUp" class="outsideUserMenu" @click="closeSignUp"></div>
    <div class="main-app-container flex flex-column app-container">
      <app-header />
      <router-view class="main-layout-height" />
      <app-footer />
    </div>
  </section>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
// import { propsToAttrMap } from "@vue/shared";
import AppFooter from "./components/app-footer.vue";
import signUp from "./components/sign-up.vue";

export default {
  name: "app",
  components: {
    appHeader,
    appFooter,
    AppFooter,
    signUp,
    // propsToAttrMap
  },
  data() {
    return {
      headerStatus: "top",
      scrollY: 0,
    };
  },

  async created() {
    const filterBy = {
      price: [1, 4000],
      type: [],
      city: "",
      amenities: [],
      guests: 0,
    };
    this.$store.dispatch({ type: "getUserFromSession" });
    const user = this.$store.getters.getLoggedInUser;

    if (user) {
      const filterBy = {
        hostId: user._id,
      };
      try {
        await this.$store.dispatch({ type: "loadOrders", filterBy });
      } catch (err) {
        console.log("Error while loading orders: ", err);
      }
    }

    await this.$store.dispatch({ type: "loadStays", filterBy });
  },
  computed: {
    isSignUp() {
      const isSignUpModalOpen = this.$store.getters.isSignUpModal;
      if (isSignUpModalOpen) {
        this.$refs["signup"].$refs["username"].focus();
      }
      return isSignUpModalOpen;
    },
  },

  methods: {
    closeSignUp() {
      this.$store.commit({ type: "closeSignUpModal" });
    },
  },
};
</script>

<style></style>
