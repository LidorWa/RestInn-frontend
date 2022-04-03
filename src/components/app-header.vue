<template>
  <section class="main-header-section">
    <header
      class="main-header-container flex flex-column align-center"
      :class="{ [headerClass]: true, [layout]: true }"
    >
      <div class="logo-nav-container flex space-between">
        <div class="logo flex align-center" @click="goHome">
          <i class="fa-brands fa-airbnb"></i>
          <h1 class="logo-txt">RestInn</h1>
        </div>

        <!-- Mini search bar -->
        <div
          v-show="!showMainSearch && isSearch"
          @click="toggleShowMainSearch"
          class="mini-search inline-flex justify-center align-center space-between"
        >
          <div>{{ getSearchText }}</div>
          <div class="search-icon-small">
            <img src="../assets/svgs/search.svg" alt="search Icon" />
          </div>
        </div>

        <!-- nav -->
        <nav class="main-header-nav flex align-center">
          <router-link to="/stay">Explore</router-link>
          <router-link to="/host" class="be-host-nav"
            >Become a host</router-link
          >

          <!-- hamburger -->
          <div
            class="hamburger-user-menu btn flex space-between"
            @click="isShowingHamburger = true"
          >
            <img
              class="hamburger-img"
              src="../assets/svgs/menu_black_24dp.svg"
              alt="menu-icon"
            />
            <img
              v-if="!isLoggedIn"
              class="hamburger-avatar"
              src="@/assets/svgs/user-avatar.svg"
              alt="user avatar"
            />
            <img
              v-else
              class="hamburger-avatar user-avater-image"
              src="https://thispersondoesnotexist.com/image"
              alt="user avatar"
            />
          </div>
          <header-user-menu
            :class="{ showHamburger: isShowingHamburger }"
            @goToDashboard="goToDashboard"
            @goToMyTrips="goToMyTrips"
            @openSignUp="openSignUp"
            @logout="logout"
            @goToExplore="goToExplore"
          />
        </nav>
        <div
          v-if="isShowingHamburger"
          class="outsideUserMenu"
          @click="isShowingHamburger = false"
        ></div>
      </div>
      <!-- main search -->
      <div
        v-show="showMainSearch && isSearch"
        class="main-search-bar flex justify-center align-center"
      >
        <main-search
          @mainSearchClosed="mainSearchClosed"
          :savedLocation="getLocation"
          :savedDates="getDates"
          :savedGuests="getGuests"
        />
      </div>
    </header>
  </section>
</template>

<script>
import mainSearch from "./main-search.vue";
import headerUserMenu from "./header-user-menu.vue";
import signUp from "../components/sign-up.vue";
export default {
  name: "app-header",
  props: {
    headerStatus: {
      type: String,
      default: "top",
    },
  },
  data() {
    return {
      isShowingHamburger: false,
      isSignUp: false,
      scrollLoc: 0,
      scrollStatus: "up", // up / down
      isFullSearch: true,
      showMainSearch: true, // true / false
      headerClass: "",
      isSearch: true, // true home and explore || false in any other page
      layout: "main-layout-homepage",
    };
  },
  created() {
    document.addEventListener("scroll", this.updateScroll);
  },

  methods: {
    goToMyTrips() {
      this.isShowingHamburger = false;
      this.$router.push("/mytrips");
    },
    goToDashboard() {
      this.isShowingHamburger = false;
      this.$router.push("/dashboard");
    },
    goToExplore() {
      this.isShowingHamburger = false;
      this.$router.push("/stay");
    },
    updateScroll() {
      if (window.scrollY <= 20) {
        this.scrollStatus = "up";
      } else {
        this.scrollStatus = "down";
      }
      this.setHeaderClass();
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.isShowingHamburger = false;
      this.$router.push("/");
    },
    openSignUp() {
      this.$store.commit({ type: "openSignUpModal" });
      this.isShowingHamburger = false;
    },
    mainSearchClosed(location, dates, guests) {
      this.$store.commit({ type: "setLocation", location });
      this.$store.commit({ type: "setDates", dates });
      this.$store.commit({ type: "setGuests", guests });
    },
    toggleShowMainSearch() {
      this.showMainSearch = !this.showMainSearch;
    },
    goHome() {
      this.$router.push("/");
    },
    setHeaderClass() {
      if (this.$route.path === '/') {
        this.layout = 'main-layout-homepage'
        this.isSearch = true
        if (this.scrollStatus === 'up') {
          this.showMainSearch = true
          this.headerClass = 'full-search-home'
        } else {
          // scrollStatus down
          this.showMainSearch = false;
          this.headerClass = "small-search";
        }
      } else if (this.$route.params.stayId) {
        this.layout = "main-layout";
        this.isSearch = true;
        this.showMainSearch = false;
        this.headerClass = "small-search";
      } else if (this.$route.path === "/stay") {
        this.layout = "main-layout-homepage";
        this.isSearch = true;
        this.showMainSearch = false;
        this.headerClass = "small-search";
      } else if (this.$route.path === "/dashboard") {
        this.layout = "main-layout-homepage";
        this.isSearch = false;
        this.headerClass = "on-dashboard";
        this.showMainSearch = false;
      } else {
        this.layout = "main-layout-homepage";
        this.isSearch = false;
        this.headerClass = "small-search";
      }
    },
  },
  computed: {
    isLoggedIn() {
      const user = this.$store.getters.getLoggedInUser;
      return !!user;
    },
    // getLoggedInUserImage() {
    //   const user = this.$store.getters.getLoggedInUser;
    //   if (user) {
    //     const imgUrl = new URL(`../assets/images/${user.imgUrl}`, import.meta.url)
    //     return imgUrl
    //   }
    // },
    homepageClass() {
      let classesStr = "";
      if (this.scrollLoc > 20) classesStr += "scrolled ";
      if (this.$route.path === "/") classesStr += "homepage";
      return classesStr;
    },
    getSearchText() {
      if (this.$route.query.destination) return this.$route.query.destination;
      return "Start your search";
    },
    getDates() {
      return this.$store.getters.getDates;
    },
    getGuests() {
      return this.$store.getters.getGuests;
    },
    getLocation() {
      if (this.$route.query.destination) return this.$route.query.destination;
      return "";
    },
  },
  watch: {
    $route() {
      this.updateScroll();
    },
  },
  components: {
    mainSearch,
    headerUserMenu,
    signUp,
  },
};
</script>

<style></style>
