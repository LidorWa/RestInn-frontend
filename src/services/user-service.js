import { storageService } from "./async-storage-service";
import { httpService } from "./http-service.js";
// import { socketService, SOCKET_EVENT_USER_UPDATED } from "./socket.service";

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
  // const users = await storageService.query(USER_KEY);
  // const user = users.find(
  //   (user) =>
  //     user.username === userCred.username && user.password === userCred.password
  // );
  // return _saveLocalUser(user);

  try {
    const user = await httpService.post("auth/login", userCred);
    // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user);
  } catch (err) {
    console.log("Error while trying to login");
  }
}

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`);
  gWatchedUser = user;
  return user;
}

async function update(user) {
  // await storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
  return user;
}

async function getUsers() {
  // return httpService.get(`user`);
  let users = await storageService.query(USER_KEY);
  if (!users || !users.length) {
    users = await _createUsers();
  }
  return users;
}

async function signup(userCred) {
  // userCred.score = 10000;
  // const user = await storageService.post('user', userCred)
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
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || "null"
  );
}

async function _createUsers() {
  const users = [
    {
      _id: "fds45fe3",
      fullname: "Liran Parti",
      username: "liran@gmail.com",
      password: "123",

      imgUrl: "../assets/user-images/liran.jpg",
    },
    {
      _id: "fds45fe2",
      fullname: "Lidor Waldman",
      username: "lidor@gmail.com",
      password: "123",

      imgUrl: "../assets/user-images/lidor.jpg",
    },
    {
      _id: "fds45fe1",
      fullname: "Tal Itay",
      username: "tal@gmail.com",
      password: "123",

      imgUrl: "../assets/user-images/tal.jpg",
    },
    {
      _id: "fds99fe1",
      fullname: "Guest user",
      username: "demo@gmail.com",
      password: "demo",

      imgUrl: "../assets/user-images/tal.jpg",
    },
  ];

  await storageService.postMany(USER_KEY, users);

  return users;
}
