<template>
  <section class="details-select-guests-modal">
    <p class="details-guests-modal-title">Select guests</p>
    <p v-if="!capacityAlert && !adultAlert" class="no-alert">hey</p>
    <p v-if="capacityAlert" class="input-alert">
      Please select up to {{ capacity }} guests
    </p>
    <p v-if="adultAlert" class="input-alert">Please select at least 1 adult</p>
    <div class="details-guests-type-container">
      <span class="details-guests-type">Adults</span>

      <div class="details-guests-counter">
        <span
          class="material-icons details-guest-count-icon"
          @click="changeCount('adults', -1)"
        >
          remove
        </span>
        <span class="details-guests-number">{{ guestSelected.adults }}</span>
        <span
          class="material-icons details-guest-count-icon"
          @click="changeCount('adults', 1)"
        >
          add
        </span>
      </div>
    </div>

    <div class="details-guests-type-container">
      <span class="details-guests-type">Children</span>
      <div class="details-guests-counter">
        <span
          class="material-icons details-guest-count-icon"
          @click="changeCount('children', -1)"
        >
          remove
        </span>
        <span class="details-guests-number">{{ guestSelected.children }}</span>
        <span
          class="material-icons details-guest-count-icon"
          @click="changeCount('children', 1)"
        >
          add
        </span>
      </div>
    </div>
    <div class="details-guests-btns-container">
      <div class="guest-modal-btn" @click="onSelectGuests">Close</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    guests: {
      type: Object,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  name: "header-user-menu",

  data() {
    return {
      guestSelected: null,
      newModalClass: "guests-modal-in-stay-details",
      capacityAlert: false,
      adultAlert: false,
    };
  },
  created() {
    if (this.guests.adults + this.guests.children > this.capacity) {
      this.capacityAlert = true;
      setTimeout(() => {
        this.capacityAlert = false;
      }, 3500);
      this.guestSelected = { adults: this.capacity, children: 0 };
      this.$emit("onSelectGuests", { ...this.guestSelected });
    } else {
      this.guestSelected = { ...this.guests };
    }
  },
  methods: {
    closeGuestsModal() {
      this.guestSelected = { ...this.guests };
      this.$emit("closeGuestsModal");
    },
    changeCount(type, val) {
      const adults = this.guestSelected.adults;
      const children = this.guestSelected.children;
      if (type === "adults" && adults === 1 && val === -1) {
        this.capacityAlert = false;
        this.adultAlert = true;
        setTimeout(() => {
          this.adultAlert = false;
        }, 2500);

        return;
      }
      if (type === "children" && children === 0 && val === -1) return;
      if (adults + children === this.capacity && val === 1) {
        this.adultAlert = false;
        this.capacityAlert = true;
        setTimeout(() => {
          this.capacityAlert = false;
        }, 2500);
        return;
      }

      this.guestSelected[type] += val;
      this.$emit("onSelectGuests", { ...this.guestSelected });
    },
    onSelectGuests() {
      this.$emit("closeGuestsModal");
    },
  },
};
</script>
