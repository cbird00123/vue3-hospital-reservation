<template>
  <v-container fluid class="step-complete">
    <v-row class="step-complete-row">
      <v-col cols="4" class="step-complete-col">환자명</v-col>
      <v-col cols="8" class="step-complete-col">{{
        userInfo?.patientNm
      }}</v-col>
    </v-row>
    <v-row class="step-complete-row">
      <v-col cols="4" class="step-complete-col">진료일시</v-col>
      <v-col cols="8" class="step-complete-col">{{
        propsItem.reservationCompleteData.resultDate
      }}</v-col>
    </v-row>
    <v-row class="step-complete-row">
      <v-col cols="4" class="step-complete-col">의료진</v-col>
      <v-col cols="8" class="step-complete-col">{{
        propsItem.reservationCompleteData.doctorNm
      }}</v-col>
    </v-row>
    <v-row class="step-complete-row">
      <v-col cols="4" class="step-complete-col">진행결과</v-col>
      <v-col cols="8" class="step-complete-col">{{
        propsItem.reservationCompleteData.resultText
      }}</v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')))

const propsItem = defineProps({
  reservationCompleteData: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.step-complete {
  display: table;
  border-collapse: collapse;
  &-row {
    display: table-row;
  }
  &-col {
    display: table-cell;
    border: 1px solid #000000;
    text-align: center;
  }
}
</style>
