<template>
  <section class="reviews-section" ref="reviews-section" v-if="stay">
    <section class="reviews-and-rating">
      <div>
        <img src="../../assets/svgs/star-rating.svg" />
        <span
          >{{ stay.reviewScores.rating / 20 }} ·
          {{ stay.reviews.length }} reviews</span
        >
      </div>
      <score-scales :reviewScores="stay.reviewScores" />
    </section>

    <review-list :reviews="getReviewsForDisplay"></review-list>
  </section>
</template>

<script>
import reviewList from "./review-list.vue";
import scoreScales from "./score-scales.vue";
export default {
  name: "reviews-section",
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  components: {
    reviewList,
    scoreScales,
  },
  data() {
    return {};
  },
  computed: {
    getReviewsForDisplay() {
      let reviews =
        this.stay.reviews.length > 6
          ? this.stay.reviews.slice(0, 6)
          : this.stay.reviews.slice();
      return reviews;
    },
  },
};
</script>

<style></style>
