import { httpService } from "./http-service.js";

const ENDPOINT = "order";

export const orderService = {
  query,
  addOrder,
  removeOrder,
  updateOrder,
};

async function query(filterBy) {
  return await httpService.get(ENDPOINT, filterBy);
}

async function addOrder(order) {
  return await httpService.post(ENDPOINT, order);
}

async function updateOrder(order) {
  return await httpService.put(ENDPOINT, order);
}

async function removeOrder(orderId) {
  return await httpService.delete(`${ENDPOINT}/${orderId}`, orderId);
}
