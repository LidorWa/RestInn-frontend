<template>
  <header :class="'main-header-container flex flex-columns ' + headerStatus">
    <div class="logo-nav-container flex space-between">
      <div class="logo flex align-center" @click="goHome">
        <i class="fa-brands fa-airbnb"></i>
        <h1 class="logo-txt">RestInn</h1>
      </div>
      <div v-if="headerStatus === 'shrinkSearchBar' && !showSearch" @click="toggleShowSearch" class="search">
        <button class="btn">
          Start your search
          <div class="search-btn">
            <img src="../assets/svgs/search.svg" alt="search Icon" />
          </div>
        </button>
      </div>
      <nav class="main-header-nav">
        <router-link to="/stay">Explore</router-link> |
        <router-link to="/about">About</router-link>
        <div class="hamburger-user-menu btn flex">
          <img src="../assets/svgs/menu_black_24dp.svg" alt="menu-icon" />
          <img src="../assets/system-imgs/user_pic-50x50.png" alt="house" />
        </div>
      </nav>
    </div>
    <div v-if="(showSearch && headerStatus === 'shrinkSearchBar') || headerStatus !== 'shrinkSearchBar'" class="main-search-bar">
      <main-search />
    </div>
  </header>
</template>

<script>
import mainSearch from './main-search.vue'
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
    }
  },
  components: {
    mainSearch,
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
