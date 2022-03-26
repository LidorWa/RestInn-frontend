<template>
  <section class="details-select-guests-modal">
    <p class="details-guests-modal-title">Select guests</p>
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
      <!-- <div class="guest-modal-btn" @click="closeGuestsModal">Cancel</div> -->
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
  name: "header-user-menu",

  data() {
    return {
      guestSelected: null,
      newModalClass: 'guests-modal-in-stay-details'
    };
  },
  created() {
    this.guestSelected = { ...this.guests };
    console.log(this.$route.params.value)
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
      this.guestSelected[type] += val;
      this.$emit("onSelectGuests", { ...this.guestSelected });
    },
    onSelectGuests() {
      this.$emit("closeGuestsModal");
    },
  },
};
</script>
