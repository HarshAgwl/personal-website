<script>
    import { Content, SkeletonText } from 'carbon-components-svelte';

    import { readPost } from '../../utils/api/posts'
    import { makeCreatedOnUserFriendly } from '../../utils/general.js'
    
    export let id

    let hasPageLoaded
    let post = {}

    const load = async(id) => {
        const response = await readPost(id)
        post = response.data
        hasPageLoaded = true
    }

    $: {
        if(id) load(id)
    }

</script>

<style>
    :global(.post p){
        padding-bottom: 10px;
    }
    :global(ul){
        list-style: disc!important;
        font-size: 16px!important;
        padding: 18px!important;
    }
    :global(li){
        padding-bottom: 4px!important;
    }
</style>

<Content class="content">
    <div class="post">
        {#if hasPageLoaded}
                <h2 class="title">
                    {post.title}
                </h2>
                <p class="date">
                    {makeCreatedOnUserFriendly(post.createdOn)}
                </p>
                <div class="body">
                    {@html post.body}
                </div>
        {:else}
            <SkeletonText heading width="90%"/>
            <br/>
            <br/>
            <SkeletonText paragraph width="75%" />
            <br/>
            <br/>
            <SkeletonText paragraph width="75%" />
        {/if}
    </div>
</Content>