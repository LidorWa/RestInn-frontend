<template>
  <section class="select-guests-modal">
    <p class="guests-modal-title">Select guests</p>
    <div class="guests-type-container">
      <span class="guests-type">Adults</span>

      <div class="guests-counter">
        <span
          class="material-icons guest-count-icon"
          @click="changeCount('adults', -1)"
        >
          remove
        </span>
        <span class="guests-number">{{ guestSelected.adults }}</span>
        <span
          class="material-icons guest-count-icon"
          @click="changeCount('adults', 1)"
        >
          add
        </span>
      </div>
    </div>

    <div class="guests-type-container">
      <span class="guests-type">Children</span>
      <div class="guests-counter">
        <span
          class="material-icons guest-count-icon"
          @click="changeCount('children', -1)"
        >
          remove
        </span>
        <span class="guests-number">{{ guestSelected.children }}</span>
        <span
          class="material-icons guest-count-icon"
          @click="changeCount('children', 1)"
        >
          add
        </span>
      </div>
    </div>
    <div class="guests-btns-container">
      <div class="guest-modal-btn" @click="onSelectGuests">OK</div>
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
  },

  data() {
    return {
      guestSelected: null,
    };
  },
  created() {
    this.guestSelected = { ...this.guests };
  },
  methods: {
    closeGuestsModal() {
      this.guestSelected = { ...this.guests };
      this.$emit("closeGuestsModal");
    },
    changeCount(type, val) {
      if (type === "adults" && this.guestSelected.adults === 0 && val === -1)
        return;
      if (
        type === "children" &&
        this.guestSelected.children === 0 &&
        val === -1
      )
        return;

      if (type === "children" && val === 1 && this.guestSelected.adults === 0)
        this.guestSelected.adults = 1;

      if (
        type === "adults" &&
        this.guestSelected.adults === 1 &&
        val === -1 &&
        this.guestSelected.children > 0
      )
        return;

      this.guestSelected[type] += val;
      this.$emit("onSelectGuests", { ...this.guestSelected });
    },
    onSelectGuests() {
      this.$emit("closeGuestsModal");
    },
  },
};
</script>
