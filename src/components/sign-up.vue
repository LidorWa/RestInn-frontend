<template>
  <section class="sign-up-modal" @keyup.enter="submitSignUp">
    <span class="material-icons close-sign-up" @click="closeSignUp">
      close
    </span>
    <p class="sign-up-title">Log in or sign up</p>
    <h1 class="sign-up-welcome">Welcome to RestInn</h1>
    <p class="input-alert" v-if="isInputAlert">
      Please enter email and password
    </p>
    <p class="input-alert" v-if="isEmailAlert">
      Please enter a valid email address
    </p>
    <p v-if="!isInputAlert && !isEmailAlert" class="no-alert">.</p>
    <div class="sign-up-inputs-container">
      <input
        class="sign-up-input"
        type="text"
        v-model="email"
        placeholder="email"
      />
      <input
        class="sign-up-input"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <div class="sign-up-continue" @click="submitSignUp">continue</div>
  </section>
</template>

<script>
export default {
  name: "header-user-menu",

  data() {
    return {
      email: "",
      password: "",
      isEmailAlert: false,
      isInputAlert: false,
    };
  },

  methods: {
    submitSignUp() {
      const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!this.password || !this.email) {
        this.isInputAlert = true;
        this.isEmailAlert = false;
        return;
      }
      if (!regex.test(this.email)) {
        this.isInputAlert = false;
        this.isEmailAlert = true;
        return;
      }

      this.$emit("submitSignUp", this.email, this.password);
      this.cleanData();
    },
    closeSignUp() {
      this.cleanData();
      this.$emit("closeSignUp");
    },
    cleanData() {
      this.isInputAlert = false;
      this.isEmailAlert = false;
      this.email = "";
      this.password = "";
    },
  },
};
</script>
