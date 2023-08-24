<script>
    import { Motion, useMotionValue } from 'svelte-motion'
    import { press } from 'svelte-gestures';
    import { markersData } from '../stores';
    // This is such a weird way to get data
    export let markers;
    export let y, maxY, minY;
    import { onMount, afterUpdate, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import DraggableIcon from "$lib/draggable-icon.svg?component";
    import SubmitToiletForm from './SubmitToiletForm.svelte';
    import PottyData from './PottyData.svelte';
    let innerWidth = 0
    let innerHeight = 0

    let count = 0;
    let mapElement;
    let map;

    const onLocationError = (e) => {
        alert(e.message);
    }

    const mapMinimumHeight = 100
    const handleHeight = 50;

    const remSize = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

    let handlePress
    let selectedLoc
    let tempMarker;
    let leaflet;
    let renderMarkers;

    function handleMarkersUpdate(newMarker) {
      console.log(newMarker.detail)
      markersData.update(entries => [...entries, newMarker.detail]);
      markers = [...markers, newMarker.detail];
      renderMarkers();
    }

    onMount(async () => {
        if(browser) {
            // TODO: Check if this is necessary
           leaflet = await import('leaflet');
            
            // World map data
            var southWest = L.latLng(-89.98155760646617, -185),
            northEast = L.latLng(89.99346179538875, 200);
            var bounds = L.latLngBounds(southWest, northEast);

            y = useMotionValue(innerHeight - handleHeight - 20);

            // Create the map
            map = leaflet.map(mapElement, {attributionControl: false, minZoom: 3, center: bounds.getCenter(),  maxBounds: bounds, maxBoundsViscosity: 1.0}).setView([51.505, -0.09], 3);

            map.locate({setView: true, maxZoom: 16});
            map.on('click', function(e) {
                // A bit messy. Not sure how to add a class to a regular marker. .options, I think?
                if (tempMarker!= null && !tempMarker?._icon?.classList?.contains('potty-icon')) {
                    map.removeLayer(tempMarker);
                    tempMarker = null;
                    selectedLoc = null;
                }
                else {
                    selectedLoc = e.latlng;
                    console.log(e.latlng)
                    y = useMotionValue(maxY)
                // TODO: figure out how to add class to default marker, or use a divMarker
                    const temp = leaflet.marker([e?.latlng?.lat, e?.latlng?.lng], {tempId: "TEMP", className: "temp-marker"}).addTo(map)
                        .bindPopup("Marker will be added here")
                        .openPopup()
                    temp._icon.id = 'TEMP'
                    tempMarker = temp;
                    map.setView([e?.latlng?.lat, e?.latlng?.lng], 13);
                }
            });


            var tileLayer = leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
                maxZoom: 16
            })

            tileLayer.addTo(map);

            leaflet.control.attribution({
            position: 'topright'
            }).addTo(map);

            // 🗒️ TODO: Only use location if mobile
            // map.on('locationerror', onLocationError);    
            handlePress = (e) => {
                map.fire('longPress');
            }
            renderMarkers = () => { 
                console.log("RENDERING")               
                // Remove temp icon
                if (tempMarker!= null && !tempMarker?._icon?.classList?.contains('potty-icon')) {
                    map.removeLayer(tempMarker);
                    tempMarker = null;
                    selectedLoc = null;
                }
                // Add new icon
            const PortaPottyIcon = leaflet.divIcon({
                    html: `
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="32" height="40" viewBox="0 0 235.000000 427.000000"
                    preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,427.000000) scale(0.100000,-0.100000)">
                        <path d="M991 4219 c-389 -32 -736 -171 -861 -347 -22 -30 -40 -60 -40 -65 0
                        -5 -13 -25 -30 -44 -37 -41 -41 -101 -10 -151 20 -32 20 -51 20 -1807 l0
                        -1775 95 0 95 0 2 1743 3 1742 30 54 c41 73 112 133 230 191 179 88 387 130
                        655 130 267 0 475 -41 655 -130 117 -57 189 -117 230 -191 l30 -54 3 -857 2
                        -858 -125 0 -125 0 0 -75 0 -75 125 0 125 0 0 -810 0 -810 95 0 95 0 0 1775
                        c0 1756 0 1775 20 1807 31 50 27 110 -10 151 -17 19 -30 39 -30 44 0 5 -18 35
                        -40 65 -171 239 -711 390 -1239 347z m998 -2473 c15 -18 3 -46 -20 -46 -22 0
                        -34 22 -25 45 7 19 30 19 45 1z"/>
                        <path d="M1045 3844 c-16 -2 -66 -9 -110 -15 -276 -36 -522 -159 -600 -300
                        l-30 -54 0 -200 0 -200 33 -3 32 -3 0 -105 0 -104 -35 0 -35 0 0 -475 0 -475
                        35 0 35 0 0 -110 0 -110 -35 0 -35 0 0 -475 0 -475 35 0 35 0 0 -110 0 -110
                        -35 0 -35 0 0 -245 0 -245 880 0 880 0 0 790 0 789 -127 3 -128 3 -3 108 -3
                        107 131 0 131 0 -3 823 -3 822 -30 54 c-41 74 -113 134 -230 191 -167 82 -335
                        118 -575 125 -80 2 -158 2 -175 -1z m725 -609 l0 -235 -590 0 -590 0 0 235 0
                        235 590 0 590 0 0 -235z m0 -435 l0 -40 -590 0 -590 0 0 40 0 40 590 0 590 0
                        0 -40z"/>
                        </g>
                    </svg>`,
                    className: "potty-icon",
                    iconSize: [24, 40],
                    popupAnchor:  [0, -12]
                });

                markers.filter((mark) => !mark.location).forEach(m => {
                        const { description, image, rating, user} = m;
                        const content = document.createElement('div');
                        new PottyData({
                            target: content,
                            props: { content: { description, image, rating, user }},
                        });
                        leaflet.marker([m.lat, m.lng], {icon: PortaPottyIcon}).addTo(map)
                            .bindPopup(content)
                        }
                    )
                }
            renderMarkers();
        }
    });

    // I think this is getting run on page load becuase of the way the data is updating. It's running too early!
    afterUpdate(() => {
        /*
        if (leaflet) {
        const PortaPottyIcon = leaflet.divIcon({
            html: `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="32" height="40" viewBox="0 0 235.000000 427.000000"
            preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,427.000000) scale(0.100000,-0.100000)">
                <path d="M991 4219 c-389 -32 -736 -171 -861 -347 -22 -30 -40 -60 -40 -65 0
                -5 -13 -25 -30 -44 -37 -41 -41 -101 -10 -151 20 -32 20 -51 20 -1807 l0
                -1775 95 0 95 0 2 1743 3 1742 30 54 c41 73 112 133 230 191 179 88 387 130
                655 130 267 0 475 -41 655 -130 117 -57 189 -117 230 -191 l30 -54 3 -857 2
                -858 -125 0 -125 0 0 -75 0 -75 125 0 125 0 0 -810 0 -810 95 0 95 0 0 1775
                c0 1756 0 1775 20 1807 31 50 27 110 -10 151 -17 19 -30 39 -30 44 0 5 -18 35
                -40 65 -171 239 -711 390 -1239 347z m998 -2473 c15 -18 3 -46 -20 -46 -22 0
                -34 22 -25 45 7 19 30 19 45 1z"/>
                <path d="M1045 3844 c-16 -2 -66 -9 -110 -15 -276 -36 -522 -159 -600 -300
                l-30 -54 0 -200 0 -200 33 -3 32 -3 0 -105 0 -104 -35 0 -35 0 0 -475 0 -475
                35 0 35 0 0 -110 0 -110 -35 0 -35 0 0 -475 0 -475 35 0 35 0 0 -110 0 -110
                -35 0 -35 0 0 -245 0 -245 880 0 880 0 0 790 0 789 -127 3 -128 3 -3 108 -3
                107 131 0 131 0 -3 823 -3 822 -30 54 c-41 74 -113 134 -230 191 -167 82 -335
                118 -575 125 -80 2 -158 2 -175 -1z m725 -609 l0 -235 -590 0 -590 0 0 235 0
                235 590 0 590 0 0 -235z m0 -435 l0 -40 -590 0 -590 0 0 40 0 40 590 0 590 0
                0 -40z"/>
                </g>
            </svg>`,
            className: "potty-icon",
            iconSize: [24, 40],
            popupAnchor:  [0, -12]
            });
            // After update is getting called way too often
            markers.filter((mark) => !mark.location).forEach(m => {
                    const { description, image, rating, user} = m;
                    const content = document.createElement('div');
                    new PottyData({
                        target: content,
                        props: { content: { description, image, rating, user }},
                    });
                    leaflet.marker([m.lat, m.lng], {icon: PortaPottyIcon}).addTo(map)
                        .bindPopup(content)
                        .openPopup()
                    }
                )
        }
        */
    });

    onDestroy(async () => {
        if(map) {
            map.remove();
        }
    });

