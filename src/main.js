import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import "./scss/styles.scss";
import { focusDirective } from "./directives";
import "material-icons/iconfont/material-icons.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    return "$" + amount;
  },
  getDateForDisplay(time) {
    const now = new Date();
    const date = new Date(time);
    const dayOfWeek = now.getDay();
    const dayOfAct = date.getDay();
    const timePassed = now - date;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (timePassed < 1000 * 60)
      return `${(timePassed / 1000).toFixed(0)} seconds ago `;
    if (timePassed < 1000 * 60 * 60)
      return `${(timePassed / (1000 * 60)).toFixed(0)} minutes ago `;

    if (timePassed < 1000 * 60 * 60 * 24 && dayOfWeek === dayOfAct)
      return `Today, ${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } `;

    if (
      timePassed < 1000 * 60 * 60 * 24 * 2 &&
      (Math.abs(dayOfWeek - dayOfAct) === 1 ||
        Math.abs(dayOfWeek - dayOfAct) === 6)
    )
      return `Yesterday, ${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } `;

    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    },  ${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } `;
  },
};

app.directive("focus", focusDirective);

app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAcZWoRl-gITKbAK7tl0NjQ8nJkMb5tF40",
  },
});
app.use(VueApexCharts);

app.mount("#app");
