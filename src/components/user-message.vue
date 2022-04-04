<template>
  <section class="user-msg">
    <h1 @click="goToPage" class="flex align-center">
      <img :src="getIconUrl" :class="getImageClass" alt="icon" />
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
      if (this.message.from === "host") this.$router.push("/my-trips");
      else this.$router.push("/dashboard");
    },
  },
  computed: {
    getImageClass() {
      const status = this.$store.getters.getOrderStatus;
      console.log("status status status status");
      if (status === "approved") return "success";
      return "danger";
    },
    getIconUrl() {
      const status = this.$store.getters.getOrderStatus;
      let file;
      if (status === "approved") file = "success.png";
      else file = "danger.png";
      const imgUrl = new URL(`../assets/system-imgs/${file}`, import.meta.url);
      return imgUrl;
    },
  },
};
</script>
