<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import portaPottyIcon from './porta-potty.svg';
  export let location;

  async function addPotty() {
        console.log(formData)
        const response = await fetch('/api/markers', {
          method: "POST",
          body: JSON.stringify(formData)
        })
        const markers = await response.json()
        // Create object from data to fake the update
        console.log("POSTED. New markers: ")
        console.log(markers)
        const renderData = {
          _id: markers.result.insertedId,
          ...formData
        }
        console.log("RENDER")
        dispatch('markers-updated', renderData);
        return markers
    }
	let placeholder, image;

	let submitText = 'Add'

	const onFileSelected =(e)=>{
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 placeholder = e.target.result
            };
}
    let formData = {
      user: 'guest',
      lat: location?.lat.toFixed(2) || null,
      lng: location?.lng.toFixed(2) || null,
      description: '',
      image: null
    };

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    addPotty();
  }
    // TODO: Set this up so you can get the geolocation of any address
    const convertAddress = (address) => {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } else {
        console.error('Geocoding failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

$: console.log(formData)
$: {
    formData.lat = location?.lat.toFixed(2) || '';
    formData.lng = location?.lng.toFixed(2) || '';
  }

</script>
<div id="pane-view">
  <form action="" method="get" class="new-potty" on:submit={handleSubmit}>
      <div><strong>Add a new porta-potty:</strong> Enter latitude and longitude (or click on map)</div>
    <div class='form-group'>
      <label for="lat">Lat 
        <input type="number" step="0.01" max="90" min="-90" name="lat" id="lat" bind:value={formData.lat} required />
      </label>
      <label for="lng">Long
        <input type="number" step="0.01" name="lng" id="lng" max="180" min="-180" bind:value={formData.lng} required  />
      </label>
    </div>
    <div class="form-group">
      <label for="rating">Rating (out of 5)
        <input min="0" max="5" type="number" name="rating" id="rating" bind:value={formData.rating} />
      </label>
      <div class="textarea">
        <label for="description"> Add a description (optional)</label>
        <textarea type="text-area" name="lng" id="lng" bind:value={formData.description} />
      </div>
    </div>
<!--
  <div id="image-upload-container">
      {#if placeholder}
      <img class="placeholder" src="{placeholder}" alt="d" />
      {:else}
      <img class="placeholder" src={portaPottyIcon} alt="" /> 
      {/if}
      <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{image.click();}} />
      <div role="upload" class="chan" on:click={()=>{image.click();}}>Choose Image</div>
      <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:value={formData.image} bind:this={image} >
  </div>
-->

    <div class="form-example">
      <input id="submit" type="submit" value={submitText} on:click={() => submitText = "Thanks"} class="submit-button button"/>
    </div>
  </form>
</div>

<style>

  textarea {
    resize: none;
    height: 50px;
  }
  .new-potty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .new-potty div {
    margin: 0.5rem;
  }

	#image-upload-container{
	    display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
    }
 
	.upload {
		display:flex;
	  height:32px;
		width:32px;
		cursor:pointer;
	}
	.placeholder{
		display:flex;
		height:32px;
		width:32px;
	}
  label {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .form-group {
    width: 75%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
  }

  label {
    padding: 4px;
  }

  .submit-button {
    background-color: lightblue;
    border: none;
    padding: 0.5rem;
    border-radius: 12px;
    font-weight: bold;
  }

  @media screen and (min-width: 480px) {
  .form-group {
    width: 33%;
  }
}
</style>