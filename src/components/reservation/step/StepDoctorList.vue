<template>
  <v-container fluid class="step-doctor-list">
    <div class="step-doctor-list__title">
      <div>진료의 선택</div>
      <div>진료를 받으실 진료의를 선택해 주세요.</div>
    </div>
    <v-radio-group v-model="selectDoctor" class="step-doctor-list__box">
      <v-radio
        v-for="(item, index) in itemList"
        :key="`doctorList${index}`"
        class="step-doctor-list__box-item"
        :value="item"
      >
        <template #label>
          <div
            v-if="item.doctorProfileImg"
            class="step-doctor-list__box-item__img"
          >
            <img
              :src="item.doctorProfileImg"
              alt="의료인의 프로파일 사진입니다."
            />
          </div>
          <div class="step-doctor-list__box-item__text">
            {{ item.doctorNm }}
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const PropsItem = defineProps({
  doctorList: {
    type: Array,
    default: () => []
  }
})

const itemList = ref<any>(PropsItem.doctorList)
const selectDoctor = ref<any>(itemList.value[0])
const emit = defineEmits(['emitSelectedDoctor'])
emit('emitSelectedDoctor', selectDoctor.value)
watch(selectDoctor, (newVal) => {
  emit('emitSelectedDoctor', newVal)
})
</script>

<style lang="scss" scoped>
.step-doctor-list {
  &__title {
    div {
      &:first-child {
        font-weight: 600;
        font-size: 1.05rem;
      }
      &:last-child {
        margin-bottom: 12px;
      }
    }
  }
  &__box {
    &-item {
      &__img {
        max-width: 15%;
        margin-right: 12px;
        @media screen and (max-width: 640px) {
          max-width: 55%;
        }
        img {
          width: 100%;
        }
      }
      &__text {
        width: 100%;
      }
    }
  }
}
</style>
