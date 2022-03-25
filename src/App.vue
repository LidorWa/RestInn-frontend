<template>
  <section class="app-container">
    <app-header :headerStatus="headerStatus" />
    <!-- add prop showSearch -->
    <router-view />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
import { propsToAttrMap } from '@vue/shared'
export default {
  name: 'app',
  components: {
    appHeader,
    appFooter,
  },
  data() {
    return {
      headerStatus: 'top',
    }
  },
  computed: {},
  created() {
    console.log(this.$router.path)
    // this.$store.dispatch({ type: 'loadStays' })
    window.addEventListener('scroll', this.onScroll)
    this.$store.dispatch({ type: 'loadStays' })
  },

  methods: {
    onScroll() {
      //TODO:
      // if (this.$router.path === '/') {
      if (window.scrollY > 20) {
        // this.showSearch=false
        // console.log(window.scrollY)
        // if (window.scrollY > 0 && window.scrollY <= 20) {
        //   this.headerStatus = 'firstScroll'
        // } else
        //TODO: add 'or' params in details.
        this.headerStatus = 'shrinkSearchBar'
      } else {
        this.headerStatus = 'top'
        // }
      }
    },
  },
  unmounted() {
    //TODO:
    //   window.removeEventListener(scrollY)
  },
}
</script>

<style></style>
