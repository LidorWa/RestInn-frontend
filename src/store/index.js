import { createStore } from "vuex";
import stayStore from "./modules/stay-store";
import userStore from "./modules/user-store";
import orderStore from "./modules/order-store";

const store = createStore({
  strict: true,
  state: {
    isLoading: false,
    orderStatus: "",
  },
  getters: {
    getOrderStatus(state) {
      return state.orderStatus;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setOrderStatus(state, { status }) {
      state.orderStatus = status;
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
  },
  actions: {},
  modules: {
    stayStore,
    userStore,
    orderStore,
  },
});

export default store;
