<template>
  <section>
    <form @submit.prevent="" class="main-search-container flex align-center btn">
      <div class="header-input location-input flex flex-column">
        <label for="label location-input" class="location-input">Location</label>
        <input type="text" id="location-input" name="location-input" placeholder="Where are you going?" autocomplete="off" spellcheck="false" />
      </div>

      <span></span>
      <div class="date-picker-container flex">
        <div class="header-input check-in-top flex flex-column">
          <div class="label check-in-top">Check in</div>
          <div class="header-input">Add dates</div>
        </div>

        <span></span>

        <div class="header-input check-out-top flex flex-column">
          <div class="label check-out-top">Check out</div>
          <div>Add dates</div>
        </div>

        <div class="block header-input date-picker">
          <el-date-picker v-model="value1" type="datetimerange" start-placeholder="Start Date" end-placeholder="End Date" :default-time="defaultTime1">
            <!-- <template #default> bulla </template> -->
            <template #range-separator> <span></span> </template>
          </el-date-picker>
        </div>
      </div>
      <span></span>

      <div class="header-input guestsInput flex flex-column">
        <label for="guestsInput" class="label">Guests</label>
        <div class="flex">
          <input type="number" id="guestsInput" name="guestsInput" placeholder="Add guests" />
          <button class="search-icon">
            <img src="../assets/svgs/search.svg" alt="search Icon" />
          </button>
        </div>
        <!-- <img src="../assets/svgs/search.svg" alt="search Icon" /> -->
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
    //TODO: check if needed, delete hour
    defaultTime1() {
      ;[new Date(2000, 1, 1, 12, 0, 0)] // '12:00:00'
    },
  },
  unmounted() {},
}
</script>

<style></style>
