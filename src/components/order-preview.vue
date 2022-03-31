<template>
  <section class="order-preview-section">
    <li>{{ timeConversion }}</li>
    <!-- <div>{{ order.createdAt }}</div> -->
    <div>{{ order.buyer.fullname }}</div>
    <div>{{ formattedText }}</div>
    <div>{{ order.startDate }}</div>
    <div>{{ order.endDate }}</div>
    <div>{{ Math.round(order.totalPrice / order.stay.price) }}</div>
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
      let date = new Date(this.order.createdAt).getDate();
      date = date < 10 ? "0" + date : date;
      let month = new Date(this.order.createdAt).getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      const year = new Date(this.order.createdAt).getFullYear();
      const convertedTime = `${date}/${month}/${year}`;

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
