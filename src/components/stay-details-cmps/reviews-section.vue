<template>
            <section class="reviews-section">
            <div class="reviews-and-rating">
              <h2>
                <img src="../../assets/svgs/star-rating.svg">
                <span>{{ stay.reviewScores.rating / 20 }} · {{stay.reviews.length}}</span>
              </h2>
            </div>
            
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