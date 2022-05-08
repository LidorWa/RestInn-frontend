<template>
  <section
    class="sign-up-modal"
    :class="{ newUserModal: isNewUser }"
    @keyup.enter="submitSignUp"
  >
    <span class="material-icons close-sign-up" @click="closeSignUp">
      close
    </span>
    <p v-if="isNewUser" class="sign-up-title">Sign up</p>
    <p v-else class="sign-up-title">Log in</p>
    <h1 class="sign-up-welcome">Welcome to RestInn</h1>
    <p class="input-alert" v-if="isInputAlert">All fields are required!</p>
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
    <div ref="inputs" class="sign-up-inputs-container">
      <input
        ref="fullname"
        v-if="isNewUser"
        class="sign-up-input fullname"
        type="text"
        v-model="fullname"
        placeholder="Full name"
      />
      <input
        ref="username"
        class="sign-up-input"
        :class="{ newUserMode: isNewUser }"
        type="text"
        v-model="username"
        placeholder="Username"
      />
      <input
        class="sign-up-input"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <h3 v-if="isNewUser" @click="toggleNewUser">I have an account</h3>
    <h3 v-else @click="toggleNewUser">New user</h3>
    <div class="sign-up-continue" @click="submitSignUp">Continue</div>
  </section>
</template>

<script>
export default {
  name: "header-user-menu",

  data() {
    return {
      fullname: "",
      username: "",
      password: "",
      isUsernameAlert: false,
      isInputAlert: false,
      isInvalidAlert: false,
    };
  },
  methods: {
    toggleNewUser() {
      this.$emit("toggleNewUser");
    },
    async submitSignUp() {
      // const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      const isNew = this.$store.getters.isNewUser;
      if (!this.password || !this.username || (isNew && !this.fullname)) {
        this.isInputAlert = true;
        this.isUsernameAlert = false;
        this.isInvalidAlert = false;
        return;
      }
      const user = {
        username: this.username,
        password: this.password,
      };

      if (!isNew) {
        try {
          await this.$store.dispatch({ type: "login", user });
          this.cleanData();
          this.$emit("closeSignUp");
        } catch (err) {
          console.error("Error while trying to log in:", err);
          this.$router.push("/");
          setTimeout(() => {
            this.cleanData();
            this.isInputAlert = false;
            this.isUsernameAlert = false;
            this.isInvalidAlert = true;
          }, 800);
        }
      } else {
        const user = {
          fullname: this.fullname,
          username: this.username,
          password: this.password,
          imgUrl: "https://picsum.photos/200/300",
        };
        await this.$store.dispatch({ type: "signUp", user });
        this.cleanData();
        this.$emit("closeSignUp");
      }
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
  computed: {
    isNewUser() {
      return this.$store.getters.isNewUser;
    },
  },
};
</script>
