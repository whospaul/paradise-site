import './assets/main.css'

import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'

createApp(App).component('VueDatePicker', VueDatePicker).use(VueCookies).mount('#app')
