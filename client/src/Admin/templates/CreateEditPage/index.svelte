<script>
    import { onMount } from 'svelte'

    import { 
        Content,
        Loading,
        Button
    } from 'carbon-components-svelte'

    let mongoDocument = {}

    export let id
    export let mode

    export let readDocumentFunc
    export let saveFunc

    export let formElements
    export let tableName

    let loaded = false

    const singularTableName = tableName[tableName.length-1] === "s" ? tableName.substring(0, tableName.length-1) : tableName

    onMount(async() => {
        if(id){
            loaded = false
            const response = await readDocumentFunc(id)
            mongoDocument = response.data
            await new Promise(r => setTimeout(r, 250));
            loaded = true
        } else {
            loaded = true
        }
    })

    $: console.log(mongoDocument)
</script>

<style>
    :global(.bx--label){
        text-transform: capitalize;
    }
</style>

<Content>
    <h1>{mode} {singularTableName}</h1>
    <br/>
    {#if loaded}
        {#each formElements as formElement}
            <svelte:component 
                this={formElement.component} 
                labelText={formElement.fieldName}
                bind:value={mongoDocument[formElement.fieldName]} 
                {...formElement.additionalComponentProps}
            />
            <br/>
        {/each}
    {:else}
        <Loading withOverlay={false} />
        <h3>Fetching document</h3>
    {/if}
    <br/>
    <Button on:click={() => saveFunc(mongoDocument)}>
        Save
    </Button>
</Content>