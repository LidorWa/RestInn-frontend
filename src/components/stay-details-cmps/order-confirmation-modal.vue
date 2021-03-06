<template>
  <section v-if="displayConfirmation" class="order-confirmation-modal">
    <div class="confirmation-details">
      <!-- upper part -->
      <div v-if="!isConfirmed" class="confirm-title-container">
        <p class="confirm-title">One last step</p>
        <h1 class="confirm-text">Dear {{ getUserFirstName }},</h1>
        <h1 class="confirm-text">
          In order to complete your reservation, please confirm your trip
          details.
        </h1>
      </div>
      <!-- ///////////////////////////////// number 2 -->
      <div v-if="isConfirmed" class="confirm-title-container">
        <div>
          <div class="confirm-secondary-title flex align-center">
            <img
              class="success-sign confirm-title"
              src="../../assets/system-imgs/success.png"
              alt="success sign"
            />
            <h1 class="confirm-title">Reserved successfully</h1>
          </div>
          <!-- <h1 class="confirm-text">Your order has been received</h1>
        <h1 class="confirm-text">We will let you know when the host responds</h1> -->
          <h1 class="confirm-text follow-your-trip">
            You can follow the order status in
            <span @click="goToMyTrips">My trips</span> page
          </h1>
        </div>
      </div>
      <!-- //////////// always on -->
      <!-- down trip + price-->

      <div class="reservation-details-container">
        <!-- trip -->
        <div class="trip-details-container flex flex-column">
          <h1 class="reservation-details-title">Reservation details</h1>
          <span class="mini-trip-title">Trip dates:</span>
          <h1 class="mini-trip-detail">
            {{ getFormatedDate(0) }} - {{ getFormatedDate(1) }}
          </h1>
          <span class="mini-trip-title">Guests:</span>
          <h1 class="mini-trip-detail">
            {{ getGuestsForDisplay }}
          </h1>
          <!-- price -->
          <div class="price-details-container flex flex-column">
            <h1 class="mini-trip-title">Price Details</h1>
            <div class="price-per-night flex space-between">
              <h1 class="mini-trip-detail">{{ getCheckDetails }}</h1>
              <!-- <span class="mini-trip-title">Total price:</span> -->
              <h1 class="mini-trip-detail">${{ getTotalPrice }}</h1>
            </div>
            <div class="service flex space-between">
              <h1 class="mini-trip-detail">Service fee</h1>
              <h1 class="mini-trip-detail">$0</h1>
            </div>
            <div class="total-price flex space-between">
              <h1 class="mini-trip-detail">Total</h1>
              <h1 class="mini-trip-detail">${{ getTotalPrice }}</h1>
            </div>
          </div>
        </div>
        <!-- pic -->
        <div class="order-stay-details flex flex-column">
          <img class="order-stay-image" :src="getImageUrl" alt="host" />
          <h1 class="stay-detail">{{ stay.name }}</h1>
          <h1 class="stay-detail">{{ stay.address.street }}</h1>
        </div>
      </div>
      <!--Btns  -->
      <div class="modal-btns-container">
        <magic-button
          v-if="!isConfirmed"
          class="sign-up-continue confirm"
          @click="confirm"
          >Confirm
        </magic-button>
        <div
          v-if="!isConfirmed"
          class="sign-up-continue go-back"
          @click="closeModal"
        >
          Back
        </div>
        <div
          v-if="isConfirmed"
          class="sign-up-continue go-back"
          @click="closeModalAndClean"
        >
          Close
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import magicButton from "../magic-button.vue";
export default {
  name: "order-confirmation-modal",
  components: {
    magicButton,
  },
  props: {
    stay: {
      type: Object,
      reqired: true,
    },
    dates: {
      type: Array,
      reqired: true,
    },
    guests: {
      type: Object,
      reqired: true,
    },
    user: {
      type: Object,
      reqired: true,
    },
  },
  data() {
    return {
      isConfirmed: false,
    };
  },
  methods: {
    async confirm() {
      this.isConfirmed = true;
      const startDate = this.getTimeStampDate(0);
      const endDate = this.getTimeStampDate(1);
      const totalPrice = this.getTotalPrice;
      const order = {
        startDate,
        endDate,
        guests: this.guests,
        status: "pending",
        totalPrice,
        hostId: this.stay.host._id,
        stay: {
          name: this.stay.name,
          price: this.stay.price,
          _id: this.stay._id,
        },
        buyer: {
          _id: this.user._id,
          fullname: this.user.fullname,
        },
      };
      this.$emit("addOrder", order);
    },
    getTimeStampDate(num) {
      const arrayDates = JSON.parse(JSON.stringify(this.dates));

      return arrayDates[num];
    },
    getFormatedDate(num) {
      const arrayDates = JSON.parse(JSON.stringify(this.dates));

      const dates = new Date(arrayDates[num]);

      return `${
        dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate()
      }/${
        dates.getMonth() < 9
          ? "0" + (dates.getMonth() + 1)
          : dates.getMonth() + 1
      }/${dates.getFullYear().toString().substring(2)}`;
    },
    goToMyTrips() {
      this.isConfirmed = false;
      this.$emit("closeModal");
      this.$emit("goToMyTrips");
    },

    closeModal() {
      this.isConfirmed = false;
      this.$emit("closeModal");
    },
    closeModalAndClean() {
      this.$store.commit({ type: "clearOrderingDetails" });
      this.isConfirmed = false;
      this.$emit("closeModal");
      this.$router.push("/");
    },
  },
  computed: {
    getCheckDetails() {
      const dates = this.dates;
      const price = this.stay.price;
      const nights = Math.round((dates[1] - dates[0]) / (24 * 60 * 60 * 1000));
      const totalPrice = price * nights;
      this.total = `$${totalPrice}`;
      this.$store.commit({ type: "setTotalPrice", totalPrice });
      return `$${price} x ${nights} nights`;
    },
    getImageUrl() {
      const imgUrl = new URL(
        `../../assets/images/${this.stay.imgUrls[0]}`,
        import.meta.url
      );
      return imgUrl;
    },
    displayConfirmation() {
      return this.stay && this.dates && this.user ? true : false;
    },
    getTotalPrice() {
      const total = this.$store.getters.getTotalPrice;
      return total;
    },
    getUserFirstName() {
      return this.user.fullname.split(" ")[0];
    },
    getGuestsForDisplay() {
      const { adults } = this.guests;
      const { children } = this.guests;
      if (!(children + adults)) return "Add guests";
      if (!children) {
        if (adults === 1) return "1 adult";
        return `${adults} adults`;
      }
      if (children === 1) {
        if (adults === 1) return "1 adult, 1 child";
        return `${adults} adults, 1 child`;
      }
      if (adults === 1) return `1 adult, ${children} children`;
      return `${adults} adults, ${children} children`;
    },
    getLocation() {
      return this.$store.getters.getLocation;
    },
    getDates() {
      return this.$store.getters.getDates;
    },
  },
};
</script>
