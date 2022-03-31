import { createStore } from "vuex";
import stayStore from "./modules/stay-store";
import userStore from "./modules/user-store";
import orderStore from "./modules/order-store";

const store = createStore({
  strict: true,
  state: {
    isLoading: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
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
