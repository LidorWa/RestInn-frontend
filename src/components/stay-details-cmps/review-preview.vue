<template>
    <section class="review-preview" id="review-section">
        <div class="review-guest-name-date">
            <img :src="review.by.imgUrl" />
            <div class="name-and-date">
                <span>{{ review.by.fullname }}</span>
                <span>{{ formattedDate }}</span>
            </div>
        </div>
        <div class="review-text">{{ formattedText }}</div>
        <div class="review-show-more" v-if="isLongTxt"><span>Show more </span><img src="../../assets/svgs/show-more.svg"></div>
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
    data(){
        return{
            isLongTxt: false,
        }
    },
    methods: {

    },
    computed: {
        formattedDate() {
            let monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let year = new Date(this.review.at).getFullYear();
            let month = monthsName[new Date(this.review.at).getMonth()];
            let dateStr = `${month} ${year}`
            return dateStr;
        },
        formattedText() {
            if (this.review.txt.length > 200){
                this.isLongTxt = true;
                return this.review.txt.slice(0, 200)+'...';
            } 
            return this.review.txt;
        }

    }
}
</script>

<style>
</style>