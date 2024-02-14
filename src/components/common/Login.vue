<template>
  <v-container fluid class="login-container">
    <v-form ref="loginForm">
      <v-text-field
        v-model="params.patientNm"
        variant="outlined"
        label="성명"
        maxlength="6"
        :rules="[
          formRule('require'),
          formRule('notSpecialCharacter'),
          formRule('min', 2),
          formRule('max', 6)
        ]"
      ></v-text-field>
      <v-text-field
        v-model="params.telNum"
        variant="outlined"
        label="전화번호"
        maxlength="13"
        :rules="[formRule('require'), formRule('phone')]"
        @input="params.telNum = formInput('phone', params.telNum)"
      ></v-text-field>
      <v-text-field
        v-model="params.birth"
        variant="outlined"
        label="생년월일"
        maxlength="10"
        :rules="[formRule('require'), formRule('birth')]"
        @input="params.birth = formInput('birth', params.birth)"
        @keyup="(e: any) => login(e)"
      ></v-text-field>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formInput, formRule, formValidation } from '../../api/form'

const loginForm = ref()

const propsItem = defineProps({
  callEvent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['emitLogin', 'emitChangeParams', 'openDialog'])

const userInfo = ref<any>()
const params = ref<any>({
  patientNm: '',
  telNum: '',
  birth: ''
})
if (sessionStorage.getItem('userInfo')) {
  const item: string = sessionStorage.getItem('userInfo') || ''
  userInfo.value = JSON.parse(item)
  params.value = {
    patientNm: userInfo?.value.patientNm || '',
    telNum: userInfo?.value.telNum || '',
    birth: userInfo?.value.birth || ''
  }
}

watch(
  params,
  (newVal) => {
    emit('emitChangeParams', newVal)
  },
  { deep: true }
)

const validate = () => {
  return formValidation(loginForm)
}

const login = async (event: any) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    if (await validate()) {
      emit('emitLogin')
    } else {
      const dialogData = {
        type: 'normal',
        text: '서비스 사용을 위해 필요한 정보를<br/> 입력해주세요.',
        positiveButton: '확인',
        negativeButton: ''
      }
      emit('openDialog', dialogData)
    }
  }
}

watch(propsItem, (newVal) => {
  if (newVal.callEvent) {
    login({ code: 'Enter' })
  }
})
</script>

<style lang="scss" scoped>
.login-container {
}
</style>
