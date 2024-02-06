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
        :selected-doctor="selectedDoctor"
        :reservation-complete-data="reservationCompleteData"
        @emitLogin="login"
        @emitChangeParams="(v) => (loginParams = v)"
        @emitSetDoctor="(v) => (doctorList = v)"
        @emitSelectedDoctor="(v) => (selectedDoctor = v)"
        @emitSeletedDateTime="(v) => (dateTime = v)"
      ></component>
    </template>
    <ReservationStepperAction
      :step="step"
      :is-login="isLogin"
      :none-action-button="noneActionButton"
      @emitChangeStep="(s) => (step = s)"
      @emitLogin="login"
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
    refName: 'datePage',
    component: defineAsyncComponent(() => import('../common/DatePicker.vue'))
  },
  {
    step: 1,
    refName: 'cancelRevokePage',
    component: defineAsyncComponent(
      () => import('./step/StepCancelRevokePage.vue')
    )
  },
  {
    step: 2,
    refName: 'completePage',
    component: defineAsyncComponent(() => import('./step/StepComplete.vue'))
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
const noneActionButton = ref<boolean>(false)
const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')))

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
const reservation = async () => {
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
