<template>
  <section class="dashboard-stats main-layout-homepage">
    <div>
      <awesome-chart v-if="testData" :data="testData" />
    </div>
    <div class="stats-card">
      <h1>Total revenue</h1>
      <div class="details">
        <div class="rev-stat">
          <span class="stat-head">This month</span>
          <span>{{ thisMonthRenevue }}</span>
        </div>
        <div class="rev-stat">
          <span class="stat-head">This year</span>
          <span>{{ thisYearRenevue }}</span>
        </div>
        <div class="rev-stat">
          <span class="stat-head">Total summary</span>
          <span>{{ formattedRevenue }}</span>
        </div>
      </div>
    </div>
    <div class="stats-card">
      <h1>Orders management</h1>
      <div class="details">
        <div class="rev-stat">
          <span class="stat-head">Cancelations</span>
          <span>{{ cancelations }}</span>
        </div>
        <div class="rev-stat">
          <span class="stat-head">Total price average</span>
          <span>{{ totalPriceAverage }}</span>
        </div>
        <div class="rev-stat">
          <span class="stat-head">Pending now</span>
          <span>{{ pendingCount }} orders</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import awesomeChart from "./awesome-chart.vue";

export default {
  name: "order-list",
  emits: ["updateStatus"],
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      testData: null,
      totalRevenue: 0,
    };
  },

  created() {
    const orders = this.orders.filter((order) => order.status === "approved");
    const revenue = orders.reduce((acc, order) => {
      return acc + order.totalPrice;
    }, 0);
    this.totalRevenue = revenue;

    let testData = {
      labels: ["1-3 nights", "4-6 nights", "+7 nights"],
      datasets: [
        {
          data: [],
          backgroundColor: ["#ff385c", "#0059AF", "#129E6B"],
        },
      ],
    };
    //1-3 nights
    let nightsDetails = orders.filter((order) => {
      const nights = order.totalPrice / order.stay.price;
      return nights <= 3;
    }).length;
    testData.datasets[0].data.push(nightsDetails);
    nightsDetails = orders.filter((order) => {
      const nights = order.totalPrice / order.stay.price;
      return nights >= 4 && nights <= 6;
    }).length;
    testData.datasets[0].data.push(nightsDetails);
    nightsDetails = orders.filter((order) => {
      const nights = order.totalPrice / order.stay.price;
      return nights >= 7;
    }).length;
    testData.datasets[0].data.push(nightsDetails);

    this.testData = testData;
  },

  computed: {
    pendingCount() {
      const orders = this.orders;
      return orders.filter((order) => order.status === "pending").length;
    },
    totalPriceAverage() {
      const orders = this.orders.filter((order) => order.status === "approved");
      const totalPrices = this.totalRevenue;

      return this.getFormatedPrice(totalPrices / orders.length);
    },
    cancelations() {
      const orders = this.orders;
      const canceledOrders = orders.filter(
        (order) => order.status === "canceled"
      );

      return ((canceledOrders.length / orders.length) * 100).toFixed(1) + "%";
    },
    formattedRevenue() {
      return this.getFormatedPrice(this.totalRevenue);
    },
    thisYearRenevue() {
      const orders = this.orders.filter((order) => order.status === "approved");
      const thisYear = new Date().getFullYear();
      const revenue = orders
        .filter((order) => {
          const year = new Date(order.createdAt).getFullYear();
          return year === thisYear;
        })
        .reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);

      return this.getFormatedPrice(revenue);
    },

    thisMonthRenevue() {
      const orders = this.orders.filter((order) => order.status === "approved");
      const thisMonth = new Date().getMonth() + 1;
      const revenue = orders
        .filter((order) => {
          const month = new Date(order.createdAt).getMonth() + 1;

          return month === thisMonth;
        })
        .reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);

      return this.getFormatedPrice(revenue);
    },
  },

  methods: {
    getFormatedPrice(price) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
      return formatter.format(price);
    },
  },

  components: {
    awesomeChart,
  },
};
</script>
