<template>
  <v-container fluid>{{ step.step }} </v-container>
</template>

<script setup lang="ts">
const step = defineProps({
  step: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="scss" scoped></style>
