<template>
  <v-container fluid class="login-container">
    <v-form ref="loginForm">
      <v-text-field
        v-model="params.patientNm"
        variant="outlined"
        label="성명"
        maxlength="6"
        :model-value="params.patientNm"
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
        :model-value="params.telNum"
        maxlength="13"
        :rules="[formRule('require'), formRule('phone')]"
        @input="
          () => {
            params.telNum = formInput('phone', params.telNum)
          }
        "
      ></v-text-field>
      <v-text-field
        v-model="params.birth"
        variant="outlined"
        label="생년월일"
        :model-value="params.birth"
        maxlength="10"
        :rules="[formRule('require'), formRule('birth')]"
        @input="
          () => {
            params.birth = formInput('birth', params.birth)
          }
        "
        @keyup="(e) => login(e)"
      ></v-text-field>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formInput, formRule } from '../../api/form'

const emit = defineEmits(['emitLogin', 'emitChangeParams'])

const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || ref({})

const params = ref({
  patientNm: userInfo?.patientNm || '',
  telNum: userInfo?.telNum || '',
  birth: userInfo?.birth || ''
})

watch(
  params,
  (newVal) => {
    emit('emitChangeParams', newVal)
  },
  { deep: true }
)
const login = (event: any) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    emit('emitLogin')
  }
}
</script>

<style lang="scss" scoped>
.login-container {
}
</style>
