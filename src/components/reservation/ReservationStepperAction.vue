<template>
  <v-stepper-actions
    v-if="watchStep !== 6 && (watchStep !== 1 || isLogin)"
    :key="`action${watchStep}`"
  >
    <template #prev>
      <v-btn class="step_btn secondary" @click="changeStep('down')">
        이전으로
      </v-btn>
    </template>
    <template #next>
      <v-btn class="step_btn primary" @click="changeStep('up')">
        다음으로
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

const propsItem = defineProps({
  step: {
    type: Number,
    default: 1
  },
  isLogin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['emitChangeStep', 'emitLogin'])
const watchStep = ref(1)
watch(propsItem, (newVal) => {
  watchStep.value = newVal.step
})

const changeStep = (type: string) => {
  if (type === 'down') {
    emit('emitChangeStep', propsItem.step - 1 < 1 ? 1 : propsItem.step - 1)
  } else {
    emit('emitChangeStep', propsItem.step + 1)
  }
}

const buttonText = ref<string>(
  propsItem.step === 1 && !propsItem.isLogin ? '로그인' : '닫기'
)

const activeButton = () => {
  if (propsItem.step === 1 && !propsItem.isLogin) {
    emit('emitLogin')
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
