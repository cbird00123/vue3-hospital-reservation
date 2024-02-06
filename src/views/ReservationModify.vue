<template>
  <v-container fluid class="reservation-modify-container pa-1">
    <ReservationModifyStepper />
  </v-container>
</template>

<script setup lang="ts">
import ReservationModifyStepper from '../components/reservation/ReservationModifyStepper.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

store.commit('setSiteCode', route.query.siteCode)
</script>

<style lang="scss" scoped>
.reservation-modify-container {
  height: 100%;
  background: map-get($colors, secondary);
}
</style>
