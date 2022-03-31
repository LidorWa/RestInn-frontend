<template>
  <section class="order-preview-section">
    <div>{{ timeConversion(order.createdAt) }}</div>
    <div>{{ order.buyer.fullname }}</div>
    <div>{{ formattedText }}</div>
    <div>{{ timeConversion(order.startDate) }}</div>
    <div>{{ timeConversion(order.endDate) }}</div>
    <div>{{ Math.round(order.totalPrice / order.stay.price) }}</div>
    <div>{{ order.guests.adults + order.guests.children }}</div>
    <div>{{ order.stay.price }}</div>
    <div>{{ order.totalPrice }}</div>
    <div>{{ order.status }}</div>
    <div>
      <button @click="updateStatus('rejected')">Reject</button>
      <button @click="updateStatus('approved')">Accept</button>
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
    timeConversion() {
      let date = new Date(this.order.createdAt).getDate();
      date = date < 10 ? "0" + date : date;
      let month = new Date(time).getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let year = new Date(time).getFullYear() +'';
      const convertedTime = `${date}/${month}/${year}`;

      return convertedTime;
    },
  },
  computed: {
    formattedText() {
      if (this.order.stay.name.length > 15) {
        return this.order.stay.name.slice(0, 15) + "...";
      }
      return this.order.stay.name;
    },
  },
};
</script>
