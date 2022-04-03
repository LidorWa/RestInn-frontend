<template>
  <section class="review-list" v-if="reviews">
    <ul class="reviews-list-ul">
      <li v-for="(review, index) in reviews" :key="review._id">
        <review-preview :idx="index" :review="review" />
      </li>
    </ul>
  </section>
</template>

<script>
import reviewPreview from "./review-preview.vue";

export default {
  name: "review-list",
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {
    reviewPreview,
  },
  computed: {
    // getRandomImg() {
    //     const guestsImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg'
    //         , 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg']
    //     const idx = Math.floor(Math.random() * (15));
    //     const imgUrl = new URL(`../../assets/user-images/${guestsImages[idx]}`, import.meta.url);
    //     return imgUrl;
    // }
  },
};
</script>

<style></style>
