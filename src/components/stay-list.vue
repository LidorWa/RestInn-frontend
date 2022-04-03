<template>
  <section v-if="stays" class="stay-list-container">
    <img
      class="loading-img"
      v-if="isLoading"
      src="../assets/system-imgs/loading.gif"
      alt="Loading.."
    />

    <p v-if="stays.length && !isLoading" class="stays-count">
      {{ getStaysPreviewTitle }}
    </p>
    <ul v-if="stays.length && !isLoading" class="card-cont">
      <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
    </ul>
    <h1 v-if="!stays.length && !isLoading" class="no-results">No results</h1>
  </section>
</template>

<script>
import stayPreview from "./stay-preview.vue";

export default {
  props: {
    stays: {
      type: Array,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {
    stayPreview,
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    getStaysPreviewTitle() {
      if (this.city) {
        let cityFromProps = this.city;
        let city = cityFromProps
          .split("")
          .map((char, idx) => {
            if (!idx) return char.toUpperCase();
            return char.toLowerCase();
          })
          .join("");
        return `${this.stays.length} stays in ${city}`;
      }
      return `${this.stays.length} stays`;
    },
  },
  methods: {},
};
</script>
