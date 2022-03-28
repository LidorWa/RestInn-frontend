<template>
  <GMapMap
    v-if="center"
    :center="center"
    :zoom="20"
    map-type-id="terrain"
  >
    <GMapMarker :position="center" />
  </GMapMap>
  <h1 class="map-adress">{{ address.street }}</h1>
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
      // marker: {
      //   id: "dfsldjl3r",
      //   position: {
      //     lat: 32.091996,
      //     lng: 34.959813,
      //   },
      // },
    };
  },
  created() {
    this.center.lat = this.address.location.lan;
    this.center.lng = this.address.location.lat;
  },
};
</script>

<style>
.vue-map-container {
  height: 800px;
  width: 100%;
}
</style>
