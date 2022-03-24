<template>
  <section class="home-page-container">
    <!-- <img src="" alt="" /> -->
    <div class="main-hero-img"></div>
    <!-- <div :style="{ backgroundImage: 'url(' + homePageImg + ')' }" class="home-page-img"></div> -->
    <!-- <div :style="'backgroundImage: ' + getImgUrl()" class="home-page-img"></div> -->
    <h1 class="destinations-header">Popular destinations</h1>
    <div class="destinations-containter">
      <a href="#/stay?destination=Barcelona">
        <img src="../assets/images/Barcelona.jpg" alt="Barcelona" />
        <h3>Barcelona</h3>
      </a>
      <a href="#/stay?destination=London">
        <img src="../assets/images/London.jpg" alt="London" />
        <h3>London</h3>
      </a>
      <a href="#/stay?destination=Rome">
        <img src="../assets/images/Rome.jpg" alt="Rome" />
        <h3>Rome</h3>
      </a>
      <a href="#/stay?destination=Istanbul">
        <img src="../assets/images/Istanbul.jpg" alt="Istanbul" />
        <h3>Istanbul</h3>
      </a>
    </div>
    <h1 class="destinations-header">Top rated stays</h1>
    <div v-if="topRatedStays" class="destinations-containter">
      <a
        :href="'/#/stay/' + stay._id"
        v-for="stay in topRatedStays"
        :key="stay._id"
      >
        <img :src="getImgUrl(stay.imgUrls[0])" alt="StayImage" />
        <h4>{{ stay.name }}</h4>
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
    return {};
  },
  components: {
    // homePageImg,
  },

  methods: {
    getImgUrl(file) {
      const imgUrl = new URL(`../assets/images/${file}`, import.meta.url);
      return imgUrl;
    },
  },
  computed: {
    topRatedStays() {
      console.log("hey");
      return this.$store.getters.getTopRatedStays;
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
