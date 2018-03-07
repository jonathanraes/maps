import Vue from 'vue'

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
  }
}

