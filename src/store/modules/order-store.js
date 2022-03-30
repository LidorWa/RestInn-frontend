import { stayService } from '../../services/stay-service.js'

export default {
  state: {
    location: '',
    dates: null,
    guests: { adults: 0, children: 0 },
    isOrdering: false,
    order: [],
    total: 0,
  },
  getters: {
    getOrders(state) {
      return state.order
    },
    getTotalPrice(state) {
      return state.total
    },
    getLocation(state) {
      return state.location
    },
    getDates(state) {
      return state.dates
    },
    getGuests(state) {
      return { ...state.guests }
    },
  },
  mutations: {
    setOrder(state, { order }) {
      console.log(order)
      state.order.push(order)
    },
    setTotalPrice(state, { totalPrice }) {
      state.total = totalPrice
    },
    setLocation(state, { location }) {
      state.location = location
    },
    setDates(state, { dates }) {
      state.dates = dates
    },
    setGuests(state, { guests }) {
      state.guests = guests
    },
  },
  actions: {},
}
