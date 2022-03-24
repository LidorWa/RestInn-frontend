<template>
    <section class="imgs-container-grid" v-if="stayImgs">
        <img class="grid-item1" :src="getImgUrl(stayImgs[0])" >
        <img class="grid-item2" :src="getImgUrl(stayImgs[1])" >
        <img class="grid-item3" :src="getImgUrl(stayImgs[2])" >
        <img class="grid-item4" :src="getImgUrl(stayImgs[3])" >
        <img class="grid-item5" :src="getImgUrl(stayImgs[4])" >
    </section>
</template>

<script>
export default {
    props: {
        stayImgs: {
            type: Array,
            required: true,
        }
    },
    methods:{
        
    getImgUrl(file) {
      const imgUrl = new URL(`../../assets/images/${file}`, import.meta.url);
      return imgUrl;
    },
    }
}

</script>

<style>
</style>