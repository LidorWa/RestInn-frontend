<template>
  <section class="main-header-section">
    <div class="header-container">
      <!-- <header class="main-header-container flex flex-column align-center" :class="getHeaderClass"> -->
      <header class="main-header-container flex flex-column align-center" :class="headerClasses">
        <!-- <header class="main-header-container flex flex-column align-center" :class="{ top: headerStatus === 'top', shrinkSearchBar: headerStatus === 'shrinkSearchBar', homepage: this.$route.path === '/', 'explore-page': this.$route.path === '/stay', 'details-page': this.$route.path === '/stay/:stayId' }"> -->
        <!-- <header class="main-header-container flex flex-column align-center" :class="headerStatus">-->
        <!-- <header :class="'main-header-container flex flex-column align-center ' + headerStatus"> -->
        <div class="logo-nav-container flex space-between">
          <div class="logo flex align-center" @click="goHome">
            <i class="fa-brands fa-airbnb"></i>
            <h1 class="logo-txt">RestInn</h1>
          </div>
          <!-- Mini search bar -->
          <div v-if="!isFullSearch" @click="toggleMiniSearch" class="search mini-search inline-flex justify-center align-center space-between">
            <div>{{ getSearchText }}</div>
            <div class="search-icon-small">
              <img src="../assets/svgs/search.svg" alt="search Icon" />
            </div>
          </div>

          <!-- nav -->
          <nav class="main-header-nav flex align-center" :style="logoStyle">
            <router-link to="/stay">Explore</router-link>
            <router-link to="/host">Become a host</router-link>
            <!-- TODO: try change svg color -->
            <!-- <div class="language flex align-center justify-center">
          <img src="../assets/svgs/en.svg" alt="language change icon" />
            </div>-->

            <!-- hamburger -->
            <div class="hamburger-user-menu btn flex space-between" @click="isShowingHamburger = true">
              <img class="hamburger-img" src="../assets/svgs/menu_black_24dp.svg" alt="menu-icon" />

              <img class="hamburger-avatar" src="../assets/svgs/user-avatar.svg" alt="user avatar" />
            </div>
          </nav>
          <header-user-menu :class="{ showHamburger: isShowingHamburger }" @openSignUp="openSignUp" @logout="logout" />
          <div v-if="isShowingHamburger" class="outsideUserMenu" @click="isShowingHamburger = false"></div>
        </div>
        <div v-if="isFullSearch" class="main-search-bar flex justify-center align-center">
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
        ></div>-->
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
    // scrollY: {
    //   type: Number,
    // },
  },
  data() {
    return {
      isFullSearch: true,
      isShowingHamburger: false,
      isSignUp: false,
      scrollLoc: 0,
    }
  },
  created() {
    // console.log('created header - headerStatus', this.headerStatus)
    // console.log('$route.query', this.$route)
    document.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    updateScroll() {
      if (this.$route.params.stayId) {
        this.isFullSearch = false
        this.scrollLoc = window.scrollY
        return
      }
      this.scrollLoc = window.scrollY
      this.isFullSearch = scrollY <= 20 ? true : false
    },
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.isShowingHamburger = false
    },
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
      this.isFullSearch = !this.isFullSearch
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
    // getHeaderClass() {
    //   return {
    //     top: this.headerStatus === 'top',
    //     shrinkSearchBar: this.headerStatus === 'shrinkSearchBar',
    //     homepage: this.$route.path === '/',
    //     'explore-page': this.$route.path === '/stay',
    //     'details-page': this.$route.path.length > 10,
    //     'main-search-open': this.isMiniSearchShown && this.scrollY > 20,
    //   }
    //   obj = {
    //     layout: 'main-layout',
    //     isClose: 'close',
    //   }
    //   return Object.values()
    // },
    // checkMiniSearch() {
    //   return (this.headerStatus === 'shrinkSearchBar' && !this.isMiniSearchShown) || (this.$route.path.length > 10 && !this.isMiniSearchShown)
    // },
    // checkMainSearch() {
    //   return (this.headerStatus === 'top' && this.$route.path.length < 10 && (this.$route.path === '/' || this.$route.path.includes('/stay'))) || (this.isMiniSearchShown && (this.headerStatus === 'shrinkSearchBar' || this.$route.path.length > 10))
    // },
    logoStyle() {
      var color
      if (this.$route.path === '/stay') {
        color = '#222222'
        console.log('#222222')
      } else {
        console.log('#FFFFFF')
        color = '#FFFFFF'
      }
      return { color: color }
    },
    headerClasses() {
      var classObj = {}
      if (this.$route.params.stayId) {
        classObj.layout = 'main-layout'
        classObj.headerStyle = 'small-search'
      } else {
        classObj.layout = 'home-layout'
        if (this.scrollLoc > 20) {
          classObj.headerStyle = 'small-search'
        } else {
          classObj.headerStyle = 'full-search'
        }
      }
      if (this.isFullSearch) classObj.headerStyle = 'full-search'
      // console.log('obj', this.isFullSearch)
      return Object.values(classObj)
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
    // headerStatus() {
    //   console.log('Watch ****************** headerStatus is:', this.headerStatus)
    //   switch (this.headerStatus) {
    //     case 'top':
    //       this.isMiniSearchShown = false
    //       break
    //     case 'shrinkSearchBar':
    //       //??????
    //       this.isMiniSearchShown = true
    //       break
    //   }
    // },
    '$route.params.stayId': {
      handler(newVal) {
        this.isFullSearch = newVal ? false : true
      },
      immediate: true,
    },
    $route: {
      handler(newVal) {
        console.log(newVal)
      },
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
<!-- function computed() {
            var classObj = {}
            if (this.$route.params.stayId) {
                obj.layout = 'main-layout'
                obj.headerStyle = 'small-search'
            }
            else {
                obj.layout = 'home-layout'
                if (window.scrollY > 20) {
                    obj.headerStyle = 'small-search'
                }
            }
            if (isOpen) obj.headerStyle = 'full-search'
            return Object.values(obj)
        } -->
