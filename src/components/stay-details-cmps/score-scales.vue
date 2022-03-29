<template>
    <section class="score-scales" v-if="reviewScores">
        <div class="reviews-scores">
            <span>cleaniness</span>
            <div class="scale-threshold">
                <div :style="`width:${reviewScores.cleanliness * 10}px;`"></div>
            </div>
            <span>{{reviewScores.cleanliness / 2}}</span>
        </div>
        <div class="reviews-scores">
            <span>Communication</span>
            <div class="scale-threshold">
                <div :style="`width:${reviewScores.communication * 10}px;`"></div>
            </div>
            <span>{{reviewScores.communication / 2}}</span>
        </div>
        <div class="reviews-scores">
            <span>Check-in</span>
            <div class="scale-threshold">
                <div :style="`width:${reviewScores.checkin * 10}px;`"></div>
            </div>
            <span>{{reviewScores.checkin / 2}}</span>
        </div>
        <div class="reviews-scores">
            <span>Accuracy</span>
            <div class="scale-threshold">
                <div :style="`width:${reviewScores.accuracy * 10}px;`"></div>
            </div>
            <span>{{reviewScores.accuracy / 2}}</span>
        </div>
        <div class="reviews-scores">
            <span>Location</span>
            <div class="scale-threshold">
                <div :style="`width:${reviewScores.location * 10}px;`"></div>
            </div>
            <span>{{reviewScores.location / 2}}</span>
        </div>
        <div class="reviews-scores">
            <span>Value</span>
            <div class="scale-threshold">
                <div :style="`width:${reviewScores.value * 10}px;`"></div>
            </div>
            <span>{{reviewScores.value / 2}}</span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        reviewScores: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>
</style>

