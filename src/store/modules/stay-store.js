import { stayService } from "../../services/stay-service.js";

export default {
  state: {
    stays: [],
    filterBy: {
      price: [1, 1751],
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
      if (!state.stays) return;
      const stays = JSON.parse(JSON.stringify(state.stays));
      stays.splice(4);
      return stays;

      stays.sort((a, b) => b.reviewScores.rating - a.reviewScores.rating);
      stays.splice(4);
      return stays;
    },
    getStaysForDisplay(state) {
      let stays = JSON.parse(JSON.stringify(state.stays));
      if (!stays) return;
      return stays;
      stays = stays.filter((stay) => stay.capacity >= state.filterBy.guests);

      if (state.filterBy.type.length) {
        stays = stays.filter((stay) =>
          state.filterBy.type.includes(stay.propertyType)
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
        let city = state.filterBy.city;

        const regex = new RegExp(city, "i");
        stays = stays.filter((stay) => regex.test(stay.address.city));
      }

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

    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },

    setStays(state, { stays }) {
      console.log("Loading... in mutations");
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
      try {
        console.log("Loading... in acions");
        let stays = await stayService.query();
        stays = stays.splice(30);
        commit({ type: "setStays", stays });
      } catch (err) {
        console.log("Error while loading stays: ", err);
      }
    },



    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: "setFilter", filterBy });
      dispatch({ type: "loadStays" });
    },
  },
};
