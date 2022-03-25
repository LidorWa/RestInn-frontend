import { stayService } from "../../services/stay-service.js";

export default {
  state: {
    stays: null,
    filterBy: {
      price: [1, 1751],
      type: "",
      city: "",
      amenities: [],
    },
  },
  getters: {
    getStays(state) {
      return JSON.parse(JSON.stringify(state.stays));
    },
    getCityFilter(state) {
      return state.filterBy.city;
    },
    getTypeFilter(state) {
      return state.filterBy.type;
    },
    getTopRatedStays(state) {
      const stays = JSON.parse(JSON.stringify(state.stays));
      stays.sort((a, b) => b.reviewScores.rating - a.reviewScores.rating);
      stays.splice(4);
      return stays;
    },
    getStaysForDisplay(state) {
      let stays = JSON.parse(JSON.stringify(state.stays));

      if (state.filterBy.type) {
        stays = stays.filter(
          (stay) => stay.propertyType === state.filterBy.type
        );
      }

      stays = stays.filter(
        (stay) =>
          stay.price >= state.filterBy.price[0] &&
          stay.price <= state.filterBy.price[1]
      );

      if (state.filterBy.amenities.length) {
        stays = stays.filter((stay) =>
          state.filterBy.amenities.every((amenity) =>
            stay.amenities.includes(amenity)
          )
        );
      }

      if (state.filterBy.city) {
        let city;
        if (state.filterBy.city.includes("$")) {
          city = state.filterBy.city
            .split("$")
            .map(
              (word) =>
                (word = word.charAt(0).toUpperCase() + word.substring(1))
            )
            .join(" ");
        } else {
          city = state.filterBy.city;
        }

        stays = stays.filter((stay) => stay.address.city === city);
      }

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
    async getStayById(context, { stayId }) {
      try {
        const stay = await stayService.getById(stayId);
        return stay;
      } catch (err) {
        console.log("Error while getting stay:", err);
      }
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
