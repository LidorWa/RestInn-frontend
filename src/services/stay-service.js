import { stay } from '../data/stay.js'


export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
  }

  let gStays = JSON.parse(stay);

  console.log(gStays)