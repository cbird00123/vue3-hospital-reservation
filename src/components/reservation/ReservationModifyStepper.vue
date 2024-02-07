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
        v-show="step === item.step"
        :key="item.refName + index"
        :ref="item.refName"
        :step="step"
        :selected-doctor="selectedDoctor"
        :reservation-complete-data="reservationCompleteData"
        @emitSeletedDateTime="(v) => (dateTime = v)"
      ></component>
    </template>
    <ReservationStepperAction
      :step="step"
      :none-action-button="noneActionButton"
      @emitChangeStep="(s) => (step = s)"
      @emitReservation="reservation"
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
const stepTitle = <string[]>['날짜선택', '취소사유', '예약완료']
const stepComponent = shallowRef([
  {
    step: 1,
    refName: 'datePage',
    component: defineAsyncComponent(() => import('../common/DatePicker.vue'))
  },
  {
    step: 1,
    refName: 'cancelPage',
    component: defineAsyncComponent(() => import('./step/StepCancelPage.vue'))
  },
  {
    step: 2,
    refName: 'completePage',
    component: defineAsyncComponent(() => import('./step/StepComplete.vue'))
  }
])

const store = useStore()
const dialogKey = ref<number>(0)
const { reservationItem } = history.state
const openDialog = (dialogData: any) => {
  store.commit('setDialogData', dialogData)
  store.commit('setDialog', true)
  dialogKey.value += 1
}

const noneActionButton = ref<boolean>(false)
const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')))

const selectedDoctor = ref<any>({
  deptNo: reservationItem.deptNo,
  doctorNm: reservationItem.doctorNm,
  doctorNo: reservationItem.doctorNo
})

const dateTime = ref<string>()

const reservationParams = ref<any>({})

const reservationCompleteData = ref<any>({})

const convertingDateTimeText = (reservationDate: string | undefined) => {
  const rYear = reservationDate?.substring(0, 2)
  const rMonth = reservationDate?.substring(2, 4)
  const rDate = reservationDate?.substring(4, 6)
  const rHour = reservationDate?.substring(6, 8)
  const rMinute = reservationDate?.substring(8, 10)

  return `20${rYear}년 ${rMonth}월 ${rDate}일 ${rHour}시 ${rMinute}분`
}
const reservation = async (type: string | undefined) => {
  const tempDate = dateTime.value?.replace(/[^0-9]/g, '').substring(2)
  const resultDate = convertingDateTimeText(tempDate)
  reservationParams.value = {
    afterAppointHours: tempDate,
    appointmentDate: tempDate,
    deptNo: selectedDoctor.value.deptNo,
    deptNm: selectedDoctor.value.deptNm,
    doctorNo: selectedDoctor.value.doctorNo,
    doctorNm: selectedDoctor.value.doctorNm,
    patientNo: null,
    patientSeq: null,
    patientType: '신환',
    reservationComment: '진료예약진행',
    reservationKey: null,
    appointmentType: 'NORMAL',
    patientNm: userInfo.value.patientNm,
    birth: userInfo.value.birth,
    telNum: userInfo.value.telNum
  }

  const reservationResponse = await apis.reservation(
    reservationParams.value,
    store.state.siteCode
  )

  const resultText = ref<string>('')
  if (reservationResponse.contents.resultCd === 'success') {
    resultText.value = '예약이 완료되었습니다.'
    noneActionButton.value = true
  } else {
    resultText.value = '예약이 실패되었습니다.'
    noneActionButton.value = false
  }

  reservationCompleteData.value = {
    ...reservationCompleteData,
    doctorNm: selectedDoctor.value.doctorNm,
    patientNm: userInfo.value.patientNm,
    resultText,
    resultDate,
    resultCd: reservationResponse.contents.resultCd
  }
  console.log(reservationResponse)
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
