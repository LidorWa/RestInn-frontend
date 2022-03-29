<template>
  <p class="stays-count">{{ getStaysPreviewTitle }}</p>
  <ul v-if="stays.length" class="card-cont">
    <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
  </ul>
  <h1 v-else class="no-results">No results</h1>
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
    return {
      value: "",
      filterBy: {
        price: {
          min: 0,
          max: 700,
        },
        type: [],
      },
    };
  },
  created() {
    // if (this.$route.query.destination) {
    //   let city = this.$route.query.destination.split("?")[0];
    //   this.city = city;
    // }
  },
  components: {
    stayPreview,
  },
  computed: {
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
        // cityFromProps.charAt(0).toUpperCase() + cityFromProps.substring(1);

        return `${this.stays.length} stays in ${city}`;
      }
      return `${this.stays.length} stays`;
    },
  },
  methods: {},
};
</script>
