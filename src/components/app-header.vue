<template>
  <section class="main-header-section">
    <div class="header-container flex">
      <header class="main-header-container flex flex-column align-center" :class="getHeaderClass">
        <!-- <header class="main-header-container flex flex-column align-center" :class="{ top: headerStatus === 'top', shrinkSearchBar: headerStatus === 'shrinkSearchBar', homepage: this.$route.path === '/', 'explore-page': this.$route.path === '/stay', 'details-page': this.$route.path === '/stay/:stayId' }"> -->
        <!-- <header class="main-header-container flex flex-column align-center" :class="headerStatus">-->
        <!-- <header :class="'main-header-container flex flex-column align-center ' + headerStatus"> -->
        <div class="logo-nav-container flex space-between">
          <div class="logo flex align-center" @click="goHome">
            <i class="fa-brands fa-airbnb"></i>
            <h1 class="logo-txt">RestInn</h1>
          </div>
          <!-- Mini search bar -->
          <div v-if="checkMiniSearch" @click="toggleMiniSearch" class="search mini-search inline-flex justify-center align-center space-between">
            <div>{{ getSearchText }}</div>
            <div class="search-icon-small">
              <img src="../assets/svgs/search.svg" alt="search Icon" />
            </div>
          </div>

          <!-- nav -->
          <nav class="main-header-nav flex align-center">
            <router-link to="/stay">Explore</router-link>
            <router-link to="/host">Become a host</router-link>
            <!-- TODO: try change svg color -->
            <!-- <div class="language flex align-center justify-center">
          <img src="../assets/svgs/en.svg" alt="language change icon" />
        </div> -->

            <!-- hamburger -->
            <div class="hamburger-user-menu btn flex space-between" @click="isShowingHamburger = true">
              <img class="hamburger-img" src="../assets/svgs/menu_black_24dp.svg" alt="menu-icon" />

              <img class="hamburger-avatar" src="../assets/svgs/user-avatar.svg" alt="user avatar" />
            </div>
          </nav>
          <header-user-menu :class="{ showHamburger: isShowingHamburger }" @openSignUp="openSignUp" @logout="logout" />
          <div v-if="isShowingHamburger" class="outsideUserMenu" @click="isShowingHamburger = false"></div>
        </div>
        <div v-if="checkMainSearch" class="main-search-bar flex justify-center align-center">
          <main-search @mainSearchClosed="mainSearchClosed" :savedLocation="getLocation" :savedDates="getDates" :savedGuests="getGuests" />
        </div>
        <!-- <sign-up
        :class="{ showSignUp: isSignUp }"
        @closeSignUp="closeSignUp"
        ref="signup"
      />
      <div
        v-if="isSignUp"
        class="outsideUserMenu"
        @click="isSignUp = false"
      ></div> -->
      </header>
    </div>
  </section>
</template>

<script>
import mainSearch from './main-search.vue'
import headerUserMenu from './header-user-menu.vue'
import signUp from '../components/sign-up.vue'
export default {
  name: 'app-header',
  props: {
    headerStatus: {
      type: String,
      default: 'top',
    },
    scrollY: {
      type: Number,
    },
  },
  data() {
    return {
      isMiniSearchShown: false,
      isShowingHamburger: false,
      isSignUp: false,
    }
  },
  created() {
    console.log('created header - headerStatus', this.headerStatus)
    console.log('$route.query', this.$route)
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.isShowingHamburger = false
    },
    // closeSignUp() {
    //   this.isSignUp = false;
    // },
    // openSignUp() {
    //   this.isSignUp = true;
    //   this.isShowingHamburger = false;
    //   this.$refs["signup"].$refs["email"].focus();
    // },
    openSignUp() {
      this.$store.commit({ type: 'openSignUpModal' })
      this.isShowingHamburger = false
    },
    mainSearchClosed(location, dates, guests) {
      this.$store.commit({ type: 'setLocation', location })
      this.$store.commit({ type: 'setDates', dates })
      this.$store.commit({ type: 'setGuests', guests })
      // this.location = location;
      // this.dates = dates;
      // this.guests = guests;
    },
    toggleMiniSearch() {
      this.isMiniSearchShown = !this.isMiniSearchShown
    },
    goHome() {
      this.$router.push('/')
    },
  },
  computed: {
    getSearchText() {
      if (this.$route.query.destination) return this.$route.query.destination
      return 'Start your search'
    },

    getDates() {
      return this.$store.getters.getDates
    },
    getGuests() {
      return this.$store.getters.getGuests
    },
    getLocation() {
      if (this.$route.query.destination) return this.$route.query.destination
      return ''
    },
    getHeaderClass() {
      return {
        top: this.headerStatus === 'top',
        shrinkSearchBar: this.headerStatus === 'shrinkSearchBar',
        homepage: this.$route.path === '/',
        'explore-page': this.$route.path === '/stay',
        'details-page': this.$route.path.length > 10,
        'main-search-open': this.isMiniSearchShown && this.scrollY > 20,
      }
    },
    checkMiniSearch() {
      return (this.headerStatus === 'shrinkSearchBar' && !this.isMiniSearchShown) || (this.$route.path.length > 10 && !this.isMiniSearchShown)
    },
    checkMainSearch() {
      return (this.headerStatus === 'top' && this.$route.path.length < 10 && (this.$route.path === '/' || this.$route.path.includes('/stay'))) || (this.isMiniSearchShown && (this.headerStatus === 'shrinkSearchBar' || this.$route.path.length > 10))
    },
    //TODO: maybe something like this?
    setCurrPage() {
      let { destination } = this.$route.query
      let { stayId } = this.$route.params
      if (destination) {
        this.currPage = 'explore'
      } else if (stayId) {
        this.currPage = 'details'
      } else this.currPage = 'home'
    },
  },
  //TODO: watch stopped working?
  watch: {
    headerStatus() {
      console.log('Watch ****************** headerStatus is:', this.headerStatus)
      switch (this.headerStatus) {
        case 'top':
          this.isMiniSearchShown = false
          break
        case 'shrinkSearchBar':
          //??????
          this.isMiniSearchShown = true
          break
      }
    },
    scrollY() {
      if (scrollY > 20) this.isMiniSearchShown = false
      console.log('isMiniSearchShown', this.isMiniSearchShown)
    },
  },
  components: {
    mainSearch,
    headerUserMenu,
    signUp,
  },
}
</script>

<style></style>
<!--  1  2 3  ,    true  false  -->

<!-- 1 2 | 3 true -->

<!-- 3 false  -->
