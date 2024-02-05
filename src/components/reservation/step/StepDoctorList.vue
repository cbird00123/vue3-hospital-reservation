<template>
  <v-container fluid class="step-doctorList-list">
    <v-radio-group v-model="selectItem" class="step-doctorList-list__box">
      <v-radio
        v-for="(item, index) in itemList"
        :key="`doctorList${index}`"
        class="step-doctorList-list__box-item"
        :value="item"
      >
        <template #label>
          <div class="step-doctorList-list__box-item__text">
            {{ item.doctorNm }}
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { doctorList } = defineProps({
  doctorList: {
    type: Array,
    default: () => []
  }
})

const itemList = ref(doctorList)
const selectItem = ref(itemList.value[0])
console.log(itemList)
</script>

<style lang="scss" scoped>
.step-doctorList-list {
  &__box {
    &-item {
      &__text {
        width: 100%;
      }
    }
  }
}
</style>
