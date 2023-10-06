import './base.scss'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ColorPicker from 'primevue/colorpicker'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import Tooltip from 'primevue/tooltip'

import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import { createPinia } from 'pinia'
import i18n from './assets/locales/i18n'

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(PrimeVue, { ripple: true })
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)
app.use(pinia)

app.component('ColorPicker', ColorPicker)
app.component('PrimeDialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('PrimeToast', Toast)

app.directive('tooltip', Tooltip)
app.mount('#app')
