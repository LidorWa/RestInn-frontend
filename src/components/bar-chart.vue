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
            columnWidth: "80%",
            distributed: false,
            columnColors: ["black"],
          },
        },

        xaxis: {
          categories: ["January", "February", "March", "April"],
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
      series[0].data[month] += order.totalPrice;
    });

    this.series = series;
  },
};

//  new Vue({
//       el: '#app',
//       components: {
//         apexchart: VueApexCharts,
//       },
//       data: {

//         series: [{
//           data: [21, 22, 10, 28, 16, 21, 13, 30]
//         }],
//         chartOptions: {
//           chart: {
//             height: 350,
//             type: 'bar',
//             events: {
//               click: function(chart, w, e) {
//                 // console.log(chart, w, e)
//               }
//             }
//           },
//           colors: colors,
//           plotOptions: {
//             bar: {
//               columnWidth: '45%',
//               distributed: true,
//             }
//           },
//           dataLabels: {
//             enabled: false
//           },
//           legend: {
//             show: false
//           },
//           xaxis: {
//             categories: [
//               ['John', 'Doe'],
//               ['Joe', 'Smith'],
//               ['Jake', 'Williams'],
//               'Amber',
//               ['Peter', 'Brown'],
//               ['Mary', 'Evans'],
//               ['David', 'Wilson'],
//               ['Lily', 'Roberts'],
//             ],
//             labels: {
//               style: {
//                 colors: colors,
//                 fontSize: '12px'
//               }
//             }
//           }
//         },

//       },
</script>
