<template>
  <div class="explore-filter">
    <!-- Select type -->
    <el-select
      v-model="filterBy.type"
      class="m-2"
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
  <p class="stays-count">{{ stays.length }} stays</p>
  <ul class="card-cont">
    <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
  </ul>
</template>

<script>
import stayPreview from "./stay-preview.vue";

export default {
  props: {
    stays: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filterBy: {
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
          value: "Option1",
          label: "Option1",
        },
      ],
    };
  },
  components: {
    stayPreview,
  },
  methods: {},
};
</script>
