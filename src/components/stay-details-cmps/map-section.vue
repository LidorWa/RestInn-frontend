<template>
  <section>
    <h1 class="map-address">{{ address.street }}</h1>
    <GMapMap v-if="center" :center="center" :zoom="15" map-type-id="terrain">
      <GMapMarker :position="center" />
    </GMapMap>
  </section>
</template>
<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  name: "App",
  data() {
    return {
      center: { lat: 32.091996, lng: 34.959813 },
    };
  },
  created() {
    this.center.lat = this.address.location.lan;
    this.center.lng = this.address.location.lat;
  },
};
</script>

<style></style>
