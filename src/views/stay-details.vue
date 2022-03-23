<template>
  <section class="stay-details-page" v-if="stay">
    <section class="stay-details" v-if="stay">
      <div class="secondary-header">

        <div class="stay-name">
          <h1>{{ stay.name }}</h1>
        </div>

        <div class="below-stay-name">
          <div class="rating-reviews-location">
            <img class="star-rating-svg" src="../assets/svgs/star-rating.svg" />
            <span>{{ stay.reviewScores.rating / 20 }} </span>
            <span>·</span>
            <span>{{ stay.reviews.length }} reviews</span>
            <span class="dot-above-pictures">·</span>
            <span
              class="location-above-pictures"
            >{{ stay.address.city }}, {{ stay.address.country }}</span>
          </div>
          <div class="share-save">
            <div class="share">
              <img class="share-svg" src="../assets/svgs/share.svg" />
              <span>Share</span>
            </div>
            <div class="save-like">
              <img class="like-svg" src="../assets/svgs/like.svg" />
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
      <images-container :stayImgs="stay.imgUrls"></images-container> 
      <section class="hero-modal-and-general-info">
        <section class="general-info">
          <article class="type-host-and-stay-properties">
            <h2 class="stay-type-host-name">{{stay.propertyType}} hosted by {{stay.host.fullname}} </h2>
            <ul class="stay-properties">
              <li>{{stay.capacity}} guests</li>
              <li>{{stay.bedrooms}} bedroom</li>
              <li>{{stay.beds}} bed</li>
              <li>{{stay.bathrooms}} baths</li>
            </ul>
            <img :src="stay.host.thumbnailUrl">
          </article>
          <section class="selected-stay-features">
            <div>
              <!-- WHAT TO RENDER IN HERE? THE SECTION BENEATH THE TYPE OF THE STAY -->
            </div>
          </section>
          <section class="section-stay-summary">
            <p class="stay-summary">{{stay.summary}}</p>
          </section>
        </section>
        <section class="hero-modal">

        </section>
      </section>

      <!-- <h1>{{ $filters.currencyUSD(stay.price) }}</h1> -->
      <!-- <div v-if="reviews">
        <h1>Reviews</h1>
        <h3 v-for="review in reviews" :key="review._id">
          {{ review.content }}
          <br />
          <span
            >By
            <router-link
              v-if="review.user?._id"
              :to="'/user/' + review.user?._id"
              >{{ review.user?.username }}</router-link
            >
          </span>
          <button @click="removeReview(review._id)">❌</button>
        </h3>
      </div>-->
    </section>
    <!-- <section class="add-review">
      <button v-if="!isAdding" @click="isAdding = true">Add review</button>
      <form v-else @submit.prevent="addReview">
        <input type="text" v-model="reviewToAdd.content" />
        <button>Save</button>
        <button @click="closeForm">Cancel</button>
      </form>
    </section>-->
  </section>
</template>

<script>
import { stayService } from "../services/stay-service";
import imagesContainer from '../components/stay-details-cmps/images-container.vue'

// _id: 307,
// name: "velit in",
// price: 98,
// type: "Funny",
// createdAt: "1984-12-18T07:34:17.814Z",
// inStock: true,

export default {
  name: "stay-details",
  data() {
    return {
      isAdding: false,
      //   loggedinUser: userService.getLoggedinUser(),
      reviewToAdd: {
        content: "",
        userId: "",
        stayId: "",
      },
      stay: null,
    };
  },
  components: {
    imagesContainer
  },
  created() {
    const stayId = this.$route.params.stayId;
    // const stay = this.$store.dispatch({ type: "getStayById", stayId });
    this.stay = stayService.getById(stayId)


    //   const user = this.$store.getters.user;
    //   console.log(user);
    //   this.reviewToAdd.stayId = this.stay._id;
    //   this.reviewToAdd.userId = this.loggedinUser._id;
    //   await this.$store.dispatch({
    //     type: "getReviews",
    //     filterBy: { stayId: this.stay._id },
    //   });

    //   if (user) {
    //     this.reviewToAdd = await reviewService.getEmptyReview();
    //     this.reviewToAdd.userId = user._id;
    //     this.reviewToAdd.stayId = this.stay._id;
    //   }
    //   console.log(this.reviewToAdd);
    // } catch (err) {
    //   console.log("Error while getting ID: ", err);
    // }
  },
  methods: {
        getImgUrl(file) {
      const imgUrl = new URL(`../assets/images/${file}`, import.meta.url);
      return imgUrl;
    },
    // async addReview() {
    //   if (!this.reviewToAdd.content) return;
    //   await this.$store.dispatch({
    //     type: "addReview",
    //     review: this.reviewToAdd,
    //   });
    //   await this.$store.dispatch({
    //     type: "getReviews",
    //     filterBy: { stayId: this.stay._id },
    //   });
    // },
    // async removeReview(reviewId) {
    //   await this.$store.dispatch({ type: "removeReview", reviewId });
    //   await this.$store.dispatch({
    //     type: "getReviews",
    //     filterBy: { stayId: this.stay._id },
    //   });
    // },
    // onAddReview() {
    //   console.log(this.reviewToAdd);
    //   const stay = { ...this.stay };
    //   const review = { ...this.reviewToAdd };
    //   // stay.reviews.unshift(review);
    //   // this.$store.dispatch({ type: "saveStay", stay });
    //   this.closeForm();
    // },
    closeForm() {
      this.isAdding = false;
      this.reviewToAdd.content = "";
    },
  },
  computed: {
    hostThumbnail(){
      console.log(this.stay.host.thumbnailUrl)
      return new URL(this.stay.host.thumbnailUrl, import.meta.url);
    }
    // user() {
    //   return this.$store.getters.user;
    // },
    // reviews() {
    //   return this.$store.getters.reviews;
    // },
  },
};
</script>
