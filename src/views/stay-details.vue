<template>
  <section class="stay-details-main-layout main-layout" v-if="stay">
    <section class="stay-details-page">
      <footer-hero-modal :stay="stay" v-if="stay" />
      <section class="stay-details" v-if="stay">
        <section class="mobile-secondary-header">
          <div class="back-home">
            <img src="../assets/svgs/back-home.svg" />
            <router-link to="/stay">Back</router-link>
          </div>
        </section>
        <section class="secondary-header-and-images-container">
          <secondary-header @goToReviews="goToReviews" @goToMap="goToMap" :stay="stay" />
          <images-container :stayImgs="stay.imgUrls" />
        </section>
        <section class="hero-modal-and-general-info">
          <section class="general-info">
            <section class="type-host-and-stay-properties">
              <section class="type-host-and-stay-properties-text">
                <h2
                  class="stay-type-host-name"
                >{{ stay.propertyType }} hosted by {{ stay.host.fullname }}</h2>
                <ul class="stay-properties">
                  <li>{{ stay.capacity }} guests</li>
                  <li>{{ stay.bedrooms }} bedroom</li>
                  <li>{{ stay.beds }} bed</li>
                  <li>{{ stay.bathrooms }} baths</li>
                </ul>
              </section>
              <img
                :src="stay.host.thumbnailUrl"
                alt="Host picture"
                onerror="this.onerror=null; this.src='https://thispersondoesnotexist.com/image'"
              />
            </section>
            <selected-popular-amenities :stay="stay" />

            <section class="section-stay-summary">
              <p class="stay-summary">{{ stay.summary }}</p>
              <div class="summary-show-more">
                <span>Show more</span>
                <img src="@/assets/svgs/show-more.svg" />
              </div>
            </section>
            <amenities-list />
          </section>
          <hero-modal
            ref="hero-modal"
            :stay="stay"
            :guestsFromStore="getGuests"
            @onCheckAvailability="onCheckAvailability"
          />
        </section>
        <reviews-section :stay="stay" ref="reviews-section" />
        <map-section :address="stay.address" ref="map-section" />
        <order-alert-modal
          v-if="isOrderAlert"
          @closeModal="closeAlertModal"
          :alertModalMessage="alertModalMessage"
        />
        <login-alert-modal
          v-if="isLoginAlert"
          @closeModal="closeLoginModal"
          @login="loginToProceed"
          @demo="demoToProceed"
        />
        <order-confirmation-modal
          :class="{ showConfirm: isOrdering && isLoggedIn }"
          :stay="stay"
          :dates="getDates"
          :guests="getGuests"
          :user="getLoggedInUser"
          @closeModal="closeConfirmationModal"
          @goToMyTrips="goToMyTrips"
          @addOrder="addOrder"
        />
        <div
          v-if="isOrderAlert || isLoginAlert || (isOrdering && isLoggedIn)"
          class="order-alert-overlay"
        ></div>
      </section>
    </section>
  </section>
</template>

<script>
import footerHeroModal from '../components/stay-details-cmps/footer-hero-modal.vue'
import imagesContainer from '../components/stay-details-cmps/images-container.vue'
import SecondaryHeader from '../components/stay-details-cmps/secondary-header.vue'
import SelectedPopularAmenities from '../components/stay-details-cmps/selected-popular-amenities.vue'
import AmenitiesList from '../components/stay-details-cmps/amenities-list.vue'
import reviewsSection from '../components/stay-details-cmps/reviews-section.vue'
import heroModal from '../components/stay-details-cmps/hero-modal.vue'
import mapSection from '../components/stay-details-cmps/map-section.vue'
import orderAlertModal from '../components/stay-details-cmps/order-alert-modal.vue'
import loginAlertModal from '../components/stay-details-cmps/login-alert-modal.vue'
import orderConfirmationModal from '../components/stay-details-cmps/order-confirmation-modal.vue'
import { socketService } from "../services/socket-service";
export default {
  name: 'stay-details',
  components: {
    imagesContainer,
    SecondaryHeader,
    SelectedPopularAmenities,
    AmenitiesList,
    reviewsSection,
    mapSection,
    heroModal,
    footerHeroModal,
    orderAlertModal,
    loginAlertModal,
    orderConfirmationModal,
  },
  data() {
    return {
      // isAdding: false,
      // reviewToAdd: {
      //   content: '',
      //   userId: '',
      //   stayId: '',
      // },
      isMobile: false,
      stay: null,
      isOrderAlert: false,
      isLoginAlert: false,
      alertModalMessage: '',
      currOrder: null,
      isOrdering: false,
      isConfirm: false,
    }
  },
  async created() {
    const stayId = this.$route.params.stayId
    this.stay = await this.$store.dispatch({
      type: 'getStayById',
      stayId: stayId,
    })
  },

  methods: {
    addOrder(order) {
      socketService.emit('new order', order)
      this.$store.dispatch({ type: 'addOrder', order })
    },
    loginToProceed() {
      this.isLoginAlert = false
      this.$store.commit({ type: 'openSignUpModal' })
    },
    demoToProceed() {
      this.isLoginAlert = false
      this.isOrdering = true
    },
    closeLoginModal() {
      this.isLoginAlert = false
    },

    closeAlertModal() {
      this.isOrderAlert = false
    },
    goToMyTrips() {
      this.isOrdering = false
      this.$router.push('/mytrips')
    },
    closeConfirmationModal() {
      this.isOrdering = false
    },
    openAlertModal(message) {
      this.alertModalMessage = message
      this.isOrderAlert = false
    },
    onCheckAvailability() {
      this.isOrdering = true
      const dates = this.getDates
      const guests = this.getGuests
      if (!dates) {
        this.$refs['hero-modal'].$refs['modal-date-picker'].focus();
        this.isOrdering = false

        return
      }
      if (guests.adults + guests.children > this.stay.capacity) {
        this.alertModalMessage = `Select up to ${this.stay.capacity} to proceed`
        this.isOrdering = false
        this.isOrderAlert = true
        return
      }

      const user = this.$store.getters.getLoggedInUser
      if (!user) {
        this.isLoginAlert = true
        return
      }
    },
    goToReviews() {
      let el = this.$refs['reviews-section'].$el

      let top = el.offsetTop
      window.scrollTo({ top: top - 10, left: 0, behavior: 'smooth' })
    },
    goToMap() {
      let el = this.$refs['map-section'].$el

      let top = el.offsetTop
      window.scrollTo({ top: top - 10, left: 0, behavior: 'smooth' })
    },
  },
  computed: {
    getDates() {
      return this.$store.getters.getDates
    },
    getGuests() {
      return this.$store.getters.getGuests
    },
    isLoggedIn() {
      const user = this.$store.getters.getLoggedInUser
      return user ? true : false
    },
    getLoggedInUser() {
      return this.$store.getters.getLoggedInUser
    },
  },
  unmounted() {
    this.isOrdering = false
  },
}
</script>
