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
    <div class="main-app-layout-container flex flex-column app-container">
      <app-header :headerStatus="headerStatus" :scrollY="scrollY" />
      <!-- add prop showSearch -->
      <!-- <router-view /> -->
      <router-view class="main-layout-height" />
      <app-footer />
    </div>
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

  async created() {
    window.addEventListener("scroll", this.onScroll);

    const filterBy = {
      price: [1, 4000],
      type: [],
      city: "",
      amenities: [],
      guests: 0,
    };
    await this.$store.dispatch({ type: "loadOrders", filterBy: {} });

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

    onScroll() {
      this.scrollY = window.scrollY;

      // if (this.$route.path === '/') {
      if (window.scrollY > 20) {
        // this.showSearch=false
        // if (window.scrollY > 0 && window.scrollY <= 20) {
        //   this.headerStatus = 'firstScroll'
        // } else
        this.headerStatus = "shrinkSearchBar";
        // console.log('App headerStatus', this.headerStatus)
      } else {
        this.headerStatus = "top";
        // console.log('App headerStatus', this.headerStatus)
        // }
      }
    },
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style></style>
