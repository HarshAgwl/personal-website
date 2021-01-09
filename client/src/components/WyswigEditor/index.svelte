<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte'

    export let id
    export let labelText
    export let value

    let editor

    const editorLoaded = () => {
        const config = {
            extraPlugins: 'codesnippet',
            codeSnippet_theme: 'monokai_sublime',
        }
        editor = window.CKEDITOR.replace(id, config)
        editor.on('change', function() { 
            value = editor.getData()
        })
    }

    const updateEditor = () => editor.setData(value)

    $: {
        if(id && editor){
            updateEditor()
        }
    }
</script>

<svelte:head>
    <script src="https://cdn.ckeditor.com/4.15.1/standard-all/ckeditor.js" on:load={editorLoaded}></script>
</svelte:head>

<style>
    :global(.wyswig-editor .cke_toolbar_break){
        display: none;
    }
</style>

<label for="ccs-0.9uvfv82h9ak" class="bx--label">{labelText}</label>
<div class="wyswig-editor">
    <textarea name={id} id={id} rows="10" cols="80">
    </textarea>
</div>