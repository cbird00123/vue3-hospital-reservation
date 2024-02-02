<template>
  <v-container fluid class="login-container">
    <v-text-field
      v-model="params.patientNm"
      variant="outlined"
      label="성명"
      maxlength="6"
      :model-value="params.patientNm"
      :rules="[
        (v) =>
          /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/gi.test(v) ||
          '특수문자나 공백은 입력할 수 없습니다.',
        (v) => (v || '').length >= 2 || '최소 2자를 넘어야 합니다.',
        (v) => (v || '').length <= 6 || '최대 6자 이내 입력이 가능합니다.'
      ]"
    ></v-text-field>
    <v-text-field
      v-model="params.telNum"
      variant="outlined"
      label="전화번호"
      :model-value="params.telNum"
      maxlength="13"
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
      @keyup="(e) => login(e)"
    ></v-text-field>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['emitLogin'])

const params = ref({
  patientNm: '황성민',
  telNum: '010-8908-5746',
  birth: '2003-07-03'
})
const login = (event: any) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    emit('emitLogin', params.value, store.state.siteCode)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
}
</style>