</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="drag-container">
    <div class="map" bind:this={mapElement} 
        use:press={{ timeframe: 300, triggerBeforeFinished: false }}
        on:press={handlePress}></div>
    <Motion
        drag="y"
        dragConstraints={{top: maxY, bottom: minY}}
        dragMomentum={false}
        style={{ y }}
        let:motion={drag}
    >
        <div class="draggable-card" use:drag style='z-index: 500' transition={{ duration: .5 }} >
            <div class="handle"><DraggableIcon /></div>
            <SubmitToiletForm location={selectedLoc || null}  on:markers-updated={handleMarkersUpdate} />
            <!-- TODO: view switcher component here -->
        </div>
    </Motion>
</div>


<style>
    @import 'leaflet/dist/leaflet.css';
    
    .map {
        min-height: 100px;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .drag-container {
        height: calc(100vh - 3rem);
        position: relative;
        touch-action: none;
        overflow: hidden;
    }
    .draggable-card {
        background-color: white;
        width: 100%;
        height: 110%;
        overflow: hidden;
        position: absolute;
        border-radius: 12px;
        overflow: hidden;
    }


    .handle {
        width: 100%;
        height: 24px;
        cursor: ns-resize;
        z-index: -100;
        border: 4px transparent;
        display: flex;
        justify-content: center;
    }

    .handle:hover {
        background-color: #cccc;
    }

    /* Hacky solution to SVG in leaflet and svelte. If the element is not directly part of the DOM, the class isn't applied the same way */
    :global(.potty-icon) {
        fill: #11AAEE; /* Literally called porta-potty blue */
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