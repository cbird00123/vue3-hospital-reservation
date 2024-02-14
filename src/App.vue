<template>
  <div id="app">
    <suspense>
      <RouterView />
    </suspense>
    <Loading />
    <RpaLoading />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import '../src/assets/scss/main.scss';
@import '../src/assets/scss/vuetify-custom.scss';
</style>
