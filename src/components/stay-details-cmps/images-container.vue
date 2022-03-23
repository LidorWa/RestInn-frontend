<template>
    <section class="imgs-container-grid" v-if="stayImgs">
        <img :src="getImgUrl(stayImgs[0])" >
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
      const imgUrl = new URL(`../assets/images/${file}`, import.meta.url);
      return imgUrl;
    },
    }
}

</script>

<style>
</style>