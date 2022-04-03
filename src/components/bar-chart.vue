<template>
  <apexchart
    v-if="series"
    width="280"
    height="170"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
          height: "400px",
        },
        fill: {
          colors: ["#ff385c", "#d90865", "#d90865"],
        },
        plotOptions: {
          bar: {
            columnWidth: "70%",
            distributed: false,
            columnColors: ["black"],
          },
        },

        xaxis: {
          categories: ["Jan", "Feb", "March", "April"],
          labels: {
            style: {
              colors: ["#222222"],
              fontSize: "13px",
            },
          },
        },
      },
      series: null,
    };
  },
  created() {
    const series = [
      {
        name: "revenue",
        data: [0, 0, 0, 0],
      },
    ];
    const orders = this.orders.filter((order) => order.status === "approved");
    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      if (month < 4) {
        series[0].data[month] += order.totalPrice;
      }
    });

    this.series = series;
  },
};
</script>
