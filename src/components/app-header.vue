<template>
  <header class="main-header-container flex flex-column align-center" :class="getHeaderClass">
    <!-- <header class="main-header-container flex flex-column align-center" :class="{ top: headerStatus === 'top', shrinkSearchBar: headerStatus === 'shrinkSearchBar', homepage: this.$route.path === '/', 'explore-page': this.$route.path === '/stay', 'details-page': this.$route.path === '/stay/:stayId' }"> -->
    <!-- <header class="main-header-container flex flex-column align-center" :class="headerStatus">
     -->
    <!-- <header :class="'main-header-container flex flex-column align-center ' + headerStatus"> -->
    <div class="logo-nav-container flex space-between">
      <div class="logo flex align-center" @click="goHome">
        <i class="fa-brands fa-airbnb"></i>
        <h1 class="logo-txt">RestInn</h1>
      </div>
      <!-- Mini search bar -->
      <div v-if="checkMiniSearch" @click="toggleMiniSearch" class="search mini-search inline-flex justify-center align-center space-between">
        <div>Start your search</div>
        <div class="search-icon">
          <img src="../assets/svgs/search.svg" alt="search Icon" />
        </div>
      </div>
      <!--  -->
      <nav class="main-header-nav flex justify-center align-center">
        <router-link to="/stay">Explore</router-link>
        <router-link to="/host">Become a host</router-link>
        <div class="hamburger-user-menu btn flex" @click="isShowingHamburger = !isShowingHamburger">
          <img class="hamburger-img" src="../assets/svgs/menu_black_24dp.svg" alt="menu-icon" />

          <img class="hamburger-avatar" src="../assets/svgs/user-avatar.svg" alt="house" />
        </div>
      </nav>
      <header-user-menu :class="{ showHamburger: isShowingHamburger }" />
    </div>
    <div v-if="checkMainSearch" class="main-search-bar flex justify-center align-center">
      <main-search />
    </div>
  </header>
</template>

<script>
import mainSearch from './main-search.vue'
import headerUserMenu from './header-user-menu.vue'
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
    }
  },
  methods: {
    toggleMiniSearch() {
      this.isMiniSearchShown = !this.isMiniSearchShown
    },
    goHome() {
      this.$router.push('/')
    },
  },
  computed: {
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
      return (this.headerStatus !== 'shrinkSearchBar' && this.$route.path.length < 10 && (this.$route.path === '/' || this.$route.path.includes('/stay'))) || (this.isMiniSearchShown && this.headerStatus === 'shrinkSearchBar')
    },
  },
  watch: {
    headerStatus() {
      console.log('headerStatus is:', this.headerStatus)
      switch (this.headerStatus) {
        case 'top':
          this.isMiniSearchShown = false
          break
        case 'shrinkSearchBar':
          break
      }
    },
    scrollY() {
      console.log('scrollY', scrollY)
      if (scrollY > 20) this.isMiniSearchShown = false
    },
  },
  components: {
    mainSearch,
    headerUserMenu,
  },
}
</script>

<style></style>
<!--  1  2 3  ,    true  false  -->
<!-- 1 2 | 3 true -->

<!-- 3 false  -->
//
