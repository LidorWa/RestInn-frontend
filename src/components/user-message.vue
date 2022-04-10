<template>
  <section @click="goToPage" class="user-msg">
    <h1 v-if="message.text" class="flex align-center">
      <img :src="getIconUrl" :class="message.class" alt="icon" />
      <h1>{{ message.text }}</h1>
    </h1>
  </section>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  methods: {
    goToPage() {
      if (this.message.from === "host") this.$router.push("/mytrips");
      else this.$router.push("/dashboard");
    },
  },
  computed: {
    getIconUrl() {
      const file = `${this.message.class}.png`;
      const imgUrl = new URL(`../assets/system-imgs/${file}`, import.meta.url);
      return imgUrl;
    },
  },
};
</script>
