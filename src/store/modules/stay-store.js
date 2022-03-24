import { stayService } from "../../services/stay-service.js";

export default {
  state: {
    stays: null,
    filterBy: null,
  },
  getters: {
    getStays(state) {
      return JSON.parse(JSON.stringify(state.stays));
    },
    getTopRatedStays(state) {
      const stays = JSON.parse(JSON.stringify(state.stays));
      console.log("heyyyyyyyyy");
      stays.sort((a, b) => b.reviewScores.rating - a.reviewScores.rating);
      stays.splice(4);
      return stays;
    },
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays;
    },

    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    getStayById(context, { stayId }) {
      return stayService.getById(stayId);
    },
    async loadStays({ commit, state }) {
      const stays = await stayService.query(state.filterBy);
      commit({ type: "setStays", stays });
    },
    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: "setFilter", filterBy });
      dispatch({ type: "loadStays" });
    },
  },
};
