<template>
  <div class="explore-filter">
    <!-- Price range -->
    <div class="explore-filter-item">
      <span>Price</span>
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
      isTypeSelected: false,
      value: "",
      filterBy: {
        price: {
          min: 0,
          max: 700,
        },
        type: "",
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
