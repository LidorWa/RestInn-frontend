<template>
  <section v-if="stays" class="app-page">
    <stay-filter />
    <explore-filter
      :stays="staysForDisplay"
      :filerByCity="filterBy.city"
      :filerByType="filterBy.type"
      @setFilter="setFilter"
    />
    <stay-list :stays="staysForDisplay" />
  </section>
</template>

<script>
import stayList from "../components/stay-list.vue";
import stayFilter from "../components/stay-filter.vue";
import exploreFilter from "../components/explore-filter.vue";
import { compileStyle } from "vue/compiler-sfc";

export default {
  name: "stay-app",
  data() {
    return {
      stays: null,
      filterBy: {
        price: [1, 3000],
        type: "",
        city: "",
        amenities: [],
      },
    };
  },
  created() {
    const stays = this.$store.getters.getStays;
    this.stays = stays;
    const city = this.$route.query.destination;
    if (city) {
      this.filterBy.city = city;
    }
    const type = this.$route.query.type;
    if (type) {
      console.log("type from params:", type);
      this.filterBy.type = type;
    }
  },
  computed: {
    staysForDisplay() {
      let stays = JSON.parse(JSON.stringify(this.stays));

      if (this.filterBy.type) {
        stays = stays.filter(
          (stay) => stay.propertyType === this.filterBy.type
        );
      }

      stays = stays.filter(
        (stay) =>
          stay.price >= this.filterBy.price[0] &&
          stay.price <= this.filterBy.price[1]
      );

      if (this.filterBy.amenities.length) {
        stays = stays.filter((stay) =>
          this.filterBy.amenities.every((amenity) =>
            stay.amenities.includes(amenity)
          )
        );
      }

      if (this.filterBy.city) {
        let city;
        if (this.filterBy.city.includes("$")) {
          city = this.filterBy.city
            .split("$")
            .map(
              (word) =>
                (word = word.charAt(0).toUpperCase() + word.substring(1))
            )
            .join(" ");
        } else {
          city = this.filterBy.city;
        }

        stays = stays.filter((stay) => stay.address.city === city);
      }

      return stays;
    },
  },

  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },

  components: {
    stayList,
    exploreFilter,
    stayFilter,
    // stayFilter,
    // addStay,
  },
};
</script>
