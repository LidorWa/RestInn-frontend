<template>
  <section class="order-preview-section">
    <!-- <li>{{ timeConversion }}</li> -->
    <div>{{ order.createdAt }}</div>
    <div>{{ order.buyer.fullname }}</div>
    <div>{{ formattedText }}</div>
    <div>{{ order.startDate }}</div>
    <div>{{ order.endDate }}</div>
    <div>{{ order.totalPrice / order.stay.price }}</div>
    <div>{{ order.guests.adults + order.guests.children }}</div>
    <div>{{ order.stay.price }}</div>
    <div>{{ order.totalPrice }}</div>
    <div>{{ order.status }}</div>
    <div>
      <button v-if="isCancable" @click="updateStatus('rejected')">
        Reject
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "order-preview",
  emits: ["updateStatus"],
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  methods: {
    updateStatus(status) {
      this.$emit("updateStatus", { status, orderId: this.order._id });
    },
  },
  computed: {
    isCancable() {
      const startDate = trip.startDate;
    },
    timeConversion() {
      //TODO: check if works!
      const convertedTime = this.order.createdAt.d.toDateString();
      console.log();
      return convertedTime;
    },
    formattedText() {
      if (this.order.stay.name.length > 15) {
        return this.order.stay.name.slice(0, 15) + "...";
      }
      return this.order.stay.name;
    },
  },
};
</script>
