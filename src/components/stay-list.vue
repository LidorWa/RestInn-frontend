<template>
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
  components: {
    stayPreview,
  },
  methods: {},
};
</script>
