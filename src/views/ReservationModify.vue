<template>
  <v-container fluid class="reservation-modify-container pa-1">
    <ReservationModifyStepper />
  </v-container>
</template>

<script setup lang="ts">
import ReservationModifyStepper from '../components/reservation/ReservationModifyStepper.vue'
</script>

<style lang="scss" scoped>
.reservation-modify-container {
  height: 100%;
  background: map-get($colors, secondary);
}
</style>
