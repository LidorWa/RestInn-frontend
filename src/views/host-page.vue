<template>
  <section class="host-page">
    <section class="host-page-text-and-video">
      <section class="host-page-text">
        <div class="logo-pink">
          <i class="fa-brands fa-airbnb logo-pink-i"></i>
          <h1 class="logo-restinn">RestInn</h1>
        </div>
        <div class="tag-line-about">
          <h1 class="tag tag-line3">Choose your inn,</h1>
          <h1 class="tag tag-line4">We'll do the rest</h1>
        </div>
      </section>
      <section class="host-page-video">
        <video class="host-video" autoplay muted preload="none" poster="../assets/host-video/image1.jpg" @canplay="videoLoadedFunction">
          <source src="../assets/host-video/restinn host video.mp4" type="video/mp4" />Sorry, your browser doesn't support embedded videos.
        </video>
      </section>
    </section>
  </section>
</template>

<script>
export default {

  methods: {
    getImgUrl(file) {
      const imgUrl = new URL(`../assets/system-imgs/restinn-logo-with-slogan.jpeg`, import.meta.url);
      return imgUrl;
    },
    videoLoadedFunction(){
      setTimeout(() => {
        
      }, 500);
    }
  }
}
</script>

<style></style>
