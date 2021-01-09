<script>
    import { Button, SkeletonPlaceholder } from 'carbon-components-svelte';
    import { navigate } from 'svelte-routing';

    import { searchPosts } from '../../utils/api/posts.js'
    import { makeCreatedOnUserFriendly } from '../../utils/general.js'

    export let location

    let posts = []
    let hasPageLoaded = false

    let paginationDetails = {
        name: "",
        pageNo: 1,
        searchResultSize: 10,
        currentId: ""
    }

    const getName = (qParams) => qParams.get("name") || ""
    const getPageNo = (qParams) => parseInt(qParams.get("pageNo") || 1)
    const getCurrentId = (qParams) => qParams.get("currentId")

    const loadItems = async(location) => {
        hasPageLoaded = false
        const qParams = new URLSearchParams(location.search)
        paginationDetails.name = getName(qParams)
        paginationDetails.pageNo = getPageNo(qParams)
        paginationDetails.currentId = getCurrentId(qParams)

        const dir = qParams.get("dir")

        const searchParams = {
            name: paginationDetails.name,
            currentId: paginationDetails.currentId,
            dir
        }

        const response = await searchPosts(searchParams)
        posts = response.data

        if(dir === "back"){
            posts.reverse()
        }

        hasPageLoaded = true

        paginationDetails.currentId = posts[0]._id
    }

    const switchPage = (dir) => {
        const pageNo = dir === "back" ? paginationDetails.pageNo - 1 : paginationDetails.pageNo + 1
        console.log(document.querySelector(".posts"))
        document.querySelector(".posts").scrollIntoView()
        navigate(`/?name=${paginationDetails.name}&currentId=${paginationDetails.currentId}&dir=${dir}&pageNo=${pageNo}`)
    }


    $: {
        loadItems(location)
    }
</script>

<style>
    .post .title{
        cursor: pointer;
    }
</style>

<div class="posts">
    {#if hasPageLoaded}
        {#each posts as post}
            <div class="post">
                <h2 
                    class="title"
                    on:click={() => navigate(`/post/${post._id}`)}
                >
                    {post.title}
                </h2>
                <p class="date">
                    {makeCreatedOnUserFriendly(post.createdOn)}
                </p>
                <div class="teaser">
                    {@html post.teaser}
                </div>
            </div>
        {/each}
            <Button 
                on:click={() => switchPage("back")}
                disabled={paginationDetails.pageNo <= 1}
            >
                Back
            </Button>
            <Button 
                on:click={() => switchPage("next")}
                disabled={posts.length < paginationDetails.searchResultSize}>
                Next
            </Button>
        {:else}
            <SkeletonPlaceholder style="height: 12rem; width: 80%;" />
            <br/>
            <SkeletonPlaceholder style="height: 12rem; width: 80%;" />
            <br/>
            <SkeletonPlaceholder style="height: 12rem; width: 80%;" />
            <br/>
            <SkeletonPlaceholder style="height: 12rem; width: 80%;" />
            <br/>
            <SkeletonPlaceholder style="height: 12rem; width: 80%;" />
            <br/>
            <SkeletonPlaceholder style="height: 12rem; width: 80%;" />
    {/if}
</div>