<template>
  <v-container fluid class="step-information">
    <v-row class="step-information-row">
      <v-col cols="4" class="step-information-col">이 름</v-col>
      <v-col cols="8" class="step-information-col">{{
        userInfo?.patientNm
      }}</v-col>
    </v-row>
    <v-row class="step-information-row">
      <v-col cols="4" class="step-information-col">생년월일</v-col>
      <v-col cols="8" class="step-information-col">{{ userInfo?.birth }}</v-col>
    </v-row>
    <v-row class="step-information-row">
      <v-col cols="4" class="step-information-col">전화번호</v-col>
      <v-col cols="8" class="step-information-col">{{
        userInfo?.telNum
      }}</v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const propsItem = defineProps({
  step: {
    type: Number,
    default: 1
  }
})

const step = ref<number>(propsItem.step)

const userInfo = ref<any>()
if (sessionStorage.getItem('userInfo')) {
  const item: string = sessionStorage.getItem('userInfo') || ''
  userInfo.value = JSON.parse(item)
}
</script>

<style lang="scss" scoped>
.step-information {
  width: 90%;
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
