import VueI18n from 'vue-i18n'
import Vue from 'vue'


Vue.use(VueI18n)

const locale = 'nl'

const messages = {
    en: {
        message: {
            visit_store_info: 'Enter the store to get more information on this exhibit',
            select_tour: 'Select a tour',
            destination_looks_like: 'This is what the destination looks like:',
            total: 'total',
            route: 'Route description',
            locationError: 'Your location could not be retrieved',
            skip: 'Skip'
        }
    },
    nl: {
        message: {
            visit_store_info: 'Bezoek de winkel voor meer informatie over de expositie',
            select_tour: 'Selecteer een tour',
            destination_looks_like: 'Zo ziet de bestemming er uit:',
            total: 'totaal',
            route: 'Routebeschrijving',
            locationError: 'Uw locatie kon niet worden opgehaald',
            skip: 'Overslaan'
        }
    }
}
const i18n = new VueI18n({
    locale,
    messages
})

export default i18n