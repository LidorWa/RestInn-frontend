<template>
  <section class="hero-modal">
      <section class="hero-modal-container">
          <section class="hero-modal-header">
              <div class="hero-modal-price">
                  <span></span>
                  <span></span>
              </div>
              <div class="hero-modal-rating-reviews">
                  <span></span>
                  <span></span>
              </div>
          </section>
      </section>

  </section>
</template>

<script>
export default {
    props:{
        stay:{
            type: Object,
            required: true,
        }
    }
}
</script>

<style>

</style>