<template>
  <div class="explore-filter">
    <!-- Price range -->
    <div class="price-and-type-filters-cont">
      <div
        class="explore-filter-item select-type-cont select-price flex align-center"
        :class="{ typeSelected: priceSelected }"
      >
        <span @click="togglePriceModal" class="flex align-center">
          <span class="type-span">Price</span>
          <span class="material-icons-outlined" v-if="!isPriceFiltering">
            arrow_drop_down
          </span>
          <span class="material-icons" v-if="isPriceFiltering">
            arrow_drop_up
          </span>
        </span>
        <!-- Price modal -->
        <div class="modal price-modal" v-if="isPriceFiltering">
          <span>{{ getPriceModalText }}</span>
          <el-slider
            class="price-range"
            v-model="filterBy.price"
            @input="setFilter"
            :min="min"
            :max="max"
            :show-input="true"
            range
          />
        </div>
      </div>

      <!-- Select type -->
      <div
        class="explore-filter-item select-type-cont"
        :class="{ typeSelected: isTypeSelected }"
      >
        <span class="flex align-center" @click="toggleTypeModal">
          <span class="type-span">Type of place</span
          ><span class="material-icons-outlined" v-if="!isTypeFiltering">
            arrow_drop_down
          </span>
          <span class="material-icons" v-if="isTypeFiltering">
            arrow_drop_up
          </span>
        </span>
        <!-- Type-modal -->
        <div
          :class="{ showTypeFilter: isTypeFiltering }"
          class="modal type-modal"
        >
          <div class="modal-container">
            <div v-for="type in options" :key="type" class="type-modal-line">
              <label class="line-container">
                <input
                  v-model="typeFromParams[type.title]"
                  type="checkbox"
                  @input="toggleType(type.title)"
                />
                <span class="checkmark"></span>
                <div class="line-text flex flex-column">
                  <span class="type-modal-type-title">{{ type.title }}</span>
                  <span class="type-modal-description">{{
                    type.description
                  }}</span>
                </div>
              </label>
            </div>
          </div>

          <div class="type-modal-btn btn-close" @click="toggleTypeModal">
            Close
          </div>
        </div>
      </div>
    </div>
    <!-- More amenities -->
    <div class="amenities-container">
      <div class="amenity-mini-container">
        <span
          class="amenity wifi"
          title="free WiFi connection"
          @click="toggleAmenity(`Wifi`)"
          :class="{ amenitySelected: isAmenityInFilter[`Wifi`] }"
        >
          WiFi
        </span>
        <span
          class="amenity"
          title="Pets alowed"
          @click="toggleAmenity(`Pets allowed`)"
          :class="{ amenitySelected: isAmenityInFilter[`Pets allowed`] }"
        >
          Pets allowed
        </span>
        <span
          class="amenity"
          title="Air conditioner"
          @click="toggleAmenity('Air conditioning')"
          :class="{ amenitySelected: isAmenityInFilter[`Air conditioning`] }"
        >
          A/C
        </span>
      </div>
      <div class="amenity-mini-container">
        <span
          class="amenity smoking"
          title="Smoking allowed"
          @click="toggleAmenity(`Smoking allowed`)"
          :class="{ amenitySelected: isAmenityInFilter[`Smoking allowed`] }"
        >
          Smoking allowed
        </span>

        <span
          class="amenity"
          title="Cable TV"
          @click="toggleAmenity('Cable TV')"
          :class="{ amenitySelected: isAmenityInFilter[`Cable TV`] }"
        >
          Cable TV
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stays: {
      type: Array,
      required: true,
    },

    filterByCity: {
      type: String,
    },

    filerByType: {
      type: Array,
    },
  },
  data() {
    return {
      typeFromParams: {
        Apartment: false,
        Loft: false,
        Villa: false,
        Cabin: false,
      },
      isPriceFiltering: false,
      isTypeFiltering: false,
      isTypeFromHomepage: false,
      min: 1,
      max: 1800,
      isAmenityInFilter: {
        "Pets allowed": false,
        Wifi: false,
        "Smoking allowed": false,
        "Air conditioning": false,
        "Cable TV": false,
      },
      isTypeSelected: false,
      isPriceSelected: false,

      filterBy: {
        price: [],
        type: [],
        city: "",
        amenities: [],
        guests: null,
      },
      options: [
        { title: "Apartment", description: "Have an entire place to yourself" },
        { title: "Loft", description: "Enjoy a space with elevated area" },
        { title: "Villa", description: "Have an impressive house to rest in" },
        {
          title: "Cabin",
          description: "Enjoy an adventure in a remote location",
        },
      ],
    };
  },
  created() {
    // console.log("Filter created!");
    const filterFromStore = this.$store.getters.getFilterFromStore;
    this.filterBy = filterFromStore;

    if (this.filterByCity) {
      this.filterBy.city = this.filterByCity;
    }

    if (this.filerByType) {
      this.filterBy.type = this.filerByType;
      this.typeFromParams[this.filterBy.type[0]] = true;
      // this.setFilter();
    }
    this.setFilter();
    // const stayPrices = this.stays.map((stay) => stay.price);
    // if (stayPrices.length === 1) return;
    // stayPrices.sort((a, b) => a - b);
    // this.min = stayPrices[0];
    // this.max = stayPrices[stayPrices.length - 1];
  },
  components: {},
  methods: {
    toggleType(type) {
      if (this.isTypeFromHomepage) return;
      if (!this.filterBy.type.includes(type)) {
        this.filterBy.type.push(type);
      } else {
        const idx = this.filterBy.type.findIndex((t) => t === type);
        this.filterBy.type.splice(idx, 1);
      }

      this.isTypeSelected = !!this.filterBy.type.length;

      this.setTypeFilter();
    },
    togglePriceModal() {
      this.isPriceFiltering = !this.isPriceFiltering;
      if (this.isPriceFiltering) this.isTypeFiltering = false;
    },
    toggleTypeModal() {
      this.isTypeFiltering = !this.isTypeFiltering;
      if (this.isTypeFiltering) this.isPriceFiltering = false;
    },
    setTypeFilter() {
      this.min = 1;
      this.max = 1800;

      this.setFilter();
    },
    setFilter() {
      const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));

      this.$emit("setFilter", filterByCopy);
    },
    toggleAmenity(currAmenity) {
      if (this.filterBy.amenities.includes(currAmenity)) {
        const idx = this.filterBy.amenities.findIndex(
          (amenity) => amenity === currAmenity
        );
        this.filterBy.amenities.splice(idx, 1);
      } else {
        this.filterBy.amenities.push(currAmenity);
      }
      this.isAmenityInFilter[currAmenity] =
        !this.isAmenityInFilter[currAmenity];
      this.setFilter();
    },
  },
  computed: {
    priceSelected() {
      return this.filterBy.price[0] > 1 || this.filterBy.price[1] < 1800;
    },
    getPriceModalText() {
      return `$${this.filterBy.price[0]} - $${this.filterBy.price[1]}`;
    },
    getTypeMenuTitle() {
      if (!this.filterBy.type.length) {
        this.isTypeSelected = false;
        return "Type of place";
      }
      this.isTypeSelected = true;
      return `${this.filterBy.type}`;
    },
  },
};
</script>
