<template>
  <section class="app-container">
    <app-header :headerStatus="headerStatus" :scrollY="scrollY" />
    <!-- add prop showSearch -->
    <router-view />
    <app-footer />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
import { propsToAttrMap } from '@vue/shared'
import AppFooter from './components/app-footer.vue'
export default {
  name: 'app',
  components: {
    appHeader,
    appFooter,
    AppFooter,
  },
  data() {
    return {
      headerStatus: 'top',
      scrollY: 0,
    }
  },
  computed: {},
  created() {
    // console.log(this.$router.path);
    window.addEventListener('scroll', this.onScroll)
    this.$store.dispatch({ type: 'loadStays' })
  },

  methods: {
    onScroll() {
      this.scrollY = window.scrollY

      // if (this.$route.path === '/') {
      if (window.scrollY > 20) {
        // this.showSearch=false
        // if (window.scrollY > 0 && window.scrollY <= 20) {
        //   this.headerStatus = 'firstScroll'
        // } else
        this.headerStatus = 'shrinkSearchBar'
      } else {
        this.headerStatus = 'top'
        // }
      }
    },
  },
  unmounted() {
    window.removeEventListener('scroll')
  },
}
</script>

<style></style>
