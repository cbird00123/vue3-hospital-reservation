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
        @emitLogin="login"
        @emitChangeParams="(v) => (loginParams = v)"
      ></component>
    </template>
    <ReservationStepperAction
      :step="step"
      :is-login="isLogin"
      @emitChangeStep="(s) => (step = s)"
      @emitLogin="login"
    />
    <Dialog :key="dialogKey" />
  </v-stepper>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef } from 'vue'
import { useStore } from 'vuex'
import ReservationStepperAction from './ReservationStepperAction.vue'
import { apis } from '../../api/api'

const step = ref(1)
const stepTitle = <string[]>['로그인', '정보확인', '예약정보확인']
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
    refName: 'reservationInfoPage',
    component: defineAsyncComponent(
      () => import('./step/StepReservationInfo.vue')
    )
  }
])

const store = useStore()
const dialogKey = ref<number>(0)
const openDialog = () => {
  store.commit('setDialogData', {
    type: 'normal',
    text: '1111111<br/> 121212<br/> 12312',
    telNum: '',
    positiveButton: '확인',
    negativeButton: ''
  })
  store.commit('setDialog', true)
  dialogKey.value += 1
}
const noneActionButton = ref<boolean>(true)
const isLogin = ref<boolean>(false)
const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')))
if (sessionStorage.getItem('userInfo')) isLogin.value = true
if (isLogin.value) {
  stepTitle.shift()
  stepComponent.value.shift()
  noneActionButton.value = false
}

const loginParams = ref({
  patientNm: '',
  telNum: '',
  birth: ''
})

const login = async () => {
  await apis.login(loginParams.value, store.state.siteCode)
  userInfo.value = JSON.parse(sessionStorage.getItem('userInfo'))
  noneActionButton.value = true
  step.value++
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
