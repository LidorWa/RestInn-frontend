<template>
  <section>
    <form @submit.prevent="" class="main-search-container flex justify-center align-center btn">
      <div class="input-container location-input-container">
        <label for="location-input" class="location-input">Location</label>
        <input type="text" id="location-input" name="location-input" placeholder="Where are you going?" autocomplete="off" spellcheck="false" />
      </div>
      <span></span>
      <div class="input-container date-picker-container">
        <div class="block">
          <el-date-picker v-model="value1" type="datetimerange" start-placeholder="Start Date" end-placeholder="End Date" :default-time="defaultTime1" />
        </div>
      </div>
      <span></span>
      <div class="input-container guestsInput-container">
        <label for="guestsInput" class="">Guests</label>
        <input type="number" id="guestsInput" name="guestsInput" placeholder="How Many?" />
      </div>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue'
// import { fa } from 'element-plus/lib/locale'

export default {
  name: 'main-search',
  data() {
    return {
      value1: ref(''),
      headerObserver: null,
      stickyNav: false,
    }
  },
  components: {},
  mounted() {
    // this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
    //   rootMargin: '-100px 0px 0px',
    // })
    // this.headerObserver.observe(this.$ref.header)
  },
  created() {},
  methods: {
    // onHeaderObserved(entries) {
    //   entries.forEach((entry) => {
    //     this.stickyNav = entry.isIntersecting ? false : true
    //   })
    // },
  },
  computed: {
    defaultTime1() {
      ;[new Date(2000, 1, 1, 12, 0, 0)] // '12:00:00'
    },
  },
  unmounted() {},
}
</script>

<style></style>
