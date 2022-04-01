<template>
  <section class="order-confirmation-modal">
    <div class="order-confirmation-container">
      <div v-if="isConfirmed" class="confirmed-container">
        <div class="confirm-secondary-title">
          <h1 class="confirm-text congrats">Congratulations!</h1>
        </div>

        <h1 class="confirm-text">Your order has been received</h1>
        <h1 class="confirm-text">We will let you know when the host responds</h1>
        <h1 class="confirm-text">
          You can follow the order status in
          <span @click="goToMyTrips">My trips</span> page
        </h1>
      </div>
      <div v-if="displayConfirmation" class="confirmation-details">
        <p class="confirm-title">One last step</p>
        <div class="confirm-secondary-title">
          <h1 class="confirm-text">Dear {{ getUserFirstName }},</h1>
          <h1 class="confirm-text">
            In orer to complete your reservation, please confirm your trip
            details
          </h1>
        </div>
        <div class="trip-details">
          <div class="stay-user-details">
            <h1 class="confirm-text">Stay name: {{ stay.name }}</h1>
            <h1 class="confirm-text">{{ stay.address.city }}, {{ stay.address.country }}</h1>
            <h1 class="confirm-text">Check in: {{ getFormatedDate(0) }}</h1>
            <h1 class="confirm-text">
              Check out:
              {{ getFormatedDate(1) }}
            </h1>
            <h1 class="confirm-text">{{ getGuestsForDisplay }}</h1>
            <h1 class="confirm-text">Total: ${{ getTotalPrice }}</h1>
          </div>
          <div class="host-details">
            <img
              class="host-image"
              :src="stay.host.thumbnailUrl"
              alt="host"
              onerror="this.onerror=null; this.src='https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png'"
            />
            <h1 class="host-name">{{ stay.host.fullname }}</h1>
          </div>
        </div>
      </div>
      <div class="modal-btns-container">
        <div v-if="!isConfirmed" class="sign-up-continue" @click="confirm">Confirm</div>
        <div v-if="!isConfirmed" class="sign-up-continue go-back" @click="closeModal">Go back</div>
        <div v-if="isConfirmed" class="sign-up-continue" @click="closeModalAndClean">Close</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  //  :stay="stay"
  // :dates="getDates"
  // :guests="getGuests"
  // :user="getLoggedInUser"
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
      //Place the order in store, for fronend needs only
      // this.$store.commit({ type: "setOrder", order });
      console.log(order);
      this.$emit("addOrder", order);

      // *** Uncomment when order backend service implemented ***
      // await this.$store.commit({ type: "addOrder", order });
    },
    getTimeStampDate(num) {
      const arrayDates = JSON.parse(JSON.stringify(this.dates));

      return arrayDates[num];
    },
    getFormatedDate(num) {
      const arrayDates = JSON.parse(JSON.stringify(this.dates));

      const dates = new Date(arrayDates[num]);

      return `${dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate()
        }/${dates.getMonth() < 9
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
      this.$store.commit({ type: 'clearOrderingDetails' });
      this.isConfirmed = false;
      this.$emit("closeModal");
      this.$router.push('/')
    }
  },
  computed: {
    displayConfirmation() {
      return this.stay && this.dates && this.user && !this.isConfirmed
        ? true
        : false;
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
