<template>
  <div class="block">
    <span class="demonstration">Default</span>
    <el-date-picker v-model="date" type="daterange" start-placeholder="CHECK-IN" end-placeholder="CHECKOUT" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      date: ref(''),
    }
  },
}
</script>

<style></style>
