<template>
  <section class="app-container">
    <sign-up
      :class="{ showSignUp: isSignUp }"
      @closeSignUp="closeSignUp"
      @toggleNewUser="toggleNewUser"
      ref="signup"
    />
    <!-- overlay  -->
    <div v-if="isSignUp" class="outsideUserMenu" @click="closeSignUp"></div>
    <!-- Notification message -->
    <user-message
      :class="{ showUserMessage: isShowingMessage }"
      :message="getMessage"
    />
    <div class="main-app-container flex flex-column app-container">
      <app-header />
      <router-view class="main-layout-height" />
      <app-footer />
    </div>
  </section>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
// import { propsToAttrMap } from "@vue/shared";
import AppFooter from "./components/app-footer.vue";
import signUp from "./components/sign-up.vue";
import userMessage from "./components/user-message.vue";
import { socketService } from "./services/socket-service";

export default {
  name: "app",
  components: {
    appHeader,
    appFooter,
    AppFooter,
    signUp,
    userMessage,
    // propsToAttrMap
  },
  data() {
    return {
      headerStatus: "top",
      scrollY: 0,
    };
  },

  async created() {
    const filterBy = {
      price: [1, 4000],
      type: [],
      city: "",
      amenities: [],
      guests: 0,
    };
    this.$store.dispatch({ type: "getUserFromSession" });

    const user = this.$store.getters.getLoggedInUser;
    if (user) {
      console.log("Logged in: ", user);
      socketService.emit("logged in", user._id);
    }
    socketService.on("added order", this.addedNewOrder);
    socketService.on("status updated", this.statusUpdated);

    await this.$store.dispatch({ type: "loadStays", filterBy });

    // if (user) {
    //   const filterBy = {
    //     hostId: user._id,
    //   };
    //   try {
    //     await this.$store.dispatch({ type: "loadOrders", filterBy });
    //   } catch (err) {
    //     console.log("Error while loading orders: ", err);
    //   }
    // }
  },
  computed: {
    isShowingMessage() {
      return this.$store.getters.isShowingMessage;
    },
    getMessage() {
      return this.$store.getters.getMessage;
    },
    isSignUp() {
      const isSignUpModalOpen = this.$store.getters.isSignUpModal;
      if (isSignUpModalOpen) {
        const isNew = this.$store.getters.isNewUser;
        if (!isNew) this.$refs["signup"].$refs["username"].focus();
      }
      return isSignUpModalOpen;
    },
  },

  methods: {
    async statusUpdated(order) {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      const filterBy = {
        userId: loggedInUser?._id,
      };

      try {
        await this.$store.dispatch({
          type: "loadOrdersWithSocket",
          filterBy,
        });
        const message = {
          text: `Your order has been ${order.status}`,
          from: "host",
          class: order.status === "rejected" ? "danger" : "success",
        };
        this.$store.commit({ type: "showMessage", message });
        setTimeout(() => {
          this.$store.commit({ type: "hideMessage" });
        }, 4500);
      } catch (err) {
        console.log("Error while loading orders: ", err);
      }
    },
    async addedNewOrder() {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      const filterBy = {
        hostId: loggedInUser._id,
      };

      try {
        await this.$store.dispatch({
          type: "loadOrdersWithSocket",
          filterBy,
        });
      } catch (err) {
        console.log("Error while loading orders: ", err);
      }
      const message = {
        text: "You have a new order",
        from: "user",
        class: "success",
      };
      this.$store.commit({ type: "showMessage", message });
      setTimeout(() => {
        this.$store.commit({ type: "hideMessage" });
      }, 4500);
    },
    toggleNewUser() {
      const isNew = this.$store.getters.isNewUser;

      if (isNew) {
        this.$refs["signup"].$refs["fullname"].blur();
        this.$store.commit({ type: "toggleNewUser" });
        this.$refs["signup"].$refs["username"].focus();
      } else {
        this.$refs["signup"].$refs["username"].blur();
        this.$store.commit({ type: "toggleNewUser" });
        setTimeout(() => {
          this.$refs["signup"].$refs["fullname"].focus();
        }, 10);
      }
    },
    closeSignUp() {
      this.$store.commit({ type: "closeSignUpModal" });
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
