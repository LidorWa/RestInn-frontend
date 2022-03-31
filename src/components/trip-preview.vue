<template>
  <section class="trip-preview-container">
    <!-- <li>{{ timeConversion }}</li> -->
    <div>{{ trip.createdAt }}</div>
    <div>{{ trip.buyer.fullname }}</div>
    <div>{{ formattedText }}</div>
    <div>{{ trip.startDate }}</div>
    <div>{{ trip.endDate }}</div>
    <div>{{ trip.totalPrice / trip.stay.price }}</div>
    <div>{{ trip.guests.adults + trip.guests.children }}</div>
    <div>{{ trip.stay.price }}</div>
    <div>{{ trip.totalPrice }}</div>
    <div>{{ trip.status }}</div>
    <div>
      <button v-if="isCancelable" @click="updateStatus('rejected')">
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
    updateStatus(status) {
      this.$emit("updateStatus", { status, tripId: this.trip._id });
    },
    getFormatedTime(time) {
      const now = new Date();
      const date = new Date(time);
      // const timePassed = now - date

      return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      }`;
    },
  },
  computed: {
    isCancelable() {
      const startDate = this.trip.startDate;
      const now = new Date();
      return true;
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
