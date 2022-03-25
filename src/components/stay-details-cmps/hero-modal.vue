<template>
    <section class="hero-modal">
        <section class="hero-modal-container">
            <section class="hero-modal-header">
                <div class="hero-modal-price">
                    <span>{{ $filters.currencyUSD(stay.price) }}</span>
                    <span>/ night</span>
                </div>
                <div class="hero-modal-rating-reviews">
                    <span>
                        <img src="../../assets/svgs/star-rating.svg" />
                    </span>
                    <span>{{ fixedScore }} ·</span>
                    <span>{{ stay.reviews.length }} reviews</span>
                </div>
            </section>
            <section class="hero-modal-selection">
                <button class="hero-modal-check-btn">
                    <div class="hero-modal-check-in">
                        <span>CHECK-IN</span>
                        <span>Add date</span>
                    </div>
                    <div class="hero-modal-check-in">
                        <span>CHECK-OUT</span>
                        <span>Add date</span>
                    </div>
                </button>
            </section>
        </section>
    </section>
</template>

<script>
export default {
    props: {
        stay: {
            type: Object,
            required: true,
        }
    },
    computed: {
        fixedScore() {
            let currStayScore = this.stay.reviewScores.rating / 20;
            return currStayScore.toFixed(2);
        }
    }
}
</script>

<style>
</style>