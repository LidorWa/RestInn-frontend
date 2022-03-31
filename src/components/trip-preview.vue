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
      <button @click="updateStatus('rejected')">Reject</button>
      <button @click="updateStatus('approved')">Accept</button>
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
    },
    computed: {
      timeConversion() {
        //TODO: check if works!
        const convertedTime = this.trip.createdAt.d.toDateString();
        console.log();
        return convertedTime;
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
