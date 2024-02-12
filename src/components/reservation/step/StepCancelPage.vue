<template>
  <v-container fluid class="step-interview-list">
    <div class="step-interview-list__title">
      <div>취소사유 선택</div>
      <div>취소사유를 선택해 주세요.</div>
    </div>
    <v-radio-group v-model="selectItem" class="step-interview-list__box">
      <v-radio
        v-for="(item, index) in cancelCodeList"
        :key="`interviewList${index}`"
        class="step-interview-list__box-item"
        :value="item"
      >
        <template #label>
          <div class="step-interview-list__box-item__text">
            {{ item.code }}
          </div>
        </template>
      </v-radio>
    </v-radio-group>
    <v-text-field
      v-if="isEtc"
      v-model="etcText"
      variant="outlined"
      label="사유"
      :model-value="etcText"
    ></v-text-field>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const emit = defineEmits(['emitSetCancelCode'])

const store = useStore()
const cancelCodeList = [
  {
    code: '바쁜 일이 생겼음'
  },
  {
    code: '비용 문제로 고민'
  },
  {
    code: '아프지 않아서'
  },
  {
    code: '기타'
  }
]
const selectItem = ref<any>(cancelCodeList[0])
const isEtc = ref<boolean>(false)
const etcText = ref<string>('')

emit('emitSetCancelCode', selectItem.value.code)

watch(selectItem, (newVal) => {
  if (newVal.code.includes('기타')) {
    isEtc.value = true
  } else {
    isEtc.value = false
    emit('emitSetCancelCode', newVal.code)
  }
})

watch(etcText, (newVal) => {
  emit('emitSetCancelCode', newVal)
})
</script>

<style lang="scss" scoped>
.step-interview-list {
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
      &__text {
        width: 100%;
      }
    }
  }
}
</style>
