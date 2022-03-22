<template>
  <li
    class="card"
    :style="{
      background: 'url(' + stay.img + ') ',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <span>{{ stay.name }}</span>
    <!-- <img v-if="stay.img" :src="stay.img" class="stay-img" /> -->
    <span>{{ $filters.currencyUSD(stay.price) }}</span>

    <router-link :to="'/stay/' + stay._id">Details</router-link>
  </li>
</template>

<script>
// _id: 307,
// name: "velit in",
// price: 98,
// type: "Funny",
// createdAt: "1984-12-18T07:34:17.814Z",
// inStock: true,
export default {
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  components: {
    // carPreview,
  },
  methods: {},
};
</script>
