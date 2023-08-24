<script>
    export let data;
    import { useMotionValue } from 'svelte-motion'
    import { onMount, onDestroy } from 'svelte';
    import Map from '$lib/Map.svelte';
    import PlusIcon from '$lib/plus-icon.svg';
    import { markersData } from '../stores';

    /* This might be useful for after you POST a new one, or if the user scrolls to another location
      async function getMarkers() {
        const response = await fetch('/api/markers')
        const markers = await response.json()
        return markers
    }
    */
   // WINDOW VARS
    let innerWidth = 0
    let innerHeight = 0

  // MAP CARD VARS
    const handleHeight = 50;
    let toggleCard, minY, maxY, y;
  
    // VIEW VARS
    let view = 'form';

    let markers;


    onMount(async () => {
      // Make sure the card opens high enough to show the form on all screen sizes
      let cardContentDimensions = document.querySelector('#pane-view');
      let cardContentHeight = cardContentDimensions.offsetHeight;
      markersData.set(data.body);
      markers = $markersData;
      console.log("MARKERS")
      console.log(markersData)
      maxY = innerHeight - handleHeight - 20 - cardContentHeight;
      minY = innerHeight - handleHeight -20;
      y = useMotionValue(minY);
      toggleCard = () => {
        const val = y.current >= minY ? maxY : minY; 
          y = useMotionValue(val);
      }
    });
$: console.log(data)
$: console.log(markers)
 
  </script>

<svelte:window bind:innerWidth bind:innerHeight />
<main>
    <Map 
      {markers} 
      {y} 
      {minY} 
      {maxY}
    />
    <footer class="footer"> <button class="icon-button" on:click={() => toggleCard()}><PlusIcon height=16 width=16 /></button></footer>
</main>

<style>
    :global(:root){
      --div-height: 2rem;
    }
  main {
    height: 100vh;
    overflow: hidden;
  }
  footer {
    height: var(--div-height);
    position: relative;
    z-index: 600;
    background-color: white;
    display: flex;
    align-items: center;
  }

  button.icon-button {
    background-color: lightgray;
    border: none;
    border-radius: 100%;
    padding: 4px 6px;
  }

  button {
    
  }


</style>