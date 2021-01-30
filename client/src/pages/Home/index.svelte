<script>
    import { Content, Button, SkeletonPlaceholder } from 'carbon-components-svelte';
    import { navigate } from 'svelte-routing';

    import { searchPosts } from '../../utils/api/posts.js'
    import { makeCreatedOnUserFriendly } from '../../utils/general.js'

    export let location

    const videoGames = [
        {
            name: "Globulas",
            imgSrc: "https://play-lh.googleusercontent.com/8UBQKDgQZoygD5UQpiZNd4EQlkom1W7ECM4qUKoZyWN3iInSsByeDH3LnpKJ3GnpFA=w720-h310-rw",
            link: "https://play.google.com/store/apps/details?id=com.GenysisStudios.Globulas"
        },
        {
            name: "The Knight's Call",
            imgSrc: "https://play-lh.googleusercontent.com/HBms7AIqtffyplfEHDEoOPYp_0QKMd94isHZxDuX_-ixZsL2omJDYV8ZK52ngT1UT4Y=w720-h310-rw",
            link: "https://play.google.com/store/apps/details?id=com.GenysisStudios.TheKnightsCall"
        },
        {
            name: "Knight Run",
            imgSrc: "https://play-lh.googleusercontent.com/V70dE-gHhrBFjEMIgUMe8R7ZwFXI6ebwN6DewxEFVTG9B5zjYzmDItfoZOBllrDpgDA=w720-h310-rw",
            link: "https://play.google.com/store/apps/details?id=com.GenysisStudios.KnightRun&hl=en_CA"
        }
    ]

    const webApplications = [
        {
            name: "The Book Hub",
            imgSrc: "https://live.staticflickr.com/65535/50891175782_11114ecf02_b.jpg",
            link: "https://www.thebookhub.org"
        },
        {
            name: "Harsh Agrawal",
            imgSrc: "https://live.staticflickr.com/65535/50891329557_98f1d996b9_b.jpg",
            link: "https://itsharshag.com"
        }
    ]

    const generativeArt = [
        {
            name: "Concentric Circles",
            imgSrc: "https://live.staticflickr.com/65535/50891563047_6127fb9bbf_w.jpg",
            link: "https://editor.p5js.org/HarshAgwl/sketches/13f1De2xr"
        },
        {
            name: "Recursion",
            imgSrc: "https://live.staticflickr.com/65535/50891446376_c3290d6f83_w.jpg",
            link: "https://editor.p5js.org/HarshAgwl/sketches/13f1De2xr"
        },
        {
            name: "Om",
            imgSrc: "https://live.staticflickr.com/65535/50891562922_5af82f96df_w.jpg",
            link: "https://editor.p5js.org/HarshAgwl/sketches/hWpwgg9i2"
        }
    ]

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
    div.items{
        margin-bottom: 45px;
    }
    .items .grid{
        display: grid;
        grid-template-columns: repeat(2, 50%);
        grid-gap: 10px;
    }
    .item{
        height: 220px;
        background-position: center;
        background-size: cover;
    }
    .overlay{
        height: 100%;
        width: 100%;
        padding: 20px;
        font-size: 60px;
        opacity: 0;
        background: rgba(0,0,0,0.65);
        color: white;
        transition: 0.4s;
        vertical-align: bottom;
        margin-top: auto;
        display: flex;
        flex-direction: column-reverse;
    }
    .item:hover .overlay{
        opacity: 1;
        cursor: pointer;
    }
    .video-games .item:nth-child(1){
        grid-column: 1/3;
    }
    h1.title{
        font-family: 'Red Hat Display', cursive;
        text-transform: lowercase;
        padding-bottom: 20px;
    }
    .generative-art .grid, .latest-blog-posts .grid{
        grid-template-columns: repeat(3, 33%);

    }
    .posts h1.title{
        padding-bottom: 0px;
    }
    .latest-blog-posts .grid{
        grid-gap: 20px;
    }
    .latest-blog-posts .post{
        height: fit-content;
        margin: 0px;
        padding: 0px;
    }
    @media (max-width: 500px){
        .video-games .item:nth-child(1){
            grid-column: 1/2;
        }
        .grid{
            grid-template-columns: repeat(1, 99%)!important;
        }
    }
    @media (max-width: 960px){
        .latest-blog-posts .grid{
            grid-template-columns: repeat(2, 49%);
        }
    }
</style>

<Content class="content">
    <div class="video-games items">
        <h1 class="title">Fun Interactive experiences aka Video Games</h1>
        <div class="grid">
            {#each videoGames as item}
                <div 
                    class="item"
                    style={`background-image: url("${item.imgSrc}");`}
                    on:click={() => window.open(item.link, "_blank")}
                >
                    <div class="overlay">
                        {item.name}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="generative-art items">
        <h1 class="title">Art pieces made with Code aka Generative Art</h1>
        <div class="grid">
            {#each generativeArt as item}
                <div 
                    class="item"
                    style={`background-image: url("${item.imgSrc}");`}
                    on:click={() => window.open(item.link, "_blank")}
                >
                    <div class="overlay">
                        {item.name}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="web-applications items">
        <h1 class="title">Interactive websites aka Web Applications</h1>
        <div class="grid">
            {#each webApplications as item}
                <div 
                    class="item"
                    style={`background-image: url("${item.imgSrc}");`}
                    on:click={() => window.open(item.link, "_blank")}
                >
                    <div class="overlay">
                        {item.name}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <br/>
    <div class="latest-blog-posts items">
        <h1 class="title">latest blog posts</h1>
        <div class="grid">
            {#each posts.splice(0,3) as item}
                <div 
                    class="item post"
                >
                <h2 
                class="title"
                on:click={() => navigate(`/post/${item._id}`)}
            >
                {item.title}
            </h2>
            <p class="date">
                {makeCreatedOnUserFriendly(item.createdOn)}
            </p>
            <div class="teaser">
                {@html item.teaser}
            </div>
                </div>
            {/each}
        </div>
    </div>
</Content>