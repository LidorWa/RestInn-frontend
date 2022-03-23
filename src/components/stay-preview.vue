<template>
  <li class="card">
    <div class="card-img">
      <div class="carusele">
        <img :src="getImgUrl(stay.imgUrls[0])" />
      </div>
      <div class="like"></div>
    </div>
    <span>{{ stay.name }}</span>
    <router-link :to="'/stay/' + stay._id">Details</router-link>
    <!-- <img v-if="stay.img" :src="stay.img" class="stay-img" /> -->
    <span>{{ $filters.currencyUSD(stay.price) }}</span>
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
  methods: {
    getImgUrl(file) {
      return `../assets/images/${file}`;
    },
  },
};
</script>
