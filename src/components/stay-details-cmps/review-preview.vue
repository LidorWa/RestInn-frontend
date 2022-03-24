<template>
    <section class="review-preview">
        <div class="review-guest-name-date">
            <img :src="review.by.imgUrl" />
            <div class="name-and-date">
                <span>{{review.by.fullname}}</span>
                <span>{{review.at}}</span>
            </div>
        </div>
        <div class="review-text">
            {{review.txt}}
        </div>
    </section>
</template>

<script>
export default {
    name: 'review-preview',
    props: {
        review: {
            type: Object,
            required: true,
        }
    },
    methods: {
    }
}
</script>

<style>
</style>