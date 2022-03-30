<template>
    <section class="review-list" v-if="reviews">
        <ul class="reviews-list-ul">
            <li v-for="review in reviews" :key="review._id">
                <review-preview :review="review" :userImg="getRandomImg" />
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
    data() {
        return {
        }
    },
    components: {
        reviewPreview
    },
    computed: {
        getRandomImg() {
            const guestsImages = ['image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg', 'image6.jpeg', 'image7.jpeg'
                , 'image8.jpeg', 'image9.jpeg', 'image10.jpeg', 'image11.jpeg', 'image12.jpeg', 'image13.jpeg', 'image14.jpeg', 'image15.jpeg']
            const idx = Math.floor(Math.random() * (15));
            const imgUrl = new URL(`../../assets/user-images/${guestsImages[idx]}`, import.meta.url);
            return imgUrl;
        }
    }
}
</script>

<style>
</style>