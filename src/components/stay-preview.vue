<template>
  <li class="card">
    <div class="card-img">
      <div class="carusele">
        <img :src="getImgUrl(stay.imgUrls[0])" />
      </div>
      <div class="like"></div>
    </div>
    <span class="material-icons-outlined star">star</span>
    <span>{{ stay.name }}</span>
    <router-link :to="'/stay/' + stay._id">Details</router-link>
    <!-- <img v-if="stay.img" :src="stay.img" class="stay-img" /> -->
    <span>{{ $filters.currencyUSD(stay.price) }}</span>
  </li>
</template>

<script>
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
