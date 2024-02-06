<template>
  <v-container fluid class="pa-0">
    <div>
      <div class="info-head">
        <div>예약</div>
        2024년 00월 00일
      </div>
      <div class="step-reservation-info">
        <v-row class="step-reservation-info-row">
          <v-col cols="4" class="step-reservation-info-col">일시</v-col>
          <v-col cols="8" class="step-reservation-info-col"
            >2024년 00월 00일 00시 00분</v-col
          >
        </v-row>
        <v-row class="step-reservation-info-row">
          <v-col cols="4" class="step-reservation-info-col">진료과</v-col>
          <v-col cols="8" class="step-reservation-info-col">deptNm</v-col>
        </v-row>
        <v-row class="step-reservation-info-row">
          <v-col cols="4" class="step-reservation-info-col">의료진</v-col>
          <v-col cols="8" class="step-reservation-info-col">doctorNm</v-col>
        </v-row>
      </div>
      <div class="step-reservation-info__btn">
        <v-btn class="change-btn border-primary">예약 일시 변경</v-btn>
        <v-btn class="cancel-btn border-gray">예약 취소</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const propsItem = defineProps({
  step: {
    type: Number,
    default: 3
  },
  isLogin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([''])
</script>

<style lang="scss" scoped>
.info-head {
  display: flex;
  align-items: center;
  font-weight: 600;
  div {
    padding: 8px 12px;
    font-size: 1.08rem;
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
