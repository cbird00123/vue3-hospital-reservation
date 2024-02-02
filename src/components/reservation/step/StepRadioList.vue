<template>
  <v-container fluid class="step-radio-list">
    {{ selectItem }}
    <v-radio-group v-model="selectItem" class="step-radio-list__box">
      <v-radio
        v-for="(item, index) in itemList"
        :key="`radioList${index}`"
        class="step-radio-list__box-item"
        :value="item"
      >
        <template #label>
          <div class="step-radio-list__box-item__text">
            {{ item.text }}
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const itemList = reactive([
  {
    id: 1,
    text: '11'
  },
  {
    id: 2,
    text: '22'
  },
  {
    id: 3,
    text: '33'
  },
  {
    id: 4,
    text: '44'
  }
])

const selectItem = ref(itemList[0])
</script>

<style lang="scss" scoped>
.step-radio-list {
  &__box {
    &-item {
      &__text {
        width: 100%;
      }
    }
  }
}
</style>
