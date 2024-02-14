<template>
  <v-container fluid class="pa-0">
    <div class="date-picker__title">
      <div>예약 일자 선택</div>
      <div>예약 일자를 선택해 주세요.</div>
    </div>
    <v-date-picker
      v-model="date"
      :allowed-dates="dateList"
    ></v-date-picker>
    <div class="time-box">
      <div class="time-title">시간 선택</div>
      <template v-if="timeList && timeList?.length >= 1">
        <div class="time-list">
          <button
            v-for="(item, index) in timeList"
            :key="`timeButton${index}`"
            :class="{ selected: item === time }"
            @click="selectTime(item)"
          >
            {{ item }}
          </button>
        </div>
      </template>
      <template v-else>
        <div style="text-align: center; padding: 12px 4px">
          예약 가능한 시간이 없습니다. 다른 일자를 선택해주세요.
        </div>
      </template>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { apis } from '../../api/api'

const propsItem = defineProps({
  step: {
    type: Number,
    default: 2
  },
  isLogin: {
    type: Boolean,
    default: false
  },
  selectedDoctor: {
    type: Object,
    default: () => {}
  }
})

const route = useRoute()

const store = useStore()

const selectDate = ref<string>('')
const date = ref()

const timeList = ref<any[]>()
const time = ref<string>()

const emit = defineEmits(['emitSelectedDateTime'])
const selectTime = (item: string) => {
  time.value = item
  const result: string = selectDate.value + time.value
  emit('emitSelectedDateTime', result)
}

const convertingTime = (item: string) => {
  const onlyNumberItem = item.replace(/[^0-9]/g, '')
  const itemYear = onlyNumberItem.substring(0, 4)
  const itemMonth = onlyNumberItem.substring(4, 6)
  const itemDate = onlyNumberItem.substring(6, 8)
  const itemHour = onlyNumberItem.substring(8, 10)
  const itemMinute = onlyNumberItem.substring(10, 12)

  const key = `${itemYear}-${itemMonth}-${itemDate}`
  const value = `${itemHour}:${itemMinute}`

  return [key, value]
}

const getTime = async () => {
  const params = {
    deptNo: propsItem.selectedDoctor.deptNo,
    doctorNo: propsItem.selectedDoctor.doctorNo,
    doctorNm: propsItem.selectedDoctor.doctorNm
  }
  const timeResponse = await apis.time(
    selectDate.value.replace(/-/g, ''),
    params,
    store.state.siteCode
  )

  if (timeResponse?.resultCd === '200') {
    const tempSum: any = {}
    timeResponse.contents.forEach((item: string) => {
      const [key, value] = convertingTime(item)
      if (key in tempSum) {
        const t = tempSum[key].push(value)
      } else {
        Object.assign(tempSum, { [key]: [value] })
      }
    })
    timeList.value = tempSum[selectDate.value]
  }
}

const dateList = ref<any[]>([])
const getDate = async () => {
  const params = {
    deptNo: propsItem.selectedDoctor.deptNo,
    doctorNo: propsItem.selectedDoctor.doctorNo
  }
  const dateResponse = await apis.date(params, store.state.siteCode)

  if (dateResponse?.resultCd === '200') {
    dateList.value = dateResponse.contents
    date.value = new Date(dateList.value[0])
  }
}

watch(date, (newVal) => {
  time.value = ''
  const selected = new Date(newVal)
  const year = selected.getFullYear()
  const month =
    selected.getMonth() + 1 < 10
      ? `0${selected.getMonth() + 1}`
      : selected.getMonth() + 1
  const day =
    selected.getDate() < 10 ? `0${selected.getDate()}` : selected.getDate()
  selectDate.value = `${year}-${month}-${day}`
  getTime()
})

if (
  (propsItem.isLogin && propsItem.step === 4) ||
  (!propsItem.isLogin && propsItem.step === 5) ||
  (route.query.type === 'change' && propsItem.step === 1)
) {
  getDate()
}
</script>

<style lang="scss" scoped>
.date-picker__title {
  padding: 12px 12px 0;
  div {
    &:first-child {
      font-weight: 600;
      font-size: 1.05rem;
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
.time-box {
  padding: 0 16px;
}
.time-title {
  padding: 0 0 0 10px;
  font-weight: 600;
  margin-bottom: 8px;
}
.time-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  button {
    max-width: calc(100% / 4 - 10px);
    flex: 1 1 20%;
    margin: 5px;
    padding: 4px 8px;
    border: 1px solid map-get($map: $colors, $key: primary);
    border-radius: 5px;
    &.selected {
      color: #fff;
      background: map-get($map: $colors, $key: primary);
    }
  }
}
</style>
