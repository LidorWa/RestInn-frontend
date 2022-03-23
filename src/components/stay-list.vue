<template>
  <p class="stays-count">{{ stays.length }} stays</p>
  <ul class="card-cont">
    <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
  </ul>
</template>

<script>
import stayPreview from "./stay-preview.vue";

export default {
  props: {
    stays: {
      type: Array,
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
        type: "",
      },
      options: [
        {
          value: "",
          label: "All",
        },
        {
          value: "Apartment",
          label: "Apartment",
        },
        {
          value: "Serviced apartment",
          label: "Serviced apartment",
        },
        {
          value: "Option1",
          label: "Option1",
        },
      ],
    };
  },
  components: {
    stayPreview,
  },
  methods: {},
};
</script>
