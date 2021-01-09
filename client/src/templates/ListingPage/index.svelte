<script>
    import { onMount } from 'svelte'
    
    import { Link, navigate } from 'svelte-routing'
    import { 
        Content,
        Button,
        Search
    } from 'carbon-components-svelte'

    // export let location

    export let selfUrl
    export let searchFunc
    export let tableName

    let location = window.location
    console.log(location)

    let name = ""
    let results = []
    let pageNo
    let currentId = ""

    const searchResultSize = 10

    let searchBarRef

    const singularTableName = tableName[tableName.length-1] === "s" ? tableName.substring(0, tableName.length-1) : tableName

    const searchAndLoadItems = async(location) => {
      const searchParams = new URLSearchParams(location.search)
      name = searchParams.get("name") || ""
      pageNo = parseInt(searchParams.get("pageNo") || 1)

      const params =  {
        name,
        currentId: searchParams.get("currentId"),
        dir: searchParams.get("dir")
      }
      
      console.log(params)
      const response = await searchFunc(params)

      results = response.data
      console.log(response)

      if(params.dir==="back"){
        results.reverse()
      }

      currentId = results[0]._id
    }

    $: {
        searchAndLoadItems(location)
    }

    onMount(() => {
        searchAndLoadItems(location)
        searchBarRef.addEventListener('keydown', function onEvent(event) {
            if (event.key === "Enter") {
                navigate(`${selfUrl}?name=${name}`)
            }
        })
    }) 
</script>

<style>
    .searchbar{
        margin-bottom: 20px;
    }
    .flexbox{
        display: flex;
        gap: 20px;
    }
    .result{
        background: white;
        border: 1px solid black;
        padding: 10px;
    }
    .result .name{
        font-weight: bold;
        margin-right: 10px;
    }
    .result.flexbox div{
        flex: 1;
    }
    .result .edit{
        text-align: right;
    }
    .searchbar-wrapper{
        flex: 1;
    }
    .add-new-course-btn-wrapper{
        flex: 1;
        text-align: right;
    }
</style>

<Content>
    <div class="searchbar">
        <h1>Manage {tableName}</h1>
        <br/>
        <div class="flexbox">
            <div class="searchbar-wrapper">
                <Search 
                    bind:value={name} 
                    bind:ref={searchBarRef}
                />
            </div>
            <div class="add-new-course-btn-wrapper">
                <Button href="{selfUrl}/add">+ Add new {singularTableName}</Button>
            </div>
        </div>
    </div>
    <div class="search-results">
        {#each results as result}
            <div class="result flexbox">
                <div class="name">
                    {result.title}
                </div>
                <div class="edit">
                <Link to="{selfUrl}/edit/{result._id}">
                        Edit
                    </Link>
                </div>
            </div>
        {/each}
    </div>
    <br/>
    <div class="">
        <Button 
            href={`${selfUrl}?name=${name}&currentId=${currentId}&dir=back&pageNo=${pageNo-1}`}
            disabled={pageNo <= 1}
          >
            Back
          </Button>
          <Button 
            href={`${selfUrl}?name=${name}&currentId=${currentId}&dir=next&pageNo=${pageNo+1}`} 
            disabled={results.length < searchResultSize}>
            Next
          </Button>
    </div>
</Content>