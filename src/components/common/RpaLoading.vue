<template>
  <div id="rpa-loading" ref="rpaLoading">
    <div class="rpa-loading__container">
      <div class="rpa-loading__texts">
        <div>[ 데이터를 처리하고 있습니다. ]</div>
        <template v-if="rpaUse">
          <div>
            <div class="f-primary">서비스 접속자</div>
            <span class="pr-1">는</span>
            <div class="pr-1 f-primary">{{ waitingMemberStr }}</div>
            <span>이며,</span>
          </div>
          <div>
            <div class="f-primary">예상 처리 시간</div>
            <span class="pr-1">은</span>
            <div class="pr-1 f-primary">{{ waitingTimeStr }}</div>
            <span>입니다.</span>
          </div>
        </template>
        <div>잠시만 기다려주세요..</div>
      </div>
      <div class="rpa-loading__progress pt-4">
        <v-progress-linear
          class="rpa-loading__bar"
          background-color="#ECEBF0"
          :model-value="setPercentage"
          color="#1a48c0"
          :indeterminate="isWaitedEnough"
          height="3px"
          rounded
        ></v-progress-linear>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { apis } from '../../api/api'

const isWaitedEnough = ref<boolean>(false)
const waitingMember = ref<number>(0)
const waitingTime = ref<number>(0)
const waitingMemberStr = ref<string>('~명')
const waitingTimeStr = ref<string>('1분 미만')
const waitingTopTime = ref<number>(0)

const setResult = (value: number) => {
  isWaitedEnough.value = value === 100
}

const setPercentage = computed({
  get: () => {
    const percent = 100 / waitingTopTime.value
    const value = waitingTopTime.value - waitingTime.value
    const result = value * percent

    setResult(result)

    return result
  },
  set: () => {}
})

const initWaitValues = () => {
  waitingMember.value = 0
  waitingTime.value = 0
  waitingMemberStr.value = '~명'
  waitingTimeStr.value = '1분 미만'
}

const minusSecond = () => {
  setTimeout(() => {
    if (waitingTime.value > 0) {
      waitingTime.value -= 1
      waitingMemberStr.value = `${Math.ceil(waitingTime.value / 15)}명`
      waitingTimeStr.value = `${waitingTime.value}초`
      setTimeout(() => {
        minusSecond()
      }, 1000)
    } else {
      waitingTimeStr.value = '1분 미만'
    }
  }, 1000)
}

const store = useStore()
const rpaTimeout = async () => {
  const response = await apis.rpaLoading(store.state.siteCode, 'rpa')

  waitingMember.value =
    response?.waitingMember === 0 ? '1' : response?.waitingMember
  waitingTime.value = response?.waitingTime
  waitingTopTime.value = response?.waitingTime

  waitingMemberStr.value = `${waitingMember.value}명`
  waitingTimeStr.value = `${waitingTime.value}초`

  minusSecond()
}

const onClassChange = async (classAttrValue: string) => {
  const classList = classAttrValue.split(' ')

  if (classList.includes('rpa-loading-transition')) {
    initWaitValues()

    await rpaTimeout()
  }
  if (classList.includes('')) {
    initWaitValues()
  }
}

let observer: any
const rpaUse = ref<boolean>(false)
onMounted(() => {
  const rpaLoading = document.querySelector('#rpa-loading')
  observer = new MutationObserver((mutations) => {
    rpaUse.value = true

    // eslint-disable-next-line no-restricted-syntax
    for (const m of mutations) {
      // @ts-ignore
      const newValue = m.target.getAttribute(m.attributeName)
      nextTick(() => {
        onClassChange(newValue)
      })
    }
  })

  observer.observe(rpaLoading, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  observer.disconnect()
})

console.log('rpaLoading')
</script>

<style lang="scss" scoped>
#rpa-loading {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  display: none;
  //display: flex;
  background-color: rgb(0 0 0 / 60%);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .rpa-loading__container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: column;
    width: 80vw;
    height: 180px;
    max-width: 356px;
    border: 1px solid #fff;
    border-radius: 15px;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    font-size: 1.05rem;
    overflow: hidden;
    position: relative;

    &:before {
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
      -webkit-backdrop-filter: blur(10px) saturate(100%) contrast(45%)
        brightness(130%);
      content: '';
      height: 100%;
      position: absolute;
      width: 100%;
    }
    .rpa-loading__progress {
      padding: 0 24px;

      .rpa-loading__bar {
        .v-progress-linear__determinate.primary {
          background-image: linear-gradient(to right, blue, pink);
        }
      }
    }
    .rpa-loading__texts {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      font-weight: 700;
      color: #333333;
      position: relative;
      z-index: 2;
    }

    .rpa-loading__texts > div:not(:last-child) {
      padding-bottom: 4px;
    }

    .rpa-loading__texts > div:nth-child(2),
    .rpa-loading__texts > div:nth-child(3) {
      display: inline-flex;
    }
  }
}
#rpa-loading.rpa-loading-transition {
  display: flex;
}
</style>
