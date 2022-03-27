<template>
  <div class="explore-filter">
    <!-- Price range -->
    <div class="price-and-type-filters-cont">
      <div
        class="explore-filter-item select-type-cont select-price flex align-center"
      >
        <span @click="togglePriceModal" class="flex align-center">
          <span>Price</span>
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
          <span class="type-span">{{ getTypeMenuTitle }}</span
          ><span class="material-icons-outlined" v-if="!isTypeFiltering">
            arrow_drop_down
          </span>
          <span class="material-icons" v-if="isTypeFiltering">
            arrow_drop_up
          </span>
        </span>
        <!-- Type-modal -->
        <div v-if="isTypeFiltering" class="modal type-modal">
          <div class="type-modal-line">
            <input type="checkbox" />
            <div class="flex flex-column">
              <span class="type-modal-type-title">Apartment</span>
              <span class="type-modal-description"
                >enjoy living in a shared community without the hassle of
                maintaining upkeep</span
              >
            </div>
          </div>
          <div class="type-modal-line">
            <input type="checkbox" />
            <div class="flex flex-column">
              <span class="type-modal-type-title">Loft</span>
              <span class="type-modal-description"
                >enjoy living in a shared community without the hassle of
                maintaining upkeep</span
              >
            </div>
          </div>
          <div class="type-modal-line">
            <input type="checkbox" />
            <div class="flex flex-column">
              <span class="type-modal-type-title">Villa</span>
              <span class="type-modal-description"
                >enjoy living in a shared community without the hassle of
                maintaining upkeep</span
              >
            </div>
          </div>
          <div class="type-modal-line">
            <input type="checkbox" />
            <div class="flex flex-column">
              <span class="type-modal-type-title">Condominium</span>
              <span class="type-modal-description"
                >enjoy living in a shared community without the hassle of
                maintaining upkeep</span
              >
            </div>
          </div>
          <div class="type-modal-btns-container">
            <div class="type-modal-btn btn-clear">Clear</div>
            <div class="type-modal-btn btn-save">Save</div>
          </div>
        </div>
        <!-- <el-select
          v-model="filterBy.type"
          @change="setTypeFilter"
          class="m-2 type-select"
          placeholder="Type"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
      </div>
    </div>
    <!-- More amenities -->
    <div class="amenities-container">
      <div class="amenity-mini-container">
        <span
          class="amenity"
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
          class="amenity"
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
    filerByCity: {
      type: String,
    },
    filerByType: {
      type: String,
    },
  },
  data() {
    return {
      isPriceFiltering: false,
      isTypeFiltering: true,
      min: 1,
      max: 1751,
      isAmenityInFilter: {
        "Pets allowed": false,
        Wifi: false,
        "Smoking allowed": false,
        "Air conditioning": false,
        "Cable TV": false,
      },
      isTypeSelected: false,

      filterBy: {
        price: [10, 1751],
        type: "",
        city: "",
        amenities: [],
      },
      options: [
        {
          value: "",
          label: "All",
        },
        {
          value: "Apartment",
          label: "Apartment",
        },
        {
          value: "Serviced apartment",
          label: "Serviced apartment",
        },
        {
          value: "Loft",
          label: "Loft",
        },
        {
          value: "Condominium",
          label: "Condominium",
        },
        {
          value: "Villa",
          label: "Villa",
        },
        {
          value: "Cabin",
          label: "Cabin",
        },
      ],
    };
  },
  created() {
    this.filterBy.city = this.filerByCity;
    this.filterBy.type = this.filerByType;
    const stayPrices = this.stays.map((stay) => stay.price);
    if (stayPrices.length === 1) return;
    stayPrices.sort((a, b) => a - b);
    this.min = stayPrices[0];
    this.max = stayPrices[stayPrices.length - 1];
  },
  components: {},
  methods: {
    togglePriceModal() {
      this.isPriceFiltering = !this.isPriceFiltering;
      if (this.isPriceFiltering) this.isTypeFiltering = false;
    },
    toggleTypeModal() {
      this.isTypeFiltering = !this.isTypeFiltering;
      if (this.isTypeFiltering) this.isPriceFiltering = false;
    },
    setTypeFilter() {
      this.min = 10;
      this.max = 1751;
      console.log(this.filterBy);
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
    getPriceModalText() {
      return `$${this.filterBy.price[0]} - $${this.filterBy.price[1]}`;
    },
    getTypeMenuTitle() {
      if (!this.filterBy.type) {
        this.isTypeSelected = false;
        return "Type of place";
      }
      this.isTypeSelected = true;
      return `${this.filterBy.type}`;
    },
  },
};
</script>
