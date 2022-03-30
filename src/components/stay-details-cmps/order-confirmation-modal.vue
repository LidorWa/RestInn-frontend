<template>
  <section class="order-confirmation-modal">
    <div v-if="stay && dates && user" class="order-confirmation-container">
      <div>
        <p class="confirm-title">One last step</p>
        <div class="confirm-secondary-title">
          <h1 class="confirm-text">Dear {{ getUserFirstName }},</h1>
          <h1 class="confirm-text">In orer to complete your reservation, please confirm your trip details</h1>
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
            <h1 class="confirm-text">
              {{ getGuestsForDisplay }}
            </h1>
            <h1 class="confirm-text">Total: ${{ getTotalPrice }}</h1>
          </div>
          <div class="host-details">
            <img class="host-image" :src="stay.host.thumbnailUrl" alt="host" onerror="this.onerror=null; this.src='https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png'" />
            <h1 class="host-name">{{ stay.host.fullname }}</h1>
          </div>
        </div>
      </div>
      <div class="modal-btns-container">
        <div class="sign-up-continue" @click="confirm">Confirm</div>
        <div class="sign-up-continue" @click="closeModal">Go back</div>
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
    return {}
  },

  methods: {
    async confirm() {
      const startDate = this.getFormatedDate(0)
      const endDate = this.getFormatedDate(1)
      const totalPrice = this.getTotalPrice
      const order = {
        startDate,
        endDate,
        guests: this.guests,
        status: 'pending',
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
      }
      //Place the order in store, for fronend needs only
      // this.$store.commit({ type: "setOrder", order });
      console.log('confirm front', order)
      this.$emit('addOrder', order)

      // *** Uncomment when order backend service implemented ***
      // await this.$store.commit({ type: "addOrder", order });

      this.$emit('closeModal')
    },
    getFormatedDate(num) {
      const arrayDates = JSON.parse(JSON.stringify(this.dates))
      const dates = new Date(arrayDates[num])

      return `${dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate()}/${dates.getMonth() < 9 ? '0' + (dates.getMonth() + 1) : dates.getMonth() + 1}/${dates.getFullYear().toString().substring(2)}`
    },

    closeModal() {
      this.$emit('closeModal')
    },
  },
  computed: {
    getTotalPrice() {
      const total = this.$store.getters.getTotalPrice
      return total
    },
    getUserFirstName() {
      return this.user.fullname.split(' ')[0]
    },
    getGuestsForDisplay() {
      const { adults } = this.guests
      const { children } = this.guests
      if (!(children + adults)) return 'Add guests'
      if (!children) {
        if (adults === 1) return '1 adult'
        return `${adults} adults`
      }
      if (children === 1) {
        if (adults === 1) return '1 adult, 1 child'
        return `${adults} adults, 1 child`
      }
      if (adults === 1) return `1 adult, ${children} children`
      return `${adults} adults, ${children} children`
    },
    getLocation() {
      return this.$store.getters.getLocation
    },
    getDates() {
      return this.$store.getters.getDates
    },
  },
}
</script>
