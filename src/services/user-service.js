import { storageService } from "./async-storage-service";
import { httpService } from "./http-service.js";
// import { socketService, SOCKET_EVENT_USER_UPDATED } from "./socket-service";

// import Axios from "axios";
// var axios = Axios.create({ withCredentials: true });

const USER_KEY = "user_db";
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";
var gWatchedUser = null;

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  update,
};

// Debug technique
window.userService = userService;

async function login(userCred) {
  try {
    const user = await httpService.post("auth/login", userCred);
    // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user);
  } catch (err) {
    console.log("Error while trying to login");
  }
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  gWatchedUser = user;
  return user;
}

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
  return user;
}

async function getUsers() {
  let users = await storageService.query(USER_KEY);
  if (!users || !users.length) {
    users = await _createUsers();
  }
  return users;
}

async function signup(userCred) {
  const user = await httpService.post("auth/signup", userCred);
  // socketService.emit('set-user-socket', user._id);
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // socketService.emit('unset-user-socket');
  // return await httpService.post("auth/logout");
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  const user = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || "null"
  );
  return user;
}


