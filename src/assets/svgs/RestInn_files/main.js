import { createApp } from "/node_modules/.vite/vue.js?v=f82ed364";
import App from "/src/App.vue";
import router from "/src/router/index.js";
import store from "/src/store/index.js";
import "/src/scss/styles.scss?t=1648125460835";
import "/node_modules/material-icons/iconfont/material-icons.css";
import ElementPlus from "/node_modules/.vite/element-plus.js?v=f82ed364";
import "/node_modules/element-plus/dist/index.css";

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

app.use(router);
app.use(store);
app.use(ElementPlus);

app.mount("#app");
