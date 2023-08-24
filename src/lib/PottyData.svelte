<script>
    export let content;
    import StarIcon from '$lib/StarIcon.svg';
    import ImagePlaceholder from '$lib/placeholder.svg';

    // TODO: figure out how to 
    const verified = content.verified || false;
    const verifiedText = content.verified ? "This porta-potty has been verified" : "This porta-potty has not yet been verified"
</script>
<div class='card-content'>
	{ content.description}
    <!--
    {#if content.photo}
        {content.photo}
    {:else}
        <ImagePlaceholder width="72px" height="72px" />
    {/if}
    -->
    <div class="rating-tray">
        {#each {length: content.rating} as _, i}
         <StarIcon height="24px" width="24px" fill="#000080"/>
        {/each}
    </div>
    {#if content.rating}
    <p class="small-text"> Rating based off of 1 user</p>
    {/if}
    <p>Submitted by {content.guest || 'guest'}</p>
    {verifiedText}
</div>

<style>
    .card-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .rating-tray {
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .small-text {
        font-size: 10px;
    }
</style>