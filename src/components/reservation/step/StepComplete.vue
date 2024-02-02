<template>
  <v-container fluid class="step-complete">
    <v-row class="step-complete-row">
      <v-col cols="6" class="step-complete-col">text</v-col>
      <v-col cols="6" class="step-complete-col">text</v-col>
    </v-row>
    <v-row class="step-complete-row">
      <v-col cols="6" class="step-complete-col">text</v-col>
      <v-col cols="6" class="step-complete-col">text</v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.step-complete {
  display: table;
  border-collapse: collapse;
  &-row {
    display: table-row;
  }
  &-col {
    display: table-cell;
    border: 1px solid #000000;
    text-align: center;
  }
}
</style>
