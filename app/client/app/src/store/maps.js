// var mapCenter = {lat: 52.011, lng: 4.3593}
// var infoWindow
// var map
// var selectedExhibit
//
// export function initMap () {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: mapCenter,
//     zoom: 16
//   })
// }
//
// function addMapMarkers (exhibits) {
//   console.log(exhibits)
//   for (let exhibit of exhibits) {
//     (function (exhibit) {
//       var marker = new google.maps.Marker({
//         position: exhibit.location,
//         map: map,
//         title: exhibit.address
//       })
//       marker.addListener('click', function(event) {
//         if (!infoWindow) infoWindow = new google.maps.InfoWindow()
//         infoWindow.setOptions({
//           content: '<div class="infoWindow">' + exhibit.formatted_address + "<br><br>" +
//           exhibit.infoText + '<br>' +
//           routeButton + '</div>',
//           position: exhibit.location
//         })
//         selectedExhibit = exhibit
//         infoWindow.open(map, this)
//         // var onChangeHandler = function() {
//         //   vm.destinationExhibit = exhibit;
//         //   calculateAndDisplayRoute(directionsService, directionsDisplay, exhibit.location);
//         // };
//         // document.getElementById('navbutton').addEventListener('click', function () {
//         //   routeTo(exhibit);
//         // });
//       })
//     })(exhibit)
//   }
//   // updateLocation(true);
// }