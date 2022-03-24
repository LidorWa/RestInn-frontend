<template>
  <section class="reviews-section" v-if="stay">
    <section class="reviews-and-rating">
      <h2>
        <img src="../../assets/svgs/star-rating.svg" />
        <span>{{ stay.reviewScores.rating / 20 }} · {{ stay.reviews.length }} reviews</span>
      </h2>
      <section class="score-scales"></section>
    </section>
    
      <review-list :reviews="stay.reviews"></review-list>

  </section>
</template>

<script>
import reviewList from './review-list.vue'
export default {
  name: 'reviews-section',
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  components:{
    reviewList
  },
    data(){
      return {
      }
    }

  
}
</script>

<style>
</style>