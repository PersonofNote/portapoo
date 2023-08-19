<script>
    import portaPottyIcon from './porta-potty.svg';
	let  placeholder, fileinput;
	
	const onFileSelected =(e)=>{
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 placeholder = e.target.result
            };
}
	
</script>
<div id="image-upload-container">
    {#if placeholder}
    <img class="placeholder" src="{placeholder}" alt="d" />
    {:else}
    <img class="placeholder" src={portaPottyIcon} alt="" /> 
    {/if}
    <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
    <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
    <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >

</div>
<style>
	#image-upload-container{
	    display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
		max-width: 700px;
    }
 
	.upload{
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
</style>