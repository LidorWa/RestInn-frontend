import { userService } from "../../services/user-service.js";

export default {
  state: {
    users: null,
    loggedInUser: null,
  },
  getters: {
    getUsers(state) {
      return JSON.parse(JSON.stringify(state.users));
    },
    getLoggedInUser(state) {
      return state.loggedInUser;
    },
  },
  mutations: {
    setLoggedinUser(state, { loggedInUser }) {
      state.loggedInUser = loggedInUser;
    },

    setUsers(state, { users }) {
      state.users = users;
    },

    saveUser(state, { user }) {
      console.log(user);
      const idx = state.users.findIndex(
        (currUser) => currUser._id === user._id
      );
      if (idx !== -1) state.users.splice(idx, 1, user);
      else state.users.unshift(user);
    },
  },
  actions: {
    async login({ commit }, { user }) {
      const loggedInUser = await userService.login(user);

      commit({ type: "setLoggedinUser", loggedInUser });

      //   if (idx === -1) return;
      //   if (state.users[idx].password !== user.password) return;
    },
    getUserById(context, { userId }) {
      console.log(userId);
      return userService.getById(userId);
    },
    async loadUsers({ commit, state }) {
      const users = await userService.getUsers();
      commit({ type: "setUsers", users });
    },

    async saveUser({ commit, dispatch }, { user }) {
      console.log(user);
      const userToSave = await userService.save(user);
      commit({ type: "saveUser", user });
      dispatch({ type: "loadUsers" });
    },
  },
};
