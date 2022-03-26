import { stayService } from "../../services/stay-service.js";

export default {
  state: {
    location: "",
    dates: null,
    guests: { adults: 0, children: 0 },
  },
  getters: {
    getLocation(state) {
      return state.location;
    },
    getDates(state) {
      return state.dates;
    },
    getGuests(state) {
      return { ...state.guests };
    },
  },
  mutations: {
    setLocation(state, { location }) {
      state.location = location;
    },
    setDates(state, { dates }) {
      state.dates = dates;
    },
    setGuests(state, { guests }) {
      state.guests = guests;
    },
  },
  actions: {},
};
