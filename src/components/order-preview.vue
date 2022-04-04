<template>
  <section class="dashboard-order-cont">
    <div class="date">{{ timeConversion(order.createdAt) }}</div>
    <div class="booker">{{ order.buyer.fullname }}</div>
    <div @click="goToStay" class="stay">{{ formattedText }}</div>
    <div class="trip-dates">
      {{ timeConversion(order.startDate) }} -
      {{ timeConversion(order.endDate) }}
    </div>
    <div class="nights">
      {{ Math.round(order.totalPrice / order.stay.price) }}
    </div>
    <div class="guests">{{ order.guests.adults + order.guests.children }}</div>
    <div class="price">{{ getFormatedPrice(order.stay.price) }}</div>
    <div class="total">{{ getFormatedPrice(order.totalPrice) }}</div>
    <div class="status" :class="order.status">{{ order.status }}</div>
    <div class="actions actions-container">
      <button
        :disabled="isUnrejectable"
        class="approve-btn"
        @click="updateStatus('rejected')"
      >
        Reject
      </button>
      <button
        :disabled="isUnapprovable"
        class="reject-btn"
        @click="updateStatus('approved')"
      >
        Approve
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
    goToStay() {
      this.$router.push(`/stay/${this.trip.stay._id}`);
    },
    getFormatedPrice(price) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });

      return formatter.format(price);
    },
    updateStatus(status) {
      this.$emit("updateStatus", { status, orderId: this.order._id });
    },
    timeConversion(time) {
      let date = new Date(time).getDate();
      date = date < 10 ? "0" + date : date;
      let month = new Date(time).getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let year = new Date(time).getFullYear().toString().substring(2) + "";
      const convertedTime = `${date}/${month}/${year}`;

      return convertedTime;
    },
  },
  computed: {
    isUndisable() {
      const startDate = this.order.startDate;
      const now = Date.now();
      const day = 1000 * 60 * 60 * 24;
      returnstartDate - now < day || this.order.status !== "approved";
    },
    isUnrejectable() {
      const startDate = this.order.startDate;
      const now = Date.now();
      const day = 1000 * 60 * 60 * 24;
      return (
        startDate - now < day ||
        this.order.status === "rejected" ||
        this.order.status === "canceled"
      );
    },
    isUnapprovable() {
      const startDate = this.order.startDate;
      const now = Date.now();
      const day = 1000 * 60 * 60 * 24;
      return (
        startDate - now < day ||
        this.order.status === "approved" ||
        this.order.status === "canceled"
      );
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
