<template>
  <section class="user-msg">
    <h1 @click="goToDashboard">You have received a new order</h1>
  </section>
</template>

<script>
export default {
  props: {
    message: {},
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
