<template>
    <div>

        <div id="map"></div>
        <div class="wrapper">
            <template v-if="selectedExhibit">
                <template v-if="atDestination">
                    <div class="destination-reached-text">Bestemming bereikt!</div>
                    <div class="row h-100 destination-reached">
                        <div class="col-4">
                        </div>
                        <div class="streetview-image col-3">
                            <!--<img v-bind:src="imageURL" >-->
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary" v-on:click="nextDestination()">Volgende bestemming</button>
                        </div>
                    </div>
                </template>

                <div class="row h-100">
                    <div class="col-3">
                        <div class="selected-location-title">{{ selectedExhibit.formatted_address }}</div>
                        <br>
                        <div class="selected-location-name">{{ selectedExhibit.storeName }}</div>
                        <br>
                        <div class="selected-location-body">{{ selectedExhibit.infoText }}</div>
                    </div>

                    <div class="col-3">
                        <div class="selected-location-distance">
                            Afstand:
                            <br>
                            {{ selectedExhibit.distance.duration.text }} lopen
                            <br>
                            {{ selectedExhibit.distance.distance.text }}
                        </div>
                    </div>

                    <div class="col-3">
                        <button class="btn btn-primary" v-on:click="routeTo(selectedExhibit)" v-if="selectedExhibit != destinationExhibit">Routebeschrijving</button>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>

