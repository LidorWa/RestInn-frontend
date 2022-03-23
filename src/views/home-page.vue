<template>
  <section class="home-page-container">
    <!-- <img src="" alt="" /> -->
    <div class="main-hero-img"></div>
    <!-- <div :style="{ backgroundImage: 'url(' + homePageImg + ')' }" class="home-page-img"></div> -->
    <!-- <div :style="'backgroundImage: ' + getImgUrl()" class="home-page-img"></div> -->
  </section>
</template>

<script>
// import homePageImg from '@/assets/homepage.png'
export default {
  name: 'home-page',
  data() {
    return {}
  },
  components: {
    // homePageImg,
  },
  created() {},
  methods: {},
  computed: {
    // getImgUrl() {
    //   const imgUrl = new URL(`../assets/home-page.png`, import.meta.url)
    //   return imgUrl
    // },
  },
  unmounted() {},
}
</script>

<style></style>
