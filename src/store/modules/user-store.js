import { userService } from "../../services/user-service.js";

export default {
  state: {
    users: null,
    loggedInUser: null,
    isSignUpModal: false,
  },
  getters: {
    getUsers(state) {
      return JSON.parse(JSON.stringify(state.users));
    },
    isSignUpModal(state) {
      return state.isSignUpModal;
    },
    getLoggedInUser(state) {
      return state.loggedInUser;
    },
  },
  mutations: {
    openSignUpModal(state) {
      state.isSignUpModal = true;
    },
    closeSignUpModal(state) {
      state.isSignUpModal = false;
    },
    setLoggedinUser(state, { loggedInUser }) {
      console.log("loggedInUser: ", loggedInUser);
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

    async logout({ commit }) {
      await userService.logout();
      commit({ type: "setLoggedinUser", loggedInUser: null });
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
      console.log("user:", user);
      const userToSave = await userService.save(user);
      commit({ type: "saveUser", user });
      dispatch({ type: "loadUsers" });
    },
  },
};
