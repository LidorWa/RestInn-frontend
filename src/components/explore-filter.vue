<template>
  <div class="explore-filter">
    <!-- Price range -->
    <div class="explore-filter-item">
      <span>Price range</span>
      <el-slider
        class="price-range"
        v-model="filterBy.price"
        @change="setFilter"
        :min="10"
        :max="700"
        :show-input="true"
        range
      />
    </div>
    <!-- Select type -->
    <div
      class="explore-filter-item select-type-cont"
      :class="{ typeSelected: isTypeSelected }"
    >
      <span class="flex align-center">
        <span class="type-span">{{ getTypeMenuTitle }}</span
        ><span class="material-icons-outlined"> arrow_drop_down </span>
      </span>
      <el-select
        v-model="filterBy.type"
        @change="setFilter"
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
      </el-select>
    </div>
    <!-- More amenities -->
    <span
      class="material-icons-outlined amenity-icon"
      title="free WiFi connection"
      @click="toggleAmenity(`WiFi`)"
      :class="{ amenitySelected: isAmenityInFilter[`WiFi`] }"
    >
      wifi
    </span>
    <span
      class="material-icons-outlined amenity-icon"
      title="Pets alowed"
      @click="toggleAmenity(`Pets allowed`)"
      :class="{ amenitySelected: isAmenityInFilter[`Pets allowed`] }"
    >
      pets
    </span>
    <span
      class="material-icons amenity-icon"
      title="Smoking allowed"
      @click="toggleAmenity(`Smoking allowed`)"
      :class="{ amenitySelected: isAmenityInFilter[`Smoking allowed`] }"
    >
      smoking_rooms
    </span>
    <span
      class="material-icons amenity-icon"
      title="Air conditioner"
      @click="toggleAmenity('Air conditioning')"
      :class="{ amenitySelected: isAmenityInFilter[`Air conditioning`] }"
    >
      ac_unit
    </span>
    <span
      class="material-icons-outlined amenity-icon"
      title="Cable TV"
      @click="toggleAmenity('Cable TV')"
      :class="{ amenitySelected: isAmenityInFilter[`Cable TV`] }"
    >
      tv
    </span>
  </div>
</template>

<script>
export default {
  props: {
    stays: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isAmenityInFilter: {
        "Pets allowed": false,
        WiFi: false,
        "Smoking allowed": false,
        "Air conditioning": false,
        "Cable TV": false,
      },
      isTypeSelected: false,
      value: "",
      filterBy: {
        price: {
          min: 0,
          max: 700,
        },
        type: "",
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
          value: "Cabin",
          label: "Cabin",
        },
      ],
    };
  },
  components: {},
  methods: {
    setFilter() {
      console.log(this.filterBy);
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
      console.log(this.isAmenityInFilter);
    },
  },
  computed: {
    getTypeMenuTitle() {
      if (!this.filterBy.type) {
        this.isTypeSelected = false;
        return "Type";
      }
      this.isTypeSelected = true;
      return `${this.filterBy.type}`;
    },
  },
};
</script>
