<template>
  <v-container fluid class="reservation-container pa-1">
    <ReservationStepper />
  </v-container>
</template>

<script setup lang="ts">
import ReservationStepper from '../components/reservation/ReservationStepper.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

store.commit('setSiteCode', route.query.siteCode)
</script>

<style lang="scss" scoped>
.reservation-container {
  height: 100%;
  background: map-get($colors, secondary);
}
</style>
