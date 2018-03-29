<template>
    <div class="page-container">
        <div id="map"></div>
        <transition name="slide-in-left">
            <div class="left-circles" v-if="selectedExhibit">
                <div class="progress-display">{{ totalExhibits }} {{ $t("message.total") }}</div>
                <div class="distance-display">{{ selectedExhibit.distance.distance.text }}</div>
                <div class="time-display">{{ selectedExhibit.distance.duration.text }}</div>
            </div>
        </transition>
        <transition name="slide-in-right">
            <div class="right-panel" v-if="selectedExhibit">
                <p>{{ $t("message.visit_store_info") }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
  /*jslint white: true */

  import axios from 'axios'
  import store from '../store/index'

  var google // Google api variable
  var GoogleMapsLoader = require('google-maps') // only for common js environments
  GoogleMapsLoader.KEY = 'AIzaSyA7g2inijoh5NVHqaoKjE7dgpR6kRXI6Ls'
  GoogleMapsLoader.LANGUAGE = 'nl';
  GoogleMapsLoader.REGION = 'NL';


  let $backend = axios.create({
    baseURL: 'http://145.94.175.220:5000/api/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  })

  export default {
    components: {},
    name: 'MapsComponent',
    store: store,
    data () {
      return {
        // atDestination: this.$store.state.atDestination
      }
    },
    watch: {
    },
    methods: {
      nextDestination: function () {
        activateClosestExhibitDistanceMatrix()
      },
      routeTo: function (exhibit) {
        routeTo(exhibit)
      },
      skipVideo: function () {
        videoDone()
      },

    },
    computed: {
      selectedExhibit () {
        return this.$store.state.selectedExhibit
      },
      destinationExhibit () {
        return this.$store.state.destinationExhibit
      },
      atDestination () {
        return this.$store.state.atDestination
      },
      totalExhibits () {
          return exhibits.length
      }

    },
    mounted () {
        this.$store.commit('showMenu', false)
        // YouTubeIframeLoader.load(function(YT) {
        //     player = new YT.Player('ytplayer', {
        //         height: '100%',
        //         width: '100%',
        //         videoId: '668nUCeBHyY'
        //     })
        //     player.addEventListener("onStateChange", function(state){
        //         if(state.data === 0){
        //             videoDone()
        //         }
        //     });
        //     hideOnClickOutside(document.getElementById("ytplayer"))
        // })
        GoogleMapsLoader.load(function (googlemaps) {
            google = googlemaps
            initMap()
            addMapMarkers()
        })
    }
  }

  function videoDone () {
      updateLocation(false).then(() => {
          updateLocationrepeat()
          activateClosestExhibitDistanceMatrix().then(() => {
              store.commit('showMenu', true)
          })
      }).catch(() => {
          console.error('Error updating location');
          currentLocation = {
              lat: parseFloat(52.002618700000006),
              lng: parseFloat(4.374768899999999),
              accuracy: parseFloat(5)
          }
          exhibits[0]['distance'] = {}
          exhibits[0]['distance']['distance'] = {}
          exhibits[0]['distance']['duration'] = {}
          exhibits[0]['distance']['distance']['text'] = '999 uur'
          exhibits[0]['distance']['duration']['text'] = '999 km'

          store.commit('showMenu', true)
          store.commit('setDestination', exhibits[0])
          store.commit('setExhibit', exhibits[0])
      })
      document.getElementsByClassName("modal")[0].style.display = "none";
  }

  var updateLocationrepeat = function() {
      setTimeout(function () {
          updateLocation(false).then(() => updateLocationrepeat())
      }, 1000)
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
    return Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lng - point2.lng, 2))
  }

  function addMapMarkers () {
    return $backend.get('resource/one').then(response => {
        exhibits = response.data
        for (let exhibit of exhibits) {
          (function (exhibit) {
            var marker = new google.maps.Marker({
              position: exhibit.location,
              icon: new google.maps.MarkerImage('https://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png',
                    null,//new google.maps.Size(64, 64),
                    null,//new google.maps.Point(0, 18),
                    null,// new google.maps.Point(15, 15),
                    new google.maps.Size(42, 68)
              ),
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
              if (!exhibit.distance) {
                  // TODO PHONE TEST FIX
                  exhibit['distance'] = {}
                  exhibit['distance']['distance'] = {}
                  exhibit['distance']['duration'] = {}
                  exhibits[0]['distance']['distance']['text'] = 'laden...'
                  exhibits[0]['distance']['duration']['text'] = 'laden...'
              }
              store.commit('setExhibit', exhibit)

              infoWindow.open(map, this)
            })
          })(exhibit)
        }
      }).catch(error => console.log('AddMapMarkers error: ' + error))
  }

  function updateLocation (centre) {
      return new Promise(function(resolve, reject) {
          // do a thing, possibly async, then…
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
                                  new google.maps.Size(30, 30),
                                  new google.maps.Point(0, 18),
                                  new google.maps.Point(15, 15)
                              ),
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

                      resolve()
                  },
                  function () {
                      // Location retrieval error
                      if (!infoWindow) {
                          infoWindow = new google.maps.InfoWindow()
                          handleLocationError(true, infoWindow, map.getCenter())
                          reject()
                      }
                  })
          } else {
              // Browser doesn't support Geolocation
              if (!infoWindow) {
                  infoWindow = new google.maps.InfoWindow()
                  handleLocationError(false, infoWindow, map.getCenter())
                  reject()
              }
          }
      })

  }

  function activateClosestExhibitDistanceMatrix (skipamount = 0) {
      return new Promise(function (resolve, reject) {
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
                              if (response.destinationAddresses[j].indexOf(exhibit.formatted_address) !== -1) {
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
                          store.commit('setDestination', exhibits[skipamount])

                          calculateAndDisplayRoute(directionsService, directionsDisplay, exhibits[skipamount].location)
                          resolve()
                      }
                  } else {
                      reject(status)
                      console.error(status)
                  }
              })
          }
      })
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
    $menuheight: 30vh

    .right-panel
        position: absolute
        background-color: red
        color: black
        right: 0px
        width: 10vmax
        top: 30%
        padding: 10px
        font-size: 16px

        @media only screen and (max-width: 768px)
            top: 20%
            font-size: 2rem
            width: 15vmax

    .page-container
        display: flex
        flex-direction: row
        width: 100%

    section
        margin: 0px
        width: 100%
        min-width: 100%

        #map
            z-index: 0
            display: flex
            flex-flow: column
            height: calc(100vh - 80px) // 80px = navbar height
            width: 100%
            margin: 0
            padding: 0
            max-width: none
            overflow: hidden

            @media only screen and (max-width: 768px)
                height: calc(100vh - 160px)


    .left-circles
        color: black
        z-index: 0
        position: fixed
        display: flex
        flex-flow: column
        top: 30%
        margin-left: 50px
        pointer-events: none

        @media only screen and (max-width: 1024px)
            top: 25%

        @media only screen and (max-width: 1024px) and  (orientation: landscape)
            top: 20%

        div
            /*font-size: 1vmax*/
            font-size: 1rem
            display: flex
            border-radius: 50%
            border-style: solid
            padding: 10%
            width: 100px
            height: 100px
            /*width: 5vmax*/
            /*height: 5vmax*/
            /*min-width: 10vmin*/
            /*min-height: 10vmin*/
            align-items: center
            justify-content: center
            text-align: center
            margin-bottom: 10px

            @media only screen and (max-width: 1024px)
                width: 200px
                height: 200px
                font-size: 2rem

            @media only screen and (max-width: 1024px) and  (orientation: landscape)
                width: 100px
                height: 100px
                font-size: 1rem


    .left
        width: 80%
        overflow: hidden
        float: left

    .right
        float: left

    .slide-in-right-enter-active,
    .slide-in-right-leave-active
        transition: all 2s
        transform: translateX(0%)

    .slide-in-right-enter,
    .slide-in-right-leave-to
        transform: translateX(100%)


    .slide-in-left-enter-active,
    .slide-in-left-leave-active
        transition: all 2s
        transform: translateX(0%)

    .slide-in-left-enter,
    .slide-in-left-leave-to
        transform: translateX(-100%)
</style>
