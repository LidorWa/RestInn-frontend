<template>
  <section class="user-msg" :class="getMessageClass">
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
  computed: {
    getMessageClass() {
      const status = this.$store.getters.getOrderStatus;
      if (status === "approved") return "success";
      return "danger";
    },
  },
};
</script>
