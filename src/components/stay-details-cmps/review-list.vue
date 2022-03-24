<template>
    <section class="reviews-list" v-if="reviews">
        <ul class="reviews-list-ul">
            <li v-for="review in reviews" :key="review._id">
                <review-preview :review="review" />
                
            </li>
        </ul>
    </section>
</template>

<script>
import reviewPreview from './review-preview.vue'
export default {
    name: 'review-list',
    props: {
        reviews: {
            type: Array,
            required: true,
        }
    },
    components: {
        reviewPreview
    }

}
</script>

<style>
</style>