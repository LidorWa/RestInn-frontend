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
      <!--  -->
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
  },
  data() {
    return {
      IsMiniSearchShown: false,
      isShowingHamburger: false,
    }
  },
  methods: {
    toggleMiniSearch() {
      this.IsMiniSearchShown = !this.IsMiniSearchShown
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
      }
    },
    checkMiniSearch() {
      return (this.headerStatus === 'shrinkSearchBar' && !this.IsMiniSearchShown) || (this.$route.path.length > 10 && !this.IsMiniSearchShown)
    },
    checkMainSearch() {
      return (this.headerStatus !== 'shrinkSearchBar' && this.$route.path.length < 10 && (this.$route.path.includes('/') || this.$route.path.includes('/stay'))) || (this.IsMiniSearchShown && this.headerStatus === 'shrinkSearchBar')
    },
  },
  watch: {
    headerStatus() {
      console.log('headerStatus is:', this.headerStatus)
      switch (this.headerStatus) {
        case 'top':
          this.IsMiniSearchShown = false
          break
        // case 'firstScroll':
        //   break
        case 'shrinkSearchBar':
          break
      }
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
