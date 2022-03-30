import { httpService } from "../../../../misterToy/frontend/src/services/http.service";
import { storageService } from "./async-storage-service";

const KEY = "stay_db";

export const stayService = {
  query,
  getById,
  save,
  remove,
};

async function query(filterBy = null) {
  return await httpService.get(`stay`, filterBy);
  // return httpService.get(`query`)
  // let stays = await storageService.query(KEY);

  // if (!stays || !stays.length) {
  //   stays = _createStays();
  // }

  // return stays;
}

async function getById(stayId) {
  return await httpService.get(`stay/${stayId}`);
  // return await httpService.get(`stay/getById/${stayId}`)

  // let stay = await storageService.get(KEY, stayId);
  // return stay;
}

async function remove(stayId) {
  return await httpService.delete(`stay/${stayId}`);
}

async function save(stay) {
  if (toy._id) {
    return await httpService.put(`stay/${stay._id}`, stay);
  } else {
    return await httpService.post("stay", stay);
  }
}

// function getEmptyStay() {
//   return {

//   }
// }
