<template>
        <div class="secondary-header">
        <div class="stay-name">
          <h1>{{ stay.name }}</h1>
        </div>

        <div class="below-stay-name">
          <div class="rating-reviews-location">
            <img class="star-rating-svg" src="../../assets/svgs/star-rating.svg" />
            <span>{{ stay.reviewScores.rating / 20 }}</span>
            <span>·</span>
            <span>{{ stay.reviews.length }} reviews</span>
            <span class="dot-above-pictures">·</span>
            <span
              class="location-above-pictures"
            >{{ stay.address.city }}, {{ stay.address.country }}</span>
          </div>
          <div class="share-save">
            <div class="share">
              <img class="share-svg" src="../../assets/svgs/share.svg" />
              <span>Share</span>
            </div>
            <div class="save-like">
              <img class="like-svg" src="../../assets/svgs/like.svg" />
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        stay: {
            type: Object,
            required: true,
        }
    }

}
</script>

<style>

</style>