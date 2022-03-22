<script setup>
import { RouterLink, RouterView } from "vue-router";
import appHeader from "./components/app-header.vue";
</script>

<template>
  <section>
    <app-header />
    <RouterView />
  </section>
</template>
