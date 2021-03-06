import Vue from 'vue'
import { app } from '../main'
import types from 'vue'

export default {

  setLoading: function (state, bool) {
    state.isLoading = bool
  },
  setResource: function (state, value) {
    state.resource = value
  },
  setExhibit: function (state, exhibit) {
    state.selectedExhibit = exhibit
  },
  setDestination: function (state, exhibit) {
    state.destinationExhibit = exhibit
  },
  setAtDestination: function (state, atDestination) {
    state.atDestination = atDestination
  },
  locationError: function (state, locationError) {
    state.locationError = locationError
  },
  showMenu: function (state, showMenu) {
    state.showMenu = showMenu
  },
  setLang: function (state, lang) {
      app.$i18n.locale = lang
  }
}

export const mutations = {
    [types.SET_LANG] (state, payload) {
        app.$i18n.locale = payload
    }
}
