<template>
  <section class="stay-details-page" v-if="stay">
    <footer-hero-modal :stay="stay" v-if="stay" />
    <section class="stay-details" v-if="stay">
      <secondary-header @goToReviews="goToReviews" :stay="stay" />
      <images-container :stayImgs="stay.imgUrls" />
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
            <img :src="stay.host.thumbnailUrl" alt="Host picture" onerror="this.onerror=null; this.src='https://robohash.org/bla'"/>
            
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
        <hero-modal :stay="stay" />
      </section>
      <reviews-section :stay="stay" ref="reviews-section" />
      <map-section :address="stay.address" />
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

    }
  },
  async created() {
    const stayId = this.$route.params.stayId
    this.stay = await this.$store.dispatch({ type: 'getStayById', stayId: stayId })
    
  },

  // beforeUpdate(){
  //   if (window.innerWidth <= 700){
  //     this.isMobi
  //   }
  // },
  methods: {
    goToReviews(){

      let coords = this.$refs['reviews-section'].getBoundingClientRect().x;
      // console.log(coords)
    }
  },
  computed: {
  },
}
</script>
