<template>
  <section class="home-page-container">
    <!-- <img src="" alt="" /> -->
    <div class="main-hero-img"></div>
    <!-- <div :style="{ backgroundImage: 'url(' + homePageImg + ')' }" class="home-page-img"></div> -->
    <!-- <div :style="'backgroundImage: ' + getImgUrl()" class="home-page-img"></div> -->
    <!-- Top destinations -->
    <h1 class="destinations-header">Popular destinations</h1>
    <div class="destinations-containter">
      <a href="#/stay?destination=Barcelona">
        <img src="../assets/images/Barcelona.jpg" alt="Barcelona" />
        <h3>Barcelona</h3>
      </a>
      <a href="#/stay?destination=Hong$Kong">
        <img src="../assets/images/Hongkong.jpg" alt="Hongkong" />
        <h3>Hong Kong</h3>
      </a>
      <a href="#/stay?destination=Maui">
        <img src="../assets/images/Maui.jpg" alt="Maui" />
        <h3>Maui</h3>
      </a>
      <a href="#/stay?destination=Istanbul">
        <img src="../assets/images/Istanbul.jpg" alt="Istanbul" />
        <h3>Istanbul</h3>
      </a>
    </div>
    <!-- Select by type -->
    <h1 class="destinations-header">Select by type</h1>
    <div class="destinations-containter">
      <a href="#/stay?type=Cabin">
        <img src="../assets/images/cabin.jpg" alt="Cabin" />
        <h3>Cabin</h3>
      </a>
      <a href="#/stay?type=Apartment">
        <img src="../assets/images/Apartment.jpg" alt="Apartment" />
        <h3>Apartment</h3>
      </a>
      <a href="#/stay?type=Loft">
        <img src="../assets/images/Loft.jpg" alt="Loft" />
        <h3>Loft</h3>
      </a>
      <a href="#/stay?type=Villa">
        <img src="../assets/images/Villa.jpg" alt="Villa" />
        <h3>Villa</h3>
      </a>
    </div>
    <!-- Top rated  -->
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
