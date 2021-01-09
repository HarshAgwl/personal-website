<script>
    import { Content } from "carbon-components-svelte";

    const appearances = [
        {
            videoId: "cGoOrbfDUys"
        },
        {
            videoId: "32dE6uwS-Tg"
        },
        {
            videoId: "OK6drJkcPDc"
        },
        {
            videoId: "5PqQXDDfun8"
        }
    ]

    const tutorials = [
        {
            videoId: "2s3s0hw38pY"
        },
        {
            videoId: "u3kq7gx0kzc"
        },
        {
            videoId: "-0-nUXyeE-Q"
        }
    ]
</script>

<style>
    .group{
        padding: 20px 0px;
    }
    .grid{
        display: grid;
        width: 100%;
        padding: 20px 0px;
        grid-gap: 10px;
        grid-template-columns: repeat(4, 25%);
    }
    .video{
        padding-right: 10px;
    }
    .iframeWrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }
    iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    @media (max-width: 960px){
        .grid{
            grid-template-columns: repeat(3, 30%);
        }
    }
    @media (max-width: 750px){
        .grid{
            grid-template-columns: repeat(2, 50%);
        }
    }
    @media (max-width: 500px){
        .grid{
            grid-template-columns: repeat(1, 100%);
            grid-gap: 20px;
        }
    }
</style>

<Content class="content">
<div>
    <div class="group">
        <h2>Appearances</h2>
        <hr/>
        <div class="embeds grid">
            {#each appearances as video}
                <div class="video">
                    <div class="iframeWrapper">
                        <iframe 
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            title="iframe video"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="group">
        <h2>Tutorials</h2>
        <hr/>
        <div class="embeds grid">
            {#each tutorials as video}
                <div class="video">
                    <div class="iframeWrapper">
                        <iframe 
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            title="iframe video"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
</Content>