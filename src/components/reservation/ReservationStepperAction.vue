<template>
  <v-stepper-actions v-if="!noneActionButton" :key="`action${watchStep}`">
    <template #prev>
      <v-btn class="step_btn secondary" @click="changeStep('down')">
        이전으로
      </v-btn>
    </template>
    <template #next>
      <v-btn class="step_btn primary" @click="changeStep('up')">
        {{ nextButtonText }}
      </v-btn>
    </template>
  </v-stepper-actions>
  <div v-else class="primary_btn">
    <v-btn class="primary" :ripple="false" @click="activeButton">{{
      buttonText
    }}</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const propsItem = defineProps({
  step: {
    type: Number,
    default: 1
  },
  isLogin: {
    type: Boolean,
    default: false
  },
  noneActionButton: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'emitChangeStep',
  'callEvent',
  'emitReservation',
  'emitHistory'
])

const eventCall = () => {
  switch (propsItem.type) {
    case 'reservationHistory':
      emit('emitHistory')
      break
    default:
      break
  }
}

if (propsItem.isLogin) {
  eventCall()
}

const route = useRoute()

const nextButtonText = ref<string>('다음으로')

switch (route.query.type) {
  case 'change':
    nextButtonText.value = '예약변경'
    break
  case 'cancel':
    nextButtonText.value = '예약취소'
    break
}

const watchStep = ref(1)
const buttonText = ref<string>('로그인')
watch(propsItem, (newVal) => {
  watchStep.value = newVal.step
  nextButtonText.value =
    (propsItem.isLogin && newVal.step === 4) ||
    (!propsItem.isLogin && newVal.step === 5)
      ? '예약하기'
      : '다음으로'
  buttonText.value =
    newVal.step === 1 && !propsItem.isLogin ? '로그인' : '예약내역보기'
  if (!newVal.isLogin && newVal.type && newVal.step === 2) {
    eventCall()
  }
})

const changeStep = async (type: string) => {
  if (type === 'down') {
    if (watchStep.value === 2 && !propsItem.isLogin) {
      sessionStorage.removeItem('userInfo')
    }
    emit('emitChangeStep', propsItem.step - 1 < 1 ? 1 : propsItem.step - 1)
  } else if (
    (propsItem.isLogin && watchStep.value === 4) ||
    (!propsItem.isLogin && watchStep.value === 5) ||
    route.query.type
  ) {
    if (route.query.type) {
      if (route.query.type === 'change') {
        await emit('emitReservation', 'change')
      } else {
        await emit('emitReservation', 'cancel')
      }
    } else {
      await emit('emitReservation')
    }
  } else {
    emit('emitChangeStep', propsItem.step + 1)
  }
}

const router = useRouter()
const activeButton = () => {
  if (propsItem.step === 1 && !propsItem.isLogin) {
    emit('callEvent')
  }
  if (
    (propsItem.step === 6 && !propsItem.isLogin) ||
    (propsItem.step === 5 && propsItem.isLogin)
  ) {
    router.replace({
      name: 'reservation-inquiry',
      query: {
        ...route.query
      }
    })
  }
  if (route.query.type) {
    delete route.query.type
    router.replace({
      name: 'reservation-inquiry',
      query: {
        ...route.query
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.step_btn {
  min-width: 120px;
  width: 40%;
}
.primary_btn {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
  button {
    width: 100%;
  }
}
</style>
