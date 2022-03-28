<template>
  <section class="stay-details-main-layout" v-if="stay">
    <section class="stay-details-page">
      <footer-hero-modal :stay="stay" v-if="stay" />
      <section class="stay-details" v-if="stay">
        <secondary-header @goToReviews="goToReviews" :stay="stay" />
        <images-container :stayImgs="stay.imgUrls" />
        <section class="hero-modal-and-general-info">
          <section class="general-info">
            <section class="type-host-and-stay-properties">
              <section class="type-host-and-stay-properties-text">
                <h2 class="stay-type-host-name">
                  {{ stay.propertyType }} hosted by {{ stay.host.fullname }}
                </h2>
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
                onerror="this.onerror=null; this.src='https://robohash.org/bla'"
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

            <!-- TODO: HERE SHOULD COME THE CALENDAR -->

            <!-- TODO: TO CHECK - HERE BENEATH THE MAP SHOULD BE SECTION WITH DETAILS ABOUT THE HOST.
            TODO IT? IN KUMBA THEY DIDNT-->
            <!-- TODO: TO CHECK - HERE BENEATH THE DETAILS ABOUT THE HOST SHOULD BE SECTION 
        WITH THINGS TO KNOW.
            TODO IT? IN KUMBA THEY DIDNT-->
          </section>
          <hero-modal
            :stay="stay"
            :guestsFromStore="getGuests"
            @onCheckAvailability="onCheckAvailability"
          />
        </section>
        <reviews-section :stay="stay" ref="reviews-section" />
        <map-section :address="stay.address" />
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
import footerHeroModal from "../components/stay-details-cmps/footer-hero-modal.vue";
import imagesContainer from "../components/stay-details-cmps/images-container.vue";
import SecondaryHeader from "../components/stay-details-cmps/secondary-header.vue";
import SelectedPopularAmenities from "../components/stay-details-cmps/selected-popular-amenities.vue";
import AmenitiesList from "../components/stay-details-cmps/amenities-list.vue";
import reviewsSection from "../components/stay-details-cmps/reviews-section.vue";
import heroModal from "../components/stay-details-cmps/hero-modal.vue";
import mapSection from "../components/stay-details-cmps/map-section.vue";
import orderAlertModal from "../components/stay-details-cmps/order-alert-modal.vue";
import loginAlertModal from "../components/stay-details-cmps/login-alert-modal.vue";
import orderConfirmationModal from "../components/stay-details-cmps/order-confirmation-modal.vue";

export default {
  name: "stay-details",
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
      stay: null,
      isOrderAlert: false,
      isLoginAlert: false,
      alertModalMessage: "",
      currOrder: null,
      isOrdering: false,
      isConfirm: false,
    };
  },
  async created() {
    const stayId = this.$route.params.stayId;
    this.stay = await this.$store.dispatch({
      type: "getStayById",
      stayId: stayId,
    });
  },

  // beforeUpdate(){
  //   if (window.innerWidth <= 700){
  //     this.isMobi
  //   }
  // },
  // Please select dates to proceed

  methods: {
    loginToProceed() {
      this.isLoginAlert = false;
      this.$store.commit({ type: "openSignUpModal" });
      console.log("loginToProceed");
    },
    demoToProceed() {
      this.isLoginAlert = false;
      this.isOrdering = true;
      console.log("demo to proceed");
    },
    closeLoginModal() {
      this.isLoginAlert = false;
    },

    closeAlertModal() {
      this.isOrderAlert = false;
    },
    closeConfirmationModal() {
      this.isOrdering = false;
    },
    openAlertModal(message) {
      this.alertModalMessage = message;
      this.isOrderAlert = false;
    },
    onCheckAvailability() {
      this.isOrdering = true;
      const dates = this.getDates;
      const guests = this.getGuests;
      console.log(guests);
      if (!dates) {
        this.alertModalMessage = "Select dates to proceed";
        this.isOrdering = false;
        this.isOrderAlert = true;
        return;
      }
      if (guests.adults + guests.children > this.stay.capacity) {
        this.alertModalMessage = `Select up to ${this.stay.capacity} to proceed`;
        this.isOrdering = false;
        this.isOrderAlert = true;
        return;
      }

      const user = this.$store.getters.getLoggedInUser;
      if (!user) {
        this.isLoginAlert = true;
        return;
      }

      console.log("order!!!");
      // console.log("dates: ", dates);
      // console.log("guests: ", guests);
      // console.log("user: ", user);
      // console.log("stay: ", this.stay);
    },
    goToReviews() {
      let coords = this.$refs["reviews-section"].getBoundingClientRect().x;
      // console.log(coords)
    },
  },
  computed: {
    getDates() {
      return this.$store.getters.getDates;
    },
    getGuests() {
      return this.$store.getters.getGuests;
    },
    isLoggedIn() {
      const user = this.$store.getters.getLoggedInUser;
      return user ? true : false;
    },
    getLoggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },
  },
  unmounted() {
    this.isOrdering = false;
  },
};
</script>
