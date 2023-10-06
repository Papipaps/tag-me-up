import {createI18n} from 'vue-i18n'
import en from "./eng.json"
import fr from "./fra.json"

const lang = navigator.language
function loadLocaleMessages(){
    return { en, fr }
}

export default createI18n({
    allowComposition:true,
    locale: lang,
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
})
