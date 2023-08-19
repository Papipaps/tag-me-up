import './assets/main.css'
 
import 'primevue/resources/themes/lara-light-blue/theme.css'
 
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import ColorPicker from 'primevue/colorpicker'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'

import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

const app = createApp(App)
app.use(PrimeVue, { ripple: true })
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)

app.component('PrimeButton', Button)
app.component('ColorPicker', ColorPicker)
app.component('PrimeDialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('PrimeToast',Toast)

app.mount('#app')
