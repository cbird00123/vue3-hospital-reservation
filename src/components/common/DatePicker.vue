<template>
  <v-date-picker v-model="date" :model-value="date"></v-date-picker>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { useDate } from 'vuetify'

const today = dayjs().format('YYYY-MM-DD')

const date = ref(useDate().parseISO(today))

const updateDate = ref<string>('')

watch(date, (newVal) => {
  const selectDate = new Date(newVal)
  const year = selectDate.getFullYear()
  const month =
    selectDate.getMonth() + 1 < 10
      ? `0${selectDate.getMonth() + 1}`
      : selectDate.getMonth() + 1
  const day = selectDate.getDate()

  updateDate.value = `${year}-${month}-${day}`
  console.log(updateDate.value)
})
</script>

<style lang="scss" scoped></style>
