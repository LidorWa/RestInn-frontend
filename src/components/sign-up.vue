<template>
  <section class="sign-up-modal" @keyup.enter="submitSignUp">
    <span class="material-icons close-sign-up" @click="closeSignUp">
      close
    </span>
    <p class="sign-up-title">Log in or sign up</p>
    <h1 class="sign-up-welcome">Welcome to RestInn</h1>
    <p class="input-alert" v-if="isInputAlert">
      Please enter username and password
    </p>
    <p class="input-alert" v-if="isUsernameAlert">
      Please enter a valid username address
    </p>
    <p class="input-alert" v-if="isInvalidAlert">
      Invalid username or password
    </p>
    <p
      v-if="!isInputAlert && !isUsernameAlert && !isInvalidAlert"
      class="no-alert"
    >
      .
    </p>
    <div class="sign-up-inputs-container">
      <input
        ref="username"
        class="sign-up-input"
        type="text"
        v-model="username"
        placeholder="username"
      />
      <input
        class="sign-up-input"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <div class="sign-up-continue" @click="submitSignUp">Continue</div>
  </section>
</template>

<script>
export default {
  name: "header-user-menu",

  data() {
    return {
      username: "",
      password: "",
      isUsernameAlert: false,
      isInputAlert: false,
      isInvalidAlert: false,
    };
  },
  methods: {
    async submitSignUp() {
      const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!this.password || !this.username) {
        this.isInputAlert = true;
        this.isUsernameAlert = false;
        this.isInvalidAlert = false;
        return;
      }
      // if (!regex.test(this.username)) {
      //   this.isInputAlert = false;
      //   this.isInvalidAlert = false;
      //   this.isUsernameAlert = true;
      //   return;
      // }

      const user = {
        username: this.username,
        password: this.password,
      };

      try {
        await this.$store.dispatch({ type: "login", user });
        this.cleanData();
        this.$emit("closeSignUp");
      } catch (err) {
        console.error("Error while trying to log in:", err);
        this.isInputAlert = false;
        this.isUsernameAlert = false;
        this.isInvalidAlert = true;
        this.cleanData();
        throw err;
        // return;
      }

      // const loggedInUser = this.$store.getters.getLoggedInUser;
      // if (!loggedInUser) {
      //   this.isInputAlert = false;
      //   this.isUsernameAlert = false;
      //   this.isInvalidAlert = true;
      //   return;
      // }
      // this.cleanData();
      // this.$emit("closeSignUp");
    },
    closeSignUp() {
      this.cleanData();
      this.$emit("closeSignUp");
    },
    cleanData() {
      this.isInputAlert = false;
      this.isUsernameAlert = false;
      this.isInvalidAlert = false;
      this.username = "";
      this.password = "";
    },
  },
};
</script>
