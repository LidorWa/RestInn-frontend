<template>
  <li class="card" @click="stayClicked">
    <div>
      <div class="carousele">
        <div class="block">
          <el-carousel :autoplay="false">
            <el-carousel-item v-for="item in stay.imgUrls" :key="item">
              <img
                v-if="!isLiked"
                class="like-img"
                src="../assets/svgs/empty-like.svg"
                alt="like"
                @click.stop="likeCliked"
              />
              <img
                v-if="isLiked"
                class="like-img"
                src="../assets/svgs/full-like.svg"
                alt="like"
                @click.stop="likeCliked"
              />
              <img class="card-img" :src="getImgUrl(item)" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="like"></div>
    </div>
    <p class="card-preview-line">
      <span class="material-icons-outlined star">star</span
      ><span class="card-rate">{{ getStayRate(stay) }}</span>
      <span class="reviews-count">({{ getReviewCount(stay) }})</span>
    </p>
    <p class="card-preview-line">
      <span>{{ stay.propertyType }}</span>
      <span class="preview-dot">·</span>
      <span>{{ stay.address.city }}</span>
    </p>
    <p>{{ stay.name }}</p>
    <p>
      <span class="card-preview-price">{{
        $filters.currencyUSD(stay.price)
      }}</span
      ><span> / night</span>
    </p>
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
  data() {
    return {
      isLiked: false,
    };
  },
  methods: {
    likeCliked() {
      this.isLiked = !this.isLiked;
    },
    stayClicked() {
      this.$router.push(`/stay/${this.stay._id}`);
    },
    getStayRate(stay) {
      return (stay.reviewScores.rating / 20).toFixed(2);
    },
    getReviewCount(stay) {
      return stay.reviews.length + " reviews";
    },
    getImgUrl(file) {
      const imgUrl = new URL(`../assets/images/${file}`, import.meta.url);
      return imgUrl;
    },
  },
  computed: {},
};
</script>
