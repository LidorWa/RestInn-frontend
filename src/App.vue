<template>
  <section class="app-container">
    <!-- Sign up / Log in compo modal nent -->
    <sign-up
      :class="{ showSignUp: isSignUp }"
      @closeSignUp="closeSignUp"
      ref="signup"
    />
    <!-- overlay  -->
    <div v-if="isSignUp" class="outsideUserMenu" @click="closeSignUp"></div>
    <app-header :headerStatus="headerStatus" :scrollY="scrollY" />
    <!-- add prop showSearch -->
    <router-view />
    <app-footer />
  </section>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
import { propsToAttrMap } from "@vue/shared";
import AppFooter from "./components/app-footer.vue";
import signUp from "./components/sign-up.vue";

export default {
  name: "app",
  components: {
    appHeader,
    appFooter,
    AppFooter,
    signUp,
  },
  data() {
    return {
      headerStatus: "top",
      scrollY: 0,
    };
  },

  created() {
    // console.log(this.$router.path);
    window.addEventListener("scroll", this.onScroll);
    this.$store.dispatch({ type: "loadStays" });
    this.$store.dispatch({ type: "loadUsers" });
  },
  computed: {
    isSignUp() {
      const isSignUpModalOpen = this.$store.getters.isSignUpModal;
      if (isSignUpModalOpen) {
        this.$refs["signup"].$refs["email"].focus();
      }
      return isSignUpModalOpen;
    },
  },

  methods: {
    closeSignUp() {
      this.$store.commit({ type: "closeSignUpModal" });
    },

    onScroll() {
      this.scrollY = window.scrollY;

      // if (this.$route.path === '/') {
      if (window.scrollY > 20) {
        // this.showSearch=false
        // if (window.scrollY > 0 && window.scrollY <= 20) {
        //   this.headerStatus = 'firstScroll'
        // } else
        this.headerStatus = "shrinkSearchBar";
      } else {
        this.headerStatus = "top";
        // }
      }
    },
  },
  unmounted() {
    window.removeEventListener("scroll");
  },
};
</script>

<style></style>
