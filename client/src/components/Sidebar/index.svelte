<script>
    import { Link, navigate } from 'svelte-routing';

    let expanded = false

    // import Menu20 from "carbon-icons-svelte/lib/Menu20";
    // import Close20 from "carbon-icons-svelte/lib/Close20";
    // import LogoLinkedIn24  from "carbon-icons-svelte/lib/LogoLinkedIn24"
    // import LogoInstagram24  from "carbon-icons-svelte/lib/LogoInstagram24"
    // import LogoTwitter24  from "carbon-icons-svelte/lib/LogoTwitter24"
    // import LogoGitHub24  from "carbon-icons-svelte/lib/LogoGitHub24"
</script>

<style>
    .sidebar{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        text-align: center;
        background: black;
        color: white;
        padding: 10px 10px;
        border-right: 1px solid rgba(255, 255, 255, 0.5);
        gap: 25px;
    }
    .avatar{
        max-width: 150px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.65);
        margin-bottom: 5px;
        /* filter: grayscale(100%); */
    }
    :global(.sidebar a){
        color: white;
        text-decoration: none;
    }
    .nav-link{
        font-size: 20px;
        padding: 10px;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .nav-links-mobile .nav-link:first-child{
        border-top: 1px solid rgba(255, 255, 255, 0.5);
    }

    .nav-links-mobile .nav-link{
        font-size: 14px;
        background: black;
        color: white;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }

    .nav-link:hover{
        /* background: rgba(255, 255, 255, 0.1); */
        cursor: pointer;
        color: #0f62fe;
    }

    @media (max-width: 500px){
        .sidebar{
            padding: 10px;
        }
    }

    .icons{
        display: flex;
        gap: 10px;
    }

    .hamburger{
        display: none;
    }

    .nav-links-mobile{
        display: none;
    }

    @media (max-width: 960px){
        .sidebar{
            text-align: left;
            flex-direction: row;
            justify-content: space-between;
            padding-left: 2rem;
            padding-right: 2rem;
        }
        .avatar{
            display: none;
        }
        .hamburger{
            display: block;
        }
        .icons{
            display: none;
        }
        .nav-links{
            display: none;
        }
        .nav-links-mobile[data-expanded=true]{
            display: block;
        }
        /* .hide-when-mobile{
            display: none;
        } */
        /* .nav-links[data-expanded=true]{
            display: none;
        } */
    }
</style>

<div class="sidebar">
    <div>
        <img 
            src="/assets/images/my-photo.jpg"
            alt="avatar"
            class="avatar"
        >
        <h3>Harsh Agrawal</h3>
        <!-- <h5>
            Chasing the sunrise 🌅!
        </h5> -->
    </div>

    <div class="hamburger">
        {#if expanded}
            <Close20 on:click={() => expanded = false} />
        {:else}
            <Menu20 on:click={() => expanded = true} />
        {/if}
    </div>

    <div class="nav-links" data-expanded={expanded}>
        <div class="nav-link" on:click={() => navigate("/")}>
            Home
        </div>
        <div class="nav-link" on:click={() => navigate("/about")}>
            About
        </div>
        <div class="nav-link" on:click={() => navigate("/work")}>
            Work
        </div>
        <div class="nav-link" on:click={() => navigate("/videos")}>
            Videos
        </div>
    </div>

    <div class="icons">
        <a href="https://www.linkedin.com/in/itsharshag" alt="LinkedIn link">
            <!-- <LogoLinkedIn24/> -->
            LinkedIn
        </a>
        <a href="https://www.instagram.com/_itsharshag" alt="Instagram link">
            <!-- <LogoInstagram24/> -->
            Instagram
        </a>
        <a href="https://twitter.com/itsharshag" alt="Twitter link">
            <!-- <LogoTwitter24/> -->
            Twitter
        </a>
        <a href="https://github.com/HarshAgwl" alt="GitHub link">
            <!-- <LogoGitHub24/> -->
            GitHub
        </a>
    </div>
</div>
<div class="nav-links-mobile" data-expanded={expanded}>
    <div class="nav-link" on:click={() => navigate("/")}>
        Home
    </div>
    <div class="nav-link" on:click={() => navigate("/about")}>
        About
    </div>
    <div class="nav-link" on:click={() => navigate("/work")}>
        Work
    </div>
    <div class="nav-link" on:click={() => navigate("/videos")}>
        Videos
    </div>
</div>