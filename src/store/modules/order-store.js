import { orderService } from '../../services/order-service.js'

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
    //Helper mutations for data communication
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
    //CRUD mutations
    setOrders(state, { orders }) {
      state.orders = orders
    },
    addOrder(state, { order }) {
      state.orders.push(order)
    },
    updateOrder(state, { order }) {
      const idx = state.orders.findIndex((currOrder) => currOrder._id === order._id)
      state.orders.splice(idx, 1, order)
    },
    removeOrder(state, { orderId }) {
      const idx = state.orders.findIndex((order) => order._id === orderId)
      state.orders.splice(idx, 1)
    },
  },
  actions: {
    async getOrders({ commit }, { filterBy }) {
      try {
        const orders = await orderService.query(filterBy)
        commit({ type: 'setOrders', orders })
        return orders
      } catch (err) {
        console.log('err :>> ', err)
      }
    },
    async addOrder({ commit }, { order }) {
      try {
        const addedOrder = await orderService.addOrder(order)
        commit({ type: 'addOrder', order: addedOrder })
      } catch (err) {
        console.log('err :>> ', err)
      }
    },
    async updateOrder({ commit }, { order }) {
      try {
        const updatededOrder = await orderService.updateOrder(order)
        commit({ type: 'addOrder', order: updatededOrder })
      } catch (err) {
        console.log('err :>> ', err)
      }
    },
    async removeOrder({ commit }, { orderId }) {
      try {
        await orderService.removeOrder(orderId)
        commit({ type: 'removeOrder', orderId })
      } catch (err) {
        console.log('err :>> ', err)
      }
    },
  },
  actions: {},
}
