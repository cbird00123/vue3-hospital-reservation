<template>
  <v-container fluid class="pa-0">
    <div v-for="(item, index) in historyList" :key="`historyInfo${index}`">
      <div class="info-head">
        <div>예약</div>
        {{ item.historyFullDate }}
      </div>
      <div class="step-reservation-info">
        <v-row class="step-reservation-info-row">
          <v-col cols="4" class="step-reservation-info-col">일시</v-col>
          <v-col cols="8" class="step-reservation-info-col">{{
            item.historyFullDateTime
          }}</v-col>
        </v-row>
        <v-row v-show="item.deptNm" class="step-reservation-info-row">
          <v-col cols="4" class="step-reservation-info-col">진료과</v-col>
          <v-col cols="8" class="step-reservation-info-col">{{
            item.deptNm
          }}</v-col>
        </v-row>
        <v-row v-show="item.doctorNm" class="step-reservation-info-row">
          <v-col cols="4" class="step-reservation-info-col">의료진</v-col>
          <v-col cols="8" class="step-reservation-info-col">{{
            item.doctorNm
          }}</v-col>
        </v-row>
      </div>
      <div class="step-reservation-info__btn">
        <v-btn class="change-btn border-primary" @click="modify('change', item)"
          >예약 일시 변경</v-btn
        >
        <v-btn class="cancel-btn border-gray" @click="modify('cancel', item)"
          >예약 취소</v-btn
        >
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const propsItem = defineProps({
  reservationHistoryInfoList: {
    type: Array,
    default: () => []
  }
})

const historyList = ref<any[]>(propsItem.reservationHistoryInfoList)
historyList.value.forEach((item) => {
  const tempDateTime = item.appointmentDate.split('T')
  const tempDate = tempDateTime[0].split('-')
  const tempTime = tempDateTime[1].split(':')
  item.historyFullDate = `${tempDate[0]}년 ${tempDate[1]}월 ${tempDate[2]}일`
  item.historyFullDateTime = `${tempDate[0]}년 ${tempDate[1]}월 ${tempDate[2]}일 ${tempTime[0]}시 ${tempTime[1]}분`
})

const emit = defineEmits(['openDialog'])
const modify = (type: string, reservationItem: any) => {
  const workTypeCd = reservationItem.workTypeCode
  let dialogData = {}
  if (workTypeCd && workTypeCd !== 'WORK_TYPE_CODE_00') {
    dialogData = {
      type: 'call',
      text: '해당 예약건은 고객센터()으로 문의 바랍니다.',
      telNum: '',
      positiveButton: '통화',
      negativeButton: '닫기'
    }
    if (workTypeCd === 'WORK_TYPE_CODE_02') {
      emit('openDialog', dialogData)
      return
    }
  }

  switch (type) {
    case 'change':
      if (workTypeCd && workTypeCd === 'WORK_TYPE_CODE_01') {
        emit('openDialog', dialogData)
        return
      }
      dialogData = {
        type: 'goModify',
        text: '예약 변경을 진행 하시겠습니까?',
        telNum: '',
        positiveButton: '확인',
        negativeButton: '취소',
        routeQuery: type,
        routeParams: reservationItem
      }
      emit('openDialog', dialogData)
      break
    case 'cancel':
      if (workTypeCd && workTypeCd === 'WORK_TYPE_CODE_03') {
        emit('openDialog', dialogData)
        return
      }
      dialogData = {
        type: 'goModify',
        text: '예약 취소를 진행 하시겠습니까?',
        telNum: '',
        positiveButton: '확인',
        negativeButton: '취소',
        routeQuery: type,
        routeData: reservationItem
      }
      emit('openDialog', dialogData)
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.info-head {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.95rem;
  div {
    padding: 8px 12px;
    font-size: 1.1rem;
  }
}
.step-reservation-info {
  width: 100%;
  display: table;
  border-collapse: collapse;
  &-row {
    display: table-row;
    border-bottom: 1px solid #000000;
    border-top: 1px solid #000000;
  }
  &-col {
    display: table-cell;
    text-align: center;
    &:first-child {
      border-right: 1px solid #000000;
    }
  }
  &__btn {
    width: 100%;
    padding: 12px 24px;
    display: flex;
    justify-content: center;
    [class*='-btn'] {
      border-radius: 20px;
      box-shadow: none;
      font-weight: 600;
      &:first-child {
        margin-right: 24px;
      }
    }
  }
}
</style>
