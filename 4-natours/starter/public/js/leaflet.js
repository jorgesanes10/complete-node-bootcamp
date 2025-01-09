/* eslint-disable */

const { locations } = document.getElementById('map').dataset;
const locationsJSON = JSON.parse(locations);

const coordinates = [
  locationsJSON[0].coordinates[1],
  locationsJSON[0].coordinates[0],
];

const map = L.map('map');
const corners = [];

locationsJSON.forEach((location) => {
  const coordinates = [location.coordinates[1], location.coordinates[0]];

  corners.push(L.latLng(location.coordinates[1], location.coordinates[0]));

  const marker = L.marker(coordinates);

  marker.addTo(map);

  setTimeout(() => {
    marker
      .bindTooltip(
        `<p class="map-tooltip">Day ${location.day}: ${location.description}</p>`,
      )
      .openTooltip();
  }, 200);
});

const bounds = L.latLngBounds(...corners).pad(0.6);

map.setView(bounds.getCenter(), map.getBoundsZoom(bounds));

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
