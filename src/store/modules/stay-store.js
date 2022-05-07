import { stayService } from "../../services/stay-service.js";

export default {
  state: {
    stays: [],
    filterBy: {
      price: [1, 1800],
      type: [],
      city: "",
      amenities: [],
      guests: 0,
    },
  },
  getters: {
    getFilterFromStore(state) {
      return JSON.parse(JSON.stringify(state.filterBy));
    },
    getStays(state) {
      return JSON.parse(JSON.stringify(state.stays));
    },
    getGuestsNumber(state) {
      return state.filterBy.guests;
    },
    getCityFilter(state) {
      return state.filterBy.city;
    },
    getTypeFilter(state) {
      return state.filterBy.type;
    },
    getTopRatedStays(state) {
      if (!state.stays.length) return;
      let stays = JSON.parse(JSON.stringify(state.stays));
      stays = stays.filter((stay) => !!stay.reviewScores.rating);
      stays.splice(4);
      return stays;
    },
    getStaysForDisplay(state) {
      let stays = JSON.parse(JSON.stringify(state.stays));
      if (!stays.length) return;
      return stays;
    },
  },
  mutations: {
    setGuestsFilter(state, { guests }) {
      state.filterBy.guests = guests;
    },

    setCityFilter(state, { city }) {
      state.filterBy.city = city;
    },

    setTypeFilter(state, { stayType }) {
      state.filterBy.type.push(stayType);
    },

    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },

    setStays(state, { stays }) {
      state.stays = stays;
    },
  },
  actions: {
    async getStayById(context, { stayId }) {
      try {
        const stay = await stayService.getById(stayId);
        return stay;
      } catch (err) {}
    },
    async loadStays({ commit, state }) {
      commit({ type: "setIsLoading", isLoading: true });
      try {
        const stays = await stayService.query(state.filterBy);
        commit({ type: "setStays", stays });
      } catch (err) {
        console.log("Error while loading stays: ", err);
      } finally {
        commit({ type: "setIsLoading", isLoading: false });
      }
    },

    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: "setFilter", filterBy });
      dispatch({ type: "loadStays" });
    },
  },
};
