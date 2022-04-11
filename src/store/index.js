import { createStore } from "vuex";
import stayStore from "./modules/stay-store";
import userStore from "./modules/user-store";
import orderStore from "./modules/order-store";

const store = createStore({
  strict: true,
  state: {
    isLoading: false,
    orderStatus: "",
    isShowingMessage: false,
    message: {},
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isShowingMessage(state) {
      return state.isShowingMessage;
    },
  },
  mutations: {
    showMessage(state, { message }) {
      state.message = message;
      state.isShowingMessage = true;
    },
    hideMessage(state) {
      state.isShowingMessage = false;
    },
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
