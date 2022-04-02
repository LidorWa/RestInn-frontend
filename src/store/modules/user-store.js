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
      state.loggedInUser = loggedInUser;
    },

    setUsers(state, { users }) {
      state.users = users;
    },

    saveUser(state, { user }) {
      const idx = state.users.findIndex(
        (currUser) => currUser._id === user._id
      );
      if (idx !== -1) state.users.splice(idx, 1, user);
      else state.users.unshift(user);
    },
  },
  actions: {
    async login({ commit }, { user }) {
      try {
        const loggedInUser = await userService.login(user);
        commit({ type: "setLoggedinUser", loggedInUser });
      } catch (err) {
        console.log("Error while trying to log in", err);
        throw new Error("Somethig went wrong. Try again");
      }

      //   if (idx === -1) return;
      //   if (state.users[idx].password !== user.password) return;
    },

    async logout({ commit }) {
      await userService.logout();
      commit({ type: "setLoggedinUser", loggedInUser: null });
    },

    async getUserById(context, { userId }) {
      return await userService.getById(userId);
    },
    async loadUsers({ commit, state }) {
      const users = await userService.getUsers();
      commit({ type: "setUsers", users });
    },

    async saveUser({ commit, dispatch }, { user }) {
      const userToSave = await userService.save(user);
      commit({ type: "saveUser", user });
      dispatch({ type: "loadUsers" });
    },
    getUserFromSession({ commit }) {
      console.log('store getUserFromSession 1');

      const user = userService.getLoggedinUser();
      commit({ type: 'setLoggedinUser', loggedInUser: user })
    }

  },
};
