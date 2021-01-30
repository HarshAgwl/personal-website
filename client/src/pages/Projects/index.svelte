<script>
    import { Content } from "carbon-components-svelte";

    const playStoreIconUrl = "https://www.gstatic.com/android/market_images/web/play_prism_hlock_2x.png"

    let videoGames = [
        {
            thumbnailUrl: "https://2.bp.blogspot.com/-_HgaltTme3I/XWqI23TNvhI/AAAAAAAAEu4/MTSV9XHwtME-ySpy5svlQTVXkeezGONZACLcBGAs/s400/Globulas.png%0A",
            downloadLink: "https://play.google.com/store/apps/details?id=com.GenysisStudios.Globulas",
            name: "Globulas",
            description: "A physics-based ball platformer with skill-demanding levels that are fun to play!"
        },
        {
            thumbnailUrl: "https://1.bp.blogspot.com/-XgMmnYynQSA/XWqI21FiW7I/AAAAAAAAEuw/odPFMYvShdkcUJK_2zQZhtNnST_bQfatACLcBGAs/s400/TheKnightsCall.png",
            downloadLink: "https://play.google.com/store/apps/details?id=com.GenysisStudios.TheKnightsCall",
            name: "The Knight's Call",
            description: "Take the role of Ralex, a brave knight, and save the kingdom of Mardin!"
        },
        {
            thumbnailUrl: "https://4.bp.blogspot.com/-41kNZpVUCk4/XWqI23j-lKI/AAAAAAAAEu0/DSvlhsfQ9FoIemdQ26zAjaeq-ZTskgHjwCLcBGAs/s400/KnightRun.png%0A",
            downloadLink: "https://play.google.com/store/apps/details?id=com.GenysisStudios.KnightRun&hl=en_CA",
            name: "Knight Run",
            description: "A voxel graphics infinte runner game!"
        }
    ]
</script>

<style>
    .group{
        padding: 20px 0px;
    }
    .items{
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        padding-top: 5px;
    }
    .item{
        max-width: 300px;
    }
    .details{
        padding-top: 5px;
    }
    .details h3{
        padding-top: 5px;
    }
    .game-download-link{
        padding-top: 5px;
        display: flex;
        gap: 5px;
        align-items: center;
        text-decoration: none;
    }
    .game-download-link img{
        height: 25px;
    }
    .websites a{
        text-decoration: none;
    }
    .item p{
        padding-bottom: 3px;
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
    .creative-coding .item{
        width: 320px;
    }
    .creative-coding iframe{
        width: 1280px;
        height: 786px;
        border: 0;
        -ms-transform: scale(0.25);
        -moz-transform: scale(0.25);
        -o-transform: scale(0.25);
        -webkit-transform: scale(0.25);
        transform: scale(0.25);

        -ms-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
    .video + h3{
        padding-top: 5px;
    }
</style>

<Content class="content">
<div class="work">
    <div class="group">
        <h2>Video Games</h2>
        <hr/>
        <div class="items">
            {#each videoGames as videoGame}
                <div class="item">
                    <img 
                        src={videoGame.thumbnailUrl}
                        alt="Video Game Thumbnail"
                    />
                    <div class="details">
                        <h3>{videoGame.name}</h3>
                        <p>{videoGame.description}</p>
                        <a href={videoGame.downloadLink} class="game-download-link">
                            <img src={playStoreIconUrl} alt="Play Store icon">
                            <!-- Download from Play Store -->
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="group websites">
        <h2>Web Applications</h2>
        <hr/>
        <div class="items">
            <div class="item">
                <a href="https://thebookhub.org">
                    <h3>The Book Hub</h3>
                </a>
                <p>A web application that curates the best audiobooks from the Internet and allows you to listen to them from anywhere.</p>
                <p>Made with HTML, CSS, JS, and Node.js</p>
            </div>
            <div class="item">
                <a href="https://itsharshag.com">
                    <h3>Harsh Agrawal</h3>
                </a>
                <p>This very website!</p>
                <p>Made with HTML, CSS, JS, Node.js, and Svelte</p>
            </div>
        </div>
    </div>
    <div class="group creative-coding">
        <h2>Creative Coding</h2>
        <hr/>
        <div class="items">
            <div class="item">
                <div class="video">
                    <div class="iframeWrapper">
                        <iframe 
                            src={`https://harshagwl.github.io/Creative-Coding/Matrix-1/Matrix-1.html`}
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            title="iframe video"
                        />
                    </div>
                </div>
                <h3>Matrix</h3>
                <p>A simple take on the computer screen design from the classic movie Matrix</p>
                <p>Made with p5.js</p>
            </div>
        </div>
    </div>
</div>
</Content>