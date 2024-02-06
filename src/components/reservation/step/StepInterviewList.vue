<template>
  <v-container fluid class="step-interview-list">
    <v-radio-group v-model="selectItem" class="step-interview-list__box">
      <v-radio
        v-for="(item, index) in interviewList"
        :key="`interviewList${index}`"
        class="step-interview-list__box-item"
        :value="item"
      >
        <template #label>
          <div class="step-interview-list__box-item__text">
            {{ item.interview }}
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { apis } from '../../../api/api'

const { step, isLogin } = defineProps({
  step: {
    type: Number,
    default: 2
  },
  isLogin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['emitSetDoctor'])

const setDoctorList = (list: any[]) => {
  const doctorList = list.reduce((sum, item, index) => {
    item.doctorList.forEach((doctor: any) => {
      if (index > 0) {
        sum.forEach((sumDoctor: any) => {
          if (doctor.doctorNo !== sumDoctor.doctorNo) {
            sum.push(doctor)
          }
        })
      } else {
        sum.push(doctor)
      }
    })
    return sum
  }, [])
  emit('emitSetDoctor', doctorList)
}

const store = useStore()
const interviewList = ref<any[]>([])
const selectItem = ref<any>()
const getInterview = async () => {
  const interviewResponse = await apis.interview(store.state.siteCode)

  if (interviewResponse?.resultCd === '200') {
    interviewList.value = interviewResponse.contents[0].interviewList
    selectItem.value = interviewList.value[0]

    setDoctorList(interviewList.value)
  }
}

if ((isLogin && step === 2) || (!isLogin && step === 3)) {
  getInterview()
}
</script>

<style lang="scss" scoped>
.step-interview-list {
  &__box {
    &-item {
      &__text {
        width: 100%;
      }
    }
  }
}
</style>