<script>
  /*jslint white: true */

  import axios from 'axios'
  // import Vue from 'vue'
  // import Vuex from 'vuex'
  import store from '../store/index'

  // var googleClient = require('@google/maps').createClient({
  //   key: 'AIzaSyA7g2inijoh5NVHqaoKjE7dgpR6kRXI6Ls'
  // })

  // import * as VueGoogleMaps from 'vue2-google-maps'
  var GoogleMapsLoader = require('google-maps') // only for common js environments
  GoogleMapsLoader.KEY = 'AIzaSyA7g2inijoh5NVHqaoKjE7dgpR6kRXI6Ls'
  var google

  // !!! Used to be loading block

  let $backend = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })
  //

  // Vue.use(Vuex)
  // const store = new Vuex.Store({
  //   strict: true,
  //   state: {
  //     selectedExhibit: null,
  //     destinationExhibit: null,
  //     atDestination: false
  //   },
  //   mutations: {
  //     setExhibit: function (state, exhibit) {
  //       state.selectedExhibit = exhibit
  //     },
  //     setDestination: function (state, exhibit) {
  //       state.destinationExhibit = exhibit
  //     },
  //     setAtDestination: function (state, atDestination) {
  //       state.atDestination = atDestination
  //     }
  //   },
  //   actions: {
  //
  //   }
  // })

  export default {
    name: 'MapsComponent',
    store: store,
    data () {
      return {
        // atDestination: this.$store.state.atDestination
      }
    },
    watch: {
      viewToggleOther (bool) {
        this.setToggle('other', bool)
      }
    },
    methods: {
      nextDestination: function () {
        activateClosestExhibitDistanceMatrix()
      },
      routeTo: function (exhibit) {
        routeTo(exhibit)
      }
    },
    computed: {
      resource () {
        // To display `resourceOne` value from the backend
        return this.$store.state.resource
      },
      selectedExhibit () {
        return this.$store.state.selectedExhibit
      },
      destinationExhibit () {
        return this.$store.state.destinationExhibit
      },
      atDestination () {
        return this.$store.state.atDestination
      }

    },
    mounted () {
      GoogleMapsLoader.load(function (googlemaps) {
        console.log('loading google maps')
        google = googlemaps
        initMap()
        updateLocation(false)
        addMapMarkers().then(() => {
          activateClosestExhibitDistanceMatrix()
          setInterval(function () {
            updateLocation(false)
          }, 1000)
        })
      })
    }
  }

  var mapCenter = {lat: 52.011, lng: 4.3593}
  var infoWindow
  var map

  var directionsDisplay
  var directionsService
  var distanceService

  var currentLocation
  var locationMarker
  var accuracyCircle

  var DestinationReachedDistance = 0.00006
  let exhibits = []

  var destinationExhibit

  function initMap () {
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer()
    distanceService = new google.maps.DistanceMatrixService()
    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      zoom: 16
    })
    directionsDisplay.setMap(map)
    directionsDisplay.setOptions({suppressMarkers: true})
  }

  function getStraightDistance (point1, point2) {
    // console.log('distance= ' + Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lng - point2.lng, 2)))
    return Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lng - point2.lng, 2))
  }

  function addMapMarkers () {
    return $backend.get('resource/one').then(response => {
    exhibits = response.data
    for (let exhibit of exhibits) {
      (function (exhibit) {
        var marker = new google.maps.Marker({
          position: exhibit.location,
          map: map,
          title: exhibit.address
        })
        marker.addListener('click', function (event) {
          if (!infoWindow) infoWindow = new google.maps.InfoWindow()
          infoWindow.setOptions({
            content: '<div class="infoWindow">' + exhibit.formatted_address + '<br><br>' +
            exhibit.infoText + '<br>', // +
            // routeButton + '</div>',
            position: exhibit.location
          })
          store.commit('setExhibit', exhibit)
          // Vue.set(selectedExhibit, selectedExhibit, exhibit)
          infoWindow.open(map, this)
          // var onChangeHandler = function() {
          //   vm.destinationExhibit = exhibit
          //   calculateAndDisplayRoute(directionsService, directionsDisplay, exhibit.location)
          // }
          // document.getElementById('navbutton').addEventListener('click', function () {
          //   routeTo(exhibit)
          // })
        })
      })(exhibit)
    }
      }).catch(error => console.log(error))
  }

  function updateLocation (centre) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        currentLocation = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
          accuracy: parseFloat(position.coords.accuracy)
        }

        if (!locationMarker) {
          // Create marker
          locationMarker = new google.maps.Marker({
            clickable: false,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
              new google.maps.Size(22, 22),
              new google.maps.Point(0, 18),
              new google.maps.Point(11, 11)),
            title: 'Huidige locatie',
            zIndex: 999,
            position: currentLocation,
            map: map
          })
          accuracyCircle = new google.maps.Circle({
            map: map,
            radius: currentLocation.accuracy,
            fillColor: '#dae8ff',
            strokeColor: '#dae8ff',
            strokeOpacity: 1,
            strokeWeight: 1,
            fillOpacity: 0.5
          })
          accuracyCircle.bindTo('center', locationMarker, 'position')
        }

        locationMarker.setPosition(currentLocation)
        accuracyCircle.setRadius(currentLocation.accuracy)
        if (!store.state.atDestination /* && selectedExhibit */ && destinationExhibit && getStraightDistance(store.state.destinationExhibit.location, currentLocation) < DestinationReachedDistance) {
          // Destination Reached
          console.log('reached destination ' + exhibits.length)
          if (exhibits.indexOf(store.state.selectedExhibit) > -1) {
            exhibits.splice(exhibits.indexOf(store.state.selectedExhibit), 1)
          }
          console.log('reached destination ' + exhibits.length)
          // activateClosestExhibitDistanceMatrix()
          store.commit('setAtDestination', true)

          reachedDestination(store.state.selectedExhibit.location)
        }
        // if (vm.selectedExhibit)
        //   calculateRoute(directionsService, vm.selectedExhibit.location)
        if (centre) {
          map.setCenter(currentLocation)
        }
      },
      function () {
        // Location retrieval error
        if (!infoWindow) {
          infoWindow = new google.maps.InfoWindow()
          handleLocationError(true, infoWindow, map.getCenter())
        }
      })
    } else {
      // Browser doesn't support Geolocation
      if (!infoWindow) {
        infoWindow = new google.maps.InfoWindow()
        handleLocationError(false, infoWindow, map.getCenter())
      }
    }
  }

  function activateClosestExhibitDistanceMatrix (skipamount = 0) {
    var locations = []
    var distances = []
    for (let exhibit of exhibits) {
      locations.push(exhibit.formatted_address)
    }
    for (var i = 0; i < locations.length; i + 25) {
      // console.log(currentLocation)
      // Obtain all distances using the distance matrix in groups of 25 destinations max
      distanceService.getDistanceMatrix(
        {
          origins: [currentLocation],
          destinations: locations.splice(i, i + 25),
          travelMode: 'WALKING'
        }, function (response, status) {
          if (response) {
            distances = distances.concat(response.rows[0].elements)
            for (var j = 0; j < response.destinationAddresses.length; j++) {
              for (let exhibit of exhibits) {
                if (exhibit.formatted_address === response.destinationAddresses[j]) {
                  exhibit['distance'] = response.rows[0].elements[j]
                }
              }
            }
            if (distances.length >= exhibits.length) {
              // When distance array is filled up
              // var closest_exhibit = vm.exhibits[0]
              // for (exhibit of vm.exhibits) {
              //   if (!exhibit.distance) {
              //     // Not possible anymore due to length check
              //     console.error('MISSING DIST: ')
              //     console.log(exhibit)
              //   } else if (exhibit.distance.duration.value < closest_exhibit.distance.duration.value) {
              //     closest_exhibit = exhibit
              //   }
              // }
              exhibits.sort(function (a, b) {
                if (a.distance && b.distance) {
                  return a.distance.duration.value - b.distance.duration.value
                } else {
                  return 999999999
                }
              })

              store.commit('setExhibit', exhibits[skipamount])
              // Vue.set(selectedExhibit, 'selectedExhibit', exhibits[skipamount])
              // destinationExhibit = exhibits[skipamount].location
              store.commit('setDestination', exhibits[skipamount])

              calculateAndDisplayRoute(directionsService, directionsDisplay, exhibits[skipamount].location)
            }
          } else {
            console.error(status)
          }
        })
    }
  }

  function reachedDestination (destination) {
    var sub = {lat: destination.lat - currentLocation.lat, lng: destination.lng - currentLocation.lng}
    // var sub = { lat: destination.location.lat - vm.destination.lat, lng: destination.location.lng - vm.destination.lng }
    var angle = Math.atan2(sub.lng, sub.lat) * 180 / Math.PI
    console.log('angle: ' + angle)
    // vm.imageURL = sprintf(streetViewURL, destination.location.lat, destination.location.lng, angle)
  }

  function handleLocationError (browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : 'Error: Your browser doesn\'t support geolocation.')
    infoWindow.open(map)
  }

  function routeTo (exhibit) {
    store.commit('setDestination', exhibit)
    calculateAndDisplayRoute(directionsService, directionsDisplay, exhibit.location)
  }

  function calculateAndDisplayRoute (directionsService, directionsDisplay, end) {
    directionsService.route({
      origin: currentLocation,
      destination: end,
      travelMode: 'WALKING'
    }, function (response, status) {
      if (status === 'OK') {
        store.commit('setAtDestination', false)

        directionsDisplay.setDirections(response)
        destinationExhibit = {
          lat: response.routes[0].legs[0].end_location.lat(),
          lng: response.routes[0].legs[0].end_location.lng()
        }
      } else {
        window.alert('Directions request failed due to ' + status)
      }
    })
  }
</script>

<style lang="sass" scoped>
    $menuheight: 150px

    section
        padding: 0px
        margin: 0px
        width: 100%

        #map
            display: flex
            flex-flow: column
            height: 90vh
            width: 100%
            margin: 0
            padding: 0
            max-width: none

    .wrapper
        padding-top: 20px
        padding-bottom: 20px
        padding-left: 10px
        padding-right: 10px
        width: 80%
        position: absolute
        left: 10%
        bottom: 0
        background-color: #00A6D6
        color: white
        height: $menuheight
        justify-content: flex-end
        display: flex
        flex-flow: column
        border-radius: 20px 20px 0px 0px


    .left
        width: 80%
        overflow: hidden
        float: left

    .right
        float: left


</style>
