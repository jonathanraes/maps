import VueI18n from 'vue-i18n'
import Vue from 'vue'


Vue.use(VueI18n)

const locale = 'nl'

const messages = {
    en: {
        message: {
            visit_store_info: 'Enter the store for more information',
            select_tour: 'Select a tour',
            destination_looks_like: 'This is what the destination looks like:',
            total: 'total',
            route: 'Route description',
            locationError: 'Your location could not be retrieved',
            skip: 'Skip',
            next_destination: 'Continue tour'
        }
    },
    nl: {
        message: {
            visit_store_info: 'Bezoek de winkel voor informatie',
            select_tour: 'Selecteer een tour',
            destination_looks_like: 'Zo ziet de bestemming er uit:',
            total: 'totaal',
            route: 'Routebeschrijving',
            locationError: 'Uw locatie kon niet worden opgehaald',
            skip: 'Overslaan',
            next_destination: 'Volgende bestemming'
        }
    }
}
const i18n = new VueI18n({
    locale,
    messages
})

export default i18n