<template>
  <li class="card">
    <div>
      <div class="carusele">
        <!-- <img :src="getImgUrl" alt="" /> -->
        <!-- arrow="always" -->
        <el-carousel :autoplay="false">
          <el-carousel-item v-for="item in stay.imgUrls" :key="item">
            <img class="card-img" :src="getImgUrl(item)" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="like"></div>
    </div>
    <p class="card-review-cont">
      <span class="material-icons-outlined star">star</span
      ><span class="card-rate">{{ getStayRate(stay) }}</span>
      <span class="reviews-count">({{ getReviewCount(stay) }})</span>
    </p>
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
    getStayRate(stay) {
      return (stay.reviewScores.rating / 20).toFixed(2);
    },
    getReviewCount(stay) {
      return stay.reviews.length + " Reviews";
    },
    getImgUrl(file) {
      const imgUrl = new URL(`../assets/images/${file}`, import.meta.url);

      return imgUrl;
    },
  },
  computed: {},
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
