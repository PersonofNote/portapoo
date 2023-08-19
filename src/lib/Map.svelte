<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { generateRandomPoints } from '../utils/generateData';
    import toiletIcon from '../lib/toilet-icon.svg';
    import portaPottyIcon from '$lib/porta-potty.svg';

    let mapElement;
    let map;

    var randomPoints = generateRandomPoints({'lat':36.1716, 'lng':-115.176468}, 150, 8);
    console.log(randomPoints)

    const onLocationError = (e) => {
        alert(e.message);
    }

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');

            var icon = leaflet.icon({
                iconUrl: portaPottyIcon,
                iconSize:     [32, 32],
                popupAnchor:  [0, -12]
            });

            map = leaflet.map(mapElement).setView([51.505, -0.09], 13);

            map.locate({setView: true, maxZoom: 16});

            // 🗒️ TODO: Extract to its own function
            const makeMarker = (lat, long, text=null) => {
                leaflet.marker([lat, long], {icon: icon}).addTo(map)
                        .bindPopup(text)
                        .openPopup();
            }

            leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
                maxZoom: 16
            }).addTo(map);

            randomPoints.map((point, i) => makeMarker(point.lat, point.lng, `Point ${i} added to map`))

            // 🗒️ TODO: Only use location if mobile
            // map.on('locationerror', onLocationError);
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>


<main>
    <div bind:this={mapElement}></div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: 800px;
    }
</style>

<!-- var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
-->