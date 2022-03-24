<template>
  <section class="home-page-container">
    <!-- <img src="" alt="" /> -->
    <div class="main-hero-img"></div>
    <!-- <div :style="{ backgroundImage: 'url(' + homePageImg + ')' }" class="home-page-img"></div> -->
    <!-- <div :style="'backgroundImage: ' + getImgUrl()" class="home-page-img"></div> -->
    <h1 class="destinations-header">Popular destinations</h1>
    <div class="destinations-containter">
      <a href="#/stay?destination=Barcelona">
        <img src="../assets/images/Barcelona.jpg" alt="" />
        <h3>Barcelona</h3>
      </a>
      <a href="#/stay?destination=London">
        <img src="../assets/images/London.jpg" alt="" />
        <h3>London</h3>
      </a>
      <a href="#/stay?destination=Rome">
        <img src="../assets/images/Rome.jpg" alt="" />
        <h3>Rome</h3>
      </a>
      <a href="#/stay?destination=Istanbul">
        <img src="../assets/images/Istanbul.jpg" alt="" />
        <h3>Istanbul</h3>
      </a>
    </div>
  </section>
</template>

<script>
// import homePageImg from '@/assets/homepage.png'
import { stayService } from "../services/stay-service";
export default {
  name: "home-page",
  data() {
    return {
      stays: stayService.query(),
    };
  },
  components: {
    // homePageImg,
  },
  created() {},
  methods: {},
  computed: {
    topRatedStays() {
      let stays = JSON.parse(JSON.stringify(this.stays));
      stays.sort((a, b) => a.reviewScores.rating - b.reviewScores.rating);
      console.log(stays);
      return stays;
    },
    // getImgUrl() {
    //   const imgUrl = new URL(`../assets/home-page.png`, import.meta.url)
    //   return imgUrl
    // },
  },
  unmounted() {},
};
</script>

<style></style>
