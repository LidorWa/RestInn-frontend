<template>
  <section class="user-msg">
    <h1 @click="goToPage">{{ message.text }}</h1>
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
};
</script>
