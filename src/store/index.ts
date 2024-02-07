import { createStore } from 'vuex'
interface IDialogData {
  type: string
  text: string
  telNum: string
  positiveButton: string
  negativeButton: string
  routeQuery?: string
  routeParams?: any
}

export default createStore({
  state: {
    siteCode: '',
    isDialog: false,
    dialogData: <IDialogData>{}
  },
  getters: {
    getIsDialog: (state) => {
      return state.isDialog
    },
    getDialogData: (state) => {
      return state.dialogData
    }
  },
  mutations: {
    setSiteCode(state, value) {
      state.siteCode = value
    },
    setDialog(state, value) {
      state.isDialog = value
    },
    setDialogData(state, value) {
      state.dialogData = value
    }
  }
})
