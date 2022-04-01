<template>
  <section v-if="trip" class="dashboard-order-cont">
    <div class="date">{{ timeConversion(trip.createdAt) }}</div>
    <div class="booker">{{ trip.buyer.fullname }}</div>
    <div class="stay">{{ formattedText }}</div>
    <div class="trip-dates">
      {{ timeConversion(trip.startDate) }} -
      {{ timeConversion(trip.endDate) }}
    </div>
    <div class="nights">
      {{ Math.round(trip.totalPrice / trip.stay.price) }}
    </div>
    <div class="guests">{{ trip.guests.adults + trip.guests.children }}</div>
    <div class="price">{{ getFormatedPrice(trip.stay.price) }} / n</div>
    <div class="total">{{ getFormatedPrice(trip.totalPrice) }}</div>
    <div class="status" :class="trip.status">{{ trip.status }}</div>
    <div class="actions actions-container">
      <button :disabled="isUnancelable" @click="updateStatus('canceled')">
        Cancel
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "trip-preview",
  emits: ["updateStatus"],
  props: {
    trip: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getFormatedPrice(price) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });

      return formatter.format(price);
    },
    updateStatus(status) {
      const id = this.trip._id;
      this.$emit("updateStatus", { status, tripId: id });
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
    isUnancelable() {
      const startDate = this.trip.startDate;
      const now = Date.now();
      const threeDays = 1000 * 60 * 60 * 72;
      return (
        startDate - now < threeDays ||
        this.trip.status === "canceled" ||
        this.trip.status === "rejected"
      );
    },
    formattedText() {
      if (this.trip.stay.name.length > 15) {
        return this.trip.stay.name.slice(0, 15) + "...";
      }
      return this.trip.stay.name;
    },
  },
};
</script>
