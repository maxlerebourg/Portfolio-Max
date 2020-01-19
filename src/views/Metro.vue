<template>
    <div>
        <div class="navbar">
            <router-link to="/">Home</router-link>
        </div>
        <div id="map">
        </div>
    </div>
</template>

<script>
    import L from 'leaflet';
    import stationsGeo from '../assets/stations';
    import linesGeo from '../assets/lines';

    export default {
        name: 'Map',
        methods: {
            getColor: metro => {switch (metro) {
                case 'M1': return {color: "#ffcd00"};
                case 'M2':   return {color: "#003ca6"};
                case 'M3': return {color: "#837902"};
                case 'M4':   return {color: "#be418d"};
                case 'M5': return {color: "#ff7e2e"};
                case 'M6':   return {color: "#6eca97"};
                case 'M7': return {color: "#fa9aba"};
                case 'M8':   return {color: "#e19bdf"};
                case 'M9': return {color: "#b6bd00"};
                case 'M10':   return {color: "#c9910d"};
                case 'M11': return {color: "#704b1c"};
                case 'M12':   return {color: "#007852"};
                case 'M13': return {color: "#6ec4e8"};
                case 'M14':   return {color: "#62259d"};
                case 'M7b': return {color: "#6eca97"};
                case 'M3b':   return {color: "#6ec4e8"};
            }},
        },
        async mounted() {
            const map = L.map('map').setView([48.866667, 2.333333], 11);
            // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/dark-v10',
                accessToken: 'pk.eyJ1IjoiZ2hhcmFoaW0iLCJhIjoiY2s1MTBlZzBsMHBpZjNkbXFjc2kza2cybCJ9.Bgb-nu4dPVPmsXjdzK2abA'
            }).addTo(map);
            L.geoJSON(linesGeo, {
                style: feature => this.getColor(feature.properties.name),
            }).addTo(map);
            L.geoJSON(stationsGeo, {
                    pointToLayer: ((point, latlng) =>{
                        const popup = L.popup().setContent(null);
                        const marker = L.marker(latlng, {
                            radius: 500,
                            icon: L.icon({
                                iconUrl: './static/logo/map.svg',
                                iconSize: [25, 15],
                                className: 'marker',
                            }),
                        }).bindPopup(popup);
                        marker.on('click', async () => {
                            const { color, lines, label } = point.properties;
                            const schedules = [];
                            for (let i = 0; i < lines.length; i++) {
                                schedules.push({line: lines[i], ...await (await fetch(`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${lines[i].match(/[0-9a-z]{1,}/)[0]}/${label.toLowerCase().replace(/([' ,])/g, '+')}/A%2BR`)).json()});
                            }
                            popup.setContent(`
                                <div>
                                  <span>
                                    ${label}${color !== 'connection' ? ` _ ${color}` : ''}
                                  </span>
                                  <br />
                                  <span>${
                                schedules.map(schedule => {
                                    const dest = [];
                                    return `${schedule.result.schedules.map(metro => {
                                        if (dest.includes(metro.destination))
                                            return undefined;
                                        else
                                            dest.push(metro.destination);
                                        return `<br />${color === 'connection' ? `${schedule.line} _ ` : ''}${metro.message} pour ${metro.destination}`;
                                    }).filter(el => el !== undefined)}`;
                                })}
                              </span>
                            </div>
                          `);
                        });
                        return marker;
                    }),
                }
            ).addTo(map);




            // let lines = await fetch('https://api-ratp.pierre-grimaud.fr/v4/lines/metros');
            // lines = await lines.json();
            // const metros = lines.result.metros, stations = {};
            //
            // for (let i = 0; i < metros.length; i++) {
            //   stations[metros[i].code] = {
            //     name: metros[i].name,
            //     stations: [],
            //   };
            //   let listByMetro = await fetch(`https://api-ratp.pierre-grimaud.fr/v4/stations/metros/${metros[i].code}`);
            //   listByMetro = await listByMetro.json();
            //   listByMetro = listByMetro.result.stations;
            //   for (let j = 0; j < listByMetro.length; j++) {
            //     let geopositionByStation = await fetch(`https://nominatim.openstreetmap.org/search?q=metro+${listByMetro[j].slug}+paris&format=json`);
            //     geopositionByStation = await geopositionByStation.json();
            //     stations[metros[i].code].stations.push({
            //       name: listByMetro[j].name,
            //       slug: listByMetro[j].slug,
            //       lat: geopositionByStation.length > 0 && geopositionByStation[0].lat,
            //       lon: geopositionByStation.length > 0 && geopositionByStation[0].lon,
            //     });
            //   }
            // }
            // console.log(position);

            // Object.entries(position).forEach(([metroKey, metroValue]) => {
            //   Object.entries(metroValue.stations).forEach(([stationKey, stationValue]) => {
            //     console.log(metroKey, stationKey, stationValue);
            //     L.marker([stationValue.lat, stationValue.lon], {
            //       color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500, icon: L.icon({iconUrl: './map.svg', iconSize: [15, 10],})}).addTo(map);
            //   });
            // });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #map {
        height: calc(100vh - 38px);
        width: 100vw;
        background-color: #343332;
    }
    .navbar {
        position: sticky;
        background-color: #1e272e;
        width: 100%;
        text-align: center;
    }
    a {
        display: inline-block;
        color: white;
        text-decoration: none;
        padding: 10px;
        font-weight: bold;
    }
    a:hover {
        background-color: #111;
    }
</style>
