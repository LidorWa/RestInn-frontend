<template>
  <section class="select-guests-modal">
    <p class="sign-up-option">Guests</p>
    <div class="guests-type-conteiner">
      <span class="guests-type">Adults</span>

      <div class="guests-counter">
        <span>➖</span>
        <span>{{ guestSelected.adults }}</span>
        <span>➕</span>
      </div>
    </div>

    <div class="guests-type-conteiner">
      <span class="guests-type">Children</span>
      <div class="guests-counter">
        <span>➖</span>
        <span>{{ guestSelected.children }}</span>
        <span>➕</span>
      </div>
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
    };
  },
  created() {
    this.guestSelected = this.guests;
  },
  methods: {
    onSelectGuests() {
      this.$emit("onSelectGuests", this.guestSelected);
    },
  },
};
</script>
