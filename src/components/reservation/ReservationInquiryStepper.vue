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
        :call-event="eventValid"
        :is-login="isLogin"
        :reservation-history-info-list="reservationHistoryInfoList"
        @openDialog="openDialog"
        @emitLogin="login"
        @emitChangeParams="(v) => (loginParams = v)"
      ></component>
    </template>
    <ReservationStepperAction
      :step="step"
      :is-login="isLogin"
      :none-action-button="noneActionButton"
      :type="'reservationHistory'"
      @emitChangeStep="(s) => (step = s)"
      @callEvent="callEvent"
      @emitHistory="reservationHistory"
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
const openDialog = (dialogData: any) => {
  dialogData.telNum = store.state.aiHomeData?.site?.telNum
  store.commit('setDialogData', dialogData)
  store.commit('setDialog', true)
  dialogKey.value += 1
}

const noneActionButton = ref<boolean>(true)
const isLogin = ref<boolean>(false)
const userInfo = ref<any>()
if (sessionStorage.getItem('userInfo')) {
  const item: string = sessionStorage.getItem('userInfo') || ''
  userInfo.value = JSON.parse(item)
  isLogin.value = true
}
if (isLogin.value) {
  stepTitle.shift()
  stepComponent.value.shift()
  noneActionButton.value = false
}

const eventValid = ref<boolean>(false)

const callEvent = () => {
  eventValid.value = true
}

const loginParams = ref<any>({
  patientNm: '',
  telNum: '',
  birth: ''
})

const login = async () => {
  await apis.login(loginParams.value, store.state.siteCode)
  if (sessionStorage.getItem('userInfo')) {
    const item: string = sessionStorage.getItem('userInfo') || ''
    userInfo.value = JSON.parse(item)
  }
  noneActionButton.value = false
  step.value++
}

const reservationHistoryInfoList = ref<any[]>()

const reservationHistory = async () => {
  const patientType = userInfo?.value?.patientNo ? '' : '/new'
  const historyParams = {
    patientNm: userInfo?.value?.patientNm,
    telNum: userInfo?.value?.telNum
  }
  const reservationPatientHistoryResponse = await apis.history(
    patientType,
    historyParams,
    store.state.siteCode
  )

  if (reservationPatientHistoryResponse.resultCd === '200') {
    reservationHistoryInfoList.value =
      reservationPatientHistoryResponse.contents
  }
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
