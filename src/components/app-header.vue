<template>
  <header :class="'main-header-container flex flex-columns align-center' + headerStatus">
    <div class="logo-nav-container flex space-between">
      <div class="logo flex align-center" @click="goHome">
        <i class="fa-brands fa-airbnb"></i>
        <h1 class="logo-txt">RestInn</h1>
      </div>
      <!--  -->
      <div v-if="headerStatus === 'shrinkSearchBar' && !showSearch" @click="toggleShowSearch" class="mini-search-btn inline-flex search">
        <button>
          Start your search
          <div class="search-icon">
            <img src="../assets/svgs/search.svg" alt="search Icon" />
          </div>
        </button>
      </div>
      <!--  -->
      <nav class="main-header-nav">
        <router-link to="/stay">Explore</router-link> |
        <router-link to="/about">About</router-link>
        <div class="hamburger-user-menu btn flex" @click="isShowingHamburger = !isShowingHamburger">
          <img class="hamburger-img" src="../assets/svgs/menu_black_24dp.svg" alt="menu-icon" />
          <img class="hamburger-avatar" src="../assets/system-imgs/user_pic-50x50.png" alt="house" />
        </div>
      </nav>
      <header-user-menu :class="{ showHamburger: isShowingHamburger }" />
    </div>
    <div v-if="(showSearch && headerStatus === 'shrinkSearchBar') || headerStatus !== 'shrinkSearchBar'" class="main-search-bar">
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
      showSearch: false,
      isShowingHamburger: false,
    }
  },
  components: {
    mainSearch,
    headerUserMenu,
  },
  methods: {
    toggleShowSearch() {
      this.showSearch = !this.showSearch
    },
    goHome() {
      this.$router.push('/')
    },
  },
  watch: {
    headerStatus() {
      console.log('headerStatus is:', this.headerStatus)
      switch (this.headerStatus) {
        case 'top':
          this.showSearch = false
          break
        case 'firstScroll':
          break
        case 'shrinkSearchBar':
          break
      }
    },
  },
}
</script>

<style></style>
<!--  1  2 3  ,    true  false  -->
<!-- 1 2 | 3 true -->

<!-- 3 false  -->
//
