<template>
  <section class="app-container">
    <app-header />
    <router-view />
  </section>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
export default {
  name: "app",
  components: {
    appHeader,
    appFooter,
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    // this.$store.dispatch({ type: 'loadStays' })
  },
  methods: {},
};
</script>

<style></style>
