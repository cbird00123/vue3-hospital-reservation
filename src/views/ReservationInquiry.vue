<template>
  <v-container fluid class="reservation-inquiry-container pa-1">
    <ReservationInquiryStepper />
  </v-container>
</template>

<script setup lang="ts">
import ReservationInquiryStepper from '../components/reservation/ReservationInquiryStepper.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { apis } from '../api/api'

const store = useStore()
const route = useRoute()

store.commit('setSiteCode', route.query.siteCode)

const aiHomeResponse = await apis.aiHome('AI_home', store.state.siteCode)
store.commit('setAiHomeData', aiHomeResponse)
console.log(store.state.aiHomeData)
</script>

<style lang="scss" scoped>
.reservation-inquiry-container {
  height: 100%;
  background: map-get($colors, secondary);
}
</style>
