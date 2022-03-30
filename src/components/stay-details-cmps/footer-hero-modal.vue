<template>
    <section class="footer-hero-modal">
        <div class="footer-hero-modal-container">
            <div class="footer-hero-modal-price-rating">
                <div class="footer-hero-modal-price">
                    <span>{{ $filters.currencyUSD(stay.price) }}</span>
                    <span>&nbsp; / night</span>
                </div>

                <div class="footer-hero-modal-rating">
                    <img src="../../assets/svgs/star-rating.svg" />
                    <span>{{ fixedScore }}</span>
                </div>
            </div>
        </div>
        <div class="footer-check-availability-container">
            <span class="check-availability-span">Check availability</span>
        </div>
    </section>
</template>

<script>

export default {
    name: 'footer-hero-modal',
    props: {
        stay: {
            type: Object,
            required: true,
        }
    },
    computed: {
        fixedScore() {
            let currStayScore = this.stay.reviewScores.rating / 20
            return currStayScore.toFixed(2)
        },
    }
}
</script>

<style>
</style>