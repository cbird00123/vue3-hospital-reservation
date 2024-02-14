import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { ko } from 'vuetify/locale'

import dayjs from 'dayjs'

import App from './App.vue'
import router from './router'
import store from './store'

import Dialog from './components/common/Dialog.vue'
import Loading from './components/common/Loading.vue'
import RpaLoading from './components/common/RpaLoading.vue'

const LightTheme: ThemeDefinition = {
  dark: false,
  variables: {},
  colors: {
    primary: '#1a48c0',
    secondary: '#b0b0b0'
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: LightTheme,
      variables: {}
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  locale: {
    locale: 'ko',
    fallback: 'ko',
    messages: { ko }
  },
  defaults: {
    VDatePicker: {
      hideHeader: true,
      hideActions: true,
      showAdjacentMonths: false
    }
  }
})

const app = createApp(App)

app.component('Dialog', Dialog).component('Loading', Loading).component('RpaLoading', RpaLoading)
app.use(vuetify).use(dayjs).use(router).use(store)
app.mount('#app')
