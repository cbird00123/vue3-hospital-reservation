<template>
  <v-stepper
    v-model="step"
    alt-labels
    hide-actions
    :items="stepTitle"
    class="reservation-stepper-container"
  >
    <template #[`item.1`]>
      <Login @emitLogin="apis.login" />
    </template>
    <template #[`item.2`]>
      <StepInformation />
    </template>
    <template #[`item.3`]>
      <StepRadioList />
    </template>
    <template #[`item.4`]>
      <StepRadioList />
    </template>
    <template #[`item.5`]>
      <DatePicker />
    </template>
    <template #[`item.6`]>
      <StepComplete />
    </template>
    <ReservationStepperAction
      :step="step"
      @emitChangeStep="(s) => (step = s)"
    />
  </v-stepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ReservationStepperAction from './ReservationStepperAction.vue'
import Login from '../common/Login.vue'
import StepInformation from './step/StepInformation.vue'
import StepRadioList from './step/StepRadioList.vue'
import DatePicker from '../common/DatePicker.vue'
import StepComplete from './step/StepComplete.vue'
import { apis } from '@/api/api'

const step = ref(1)

const stepTitle = <string[]>[
  '로그인',
  '정보확인',
  '문진',
  '의사선택',
  '날짜선택',
  '예약완료'
]

const isLogin = ref<boolean>(false)
if (isLogin.value) {
  stepTitle.shift()
}
</script>

<style lang="scss" scoped>
.reservation-stepper-container {
  max-width: 1137px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
