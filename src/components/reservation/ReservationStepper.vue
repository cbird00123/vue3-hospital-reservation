<template>
  <v-stepper
    v-model="step"
    alt-labels
    hide-actions
    :items="stepTitle"
    class="reservation-stepper-container"
  >
    <template #[`item.${step}`]>
      <component
        :is="item.component"
        v-for="(item, index) in stepComponent"
        v-show="
          (!isLogin && step === item.step) ||
          (isLogin && step === item.step - 1)
        "
        :key="item.refName + index"
        :ref="item.refName"
        :step="step"
        :is-login="isLogin"
        :doctor-list="doctorList"
        @emitLogin="login"
        @emitChangeParams="(v) => (loginParams = v)"
        @emitSetDoctor="(v) => (doctorList = v)"
      ></component>
    </template>
    <ReservationStepperAction
      :step="step"
      :is-login="isLogin"
      @emitChangeStep="(s) => (step = s)"
      @emitLogin="login"
    />
  </v-stepper>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef } from 'vue'
import { useStore } from 'vuex'
import ReservationStepperAction from './ReservationStepperAction.vue'
import { apis } from '../../api/api'

const step = ref(1)
const stepTitle = <string[]>[
  '로그인',
  '정보확인',
  '문진',
  '의사선택',
  '날짜선택',
  '예약완료'
]

const stepComponent = shallowRef([
  {
    step: 1,
    refName: 'loginPage',
    component: defineAsyncComponent(() => import('../common/Login.vue'))
  },
  {
    step: 2,
    refName: 'informationPage',
    component: defineAsyncComponent(() => import('./step/StepInformation.vue'))
  },
  {
    step: 3,
    refName: 'interviewPage',
    component: defineAsyncComponent(() => import('./step/StepInterviewList.vue'))
  },
  {
    step: 4,
    refName: 'doctorPage',
    component: defineAsyncComponent(() => import('./step/StepDoctorList.vue'))
  },
  {
    step: 5,
    refName: 'datePage',
    component: defineAsyncComponent(() => import('../common/DatePicker.vue'))
  },
  {
    step: 6,
    refName: 'completePage',
    component: defineAsyncComponent(() => import('./step/StepComplete.vue'))
  }
])

const isLogin = ref<boolean>(false)
if (sessionStorage.getItem('userInfo')) isLogin.value = true
if (isLogin.value) {
  stepTitle.shift()
  stepComponent.value.shift()
}

const store = useStore()
const loginParams = ref({
  patientNm: '',
  telNum: '',
  birth: ''
})
const login = async () => {
  await apis.login(loginParams.value, store.state.siteCode)
  step.value++
}

const doctorList = ref<any[]>([])
</script>

<style lang="scss" scoped>
.reservation-stepper-container {
  max-width: 1137px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
