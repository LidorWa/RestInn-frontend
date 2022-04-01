<template>
  <div style="{responsive: true">
    <PieChart :styles="myStyles" class="nights-chart" :chartData="data" />
    <!-- <PieChart :styles="myStyles" :chartData="data" /> -->
  </div>
</template>

<script>
import { PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

PieChart.title = false;
Chart.register(...registerables);

export default {
  name: "Home",
  props: {
    data: {
      type: Object,
      requires: true,
    },
  },
  components: { PieChart },
  data() {
    return {};
  },
  computed: {
    myStyles() {
      return {
        position: "relative",
        color: "blue",
      };
    },
  },
};
</script>
