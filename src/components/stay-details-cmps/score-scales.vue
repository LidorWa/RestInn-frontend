<template>
  <section class="score-scales" v-if="reviewScores">
    <div class="scores-mini-container">
      <div class="reviews-scores">
        <span>Cleaniness</span>
        <div class="bar-and-score">
          <div class="scale-threshold">
            <div :style="`width:${reviewScores.cleanliness * 9}px;`"></div>
          </div>
          <div class="score-number">
            {{ (reviewScores.cleanliness / 2).toFixed(1) }}
          </div>
        </div>
      </div>
      <div class="reviews-scores">
        <span>Communication</span>
        <div class="bar-and-score">
          <div class="scale-threshold">
            <div :style="`width:${reviewScores.communication * 9}px;`"></div>
          </div>
          <div class="score-number">
            {{ (reviewScores.communication / 2).toFixed(1) }}
          </div>
        </div>
      </div>

      <div class="reviews-scores">
        <span>Check-in</span>
        <div class="bar-and-score">
          <div class="scale-threshold">
            <div :style="`width:${reviewScores.checkin * 9}px;`"></div>
          </div>
          <div class="score-number">
            {{ (reviewScores.checkin / 2).toFixed(1) }}
          </div>
        </div>
      </div>
    </div>
    <div class="scores-mini-container">
      <div class="reviews-scores">
        <span>Accuracy</span>
        <div class="bar-and-score">
          <div class="scale-threshold">
            <div :style="`width:${reviewScores.accuracy * 9}px;`"></div>
          </div>
          <div class="score-number">
            {{ (reviewScores.accuracy / 2).toFixed(1) }}
          </div>
        </div>
      </div>

      <div class="reviews-scores">
        <span>Location</span>
        <div class="bar-and-score">
          <div class="scale-threshold">
            <div :style="`width:${reviewScores.location * 9}px;`"></div>
          </div>
          <div class="score-number">
            {{ (reviewScores.location / 2).toFixed(1) }}
          </div>
        </div>
      </div>

      <div class="reviews-scores">
        <span>Value</span>
        <div class="bar-and-score">
          <div class="scale-threshold">
            <div :style="`width:${reviewScores.value * 9}px;`"></div>
          </div>
          <div class="score-number">
            {{ (reviewScores.value / 2).toFixed(1) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    reviewScores: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
