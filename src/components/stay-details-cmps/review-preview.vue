<template>
    <section class="review-preview" id="review-section">
        <div class="review-guest-name-date">
            <img
                :src="getRandomImg"
                alt="User picture"
                onerror="this.onerror=null; this.src='https://thispersondoesnotexist.com/image'"
            />
            <div class="name-and-date">
                <span>{{ review.by.fullname }}</span>
                <span>{{ formattedDate }}</span>
            </div>
        </div>
        <div class="review-text">{{ formattedText }}</div>
        <div class="review-show-more" v-if="isLongTxt">
            <span>Show more</span>
            <img src="../../assets/svgs/show-more.svg" />
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
        },
        
    },
    data() {
        return {
            isLongTxt: false,
        }
    },
    methods: {

    },
    computed: {
        getRandomImg() {
            const guestsImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg'
                , 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg']

            const idx = Math.floor(Math.random() * (15));
            const imgUrl = new URL(`../../assets/user-images/${guestsImages[idx]}`, import.meta.url);
            return imgUrl;
        },
        formattedDate() {
            let monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let year = new Date(this.review.at).getFullYear();
            let month = monthsName[new Date(this.review.at).getMonth()];
            let dateStr = `${month} ${year}`
            return dateStr;
        },
        formattedText() {
            if (this.review.txt.length > 200) {
                this.isLongTxt = true;
                return this.review.txt.slice(0, 200) + '...';
            }
            return this.review.txt;
        }

    },
    created(){
    }
}
</script>

<style>
</style>