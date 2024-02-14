<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="320"
    content-class="popup-dialogs"
  >
    <div class="popup-dialogs__container">
      <div v-html="dialogData.text"></div>
      <div
        v-show="dialogData.positiveButton || dialogData.negativeButton"
        class="popup-dialogs__btn"
      >
        <v-btn
          v-show="dialogData.negativeButton"
          :ripple="false"
          class="dialog-btn secondary"
          @click="closeModal"
        >
          {{ dialogData.negativeButton }}
        </v-btn>
        <v-btn
          v-show="dialogData.positiveButton"
          :ripple="false"
          class="dialog-btn primary"
          @click="active"
        >
          {{ dialogData.positiveButton }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const dialog = ref<boolean>(store.getters.getIsDialog)
const dialogData = ref<any>(store.getters.getDialogData)

const closeModal = () => {
  dialog.value = false
  store.commit('setDialog', false)
}

const active = () => {
  if (dialogData.value.type !== 'goModify') {
    dialogData.value.routeParams = {}
  }
  switch (dialogData.value.type) {
    case 'normal':
      closeModal()
      break
    case 'call':
      document.location.href = `tel:${dialogData.value.telNum}`
      closeModal()
      break
    case 'goModify':
      router.replace({
        name: 'reservation-modify',
        query: {
          ...route.query,
          type: dialogData.value.routeQuery
        },
        state: { reservationItem: { ...dialogData.value.routeParams } }
      })
      closeModal()
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/valiables.scss';

.popup-dialogs {
  &__container {
    background: #ffffff;
    padding: 24px;
    border-radius: 15px;
    text-align: center;
    font-size: 0.85rem;
  }
  &__btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 28px;
    .dialog-btn {
      box-shadow: none;
      border-radius: 20px;
      padding: 8px 20px;
      &.secondary {
        margin-right: 24px;
      }
    }
  }
}
</style>
