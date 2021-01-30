<script>
    import { Link, navigate } from 'svelte-routing';

    import Menu20 from 'carbon-icons-svelte/lib/Menu20'
    import Close20 from 'carbon-icons-svelte/lib/Close20'

    import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
    
    export let location
    let expanded = false

    const navLinks = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Blog",
            path: "/blog"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Projects",
            path: "/projects"
        },
        {
            name: "Videos",
            path: "/videos"
        }
    ]

    let activePath = (pathname) => location.pathname === pathname

    $: activePath = (pathname) => location.pathname === pathname
</script>

<style>
    .sidebar{
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        flex-direction: column;
        text-align: center;
        background: black;
        color: white;
        padding: 10px 0px;
        border-right: 1px solid rgba(255, 255, 255, 0.5);
        gap: 25px;
    }
    :global(.sidebar a){
        color: white;
        text-decoration: none;
    }
    .me{
        text-align: right;   
    }
    .me h3{
        letter-spacing: 1.25px;
        font-size: 30px;
        padding-bottom: 5px;
    }
    .nav-links{
        width: 100%;
    }
    .nav-link{
        font-size: 20px;
        padding: 10px 0px;
        transition: 0.3s;
        width: 100%;
        text-align: right;
        letter-spacing: 1px;
        font-size: 25px;
    }
    .nav-link[data-active=true], .nav-link:hover{
        cursor: pointer;
        background: white;
        color: black;
    }
    .nav-links-mobile{
        display: none;
    }
    .nav-links-mobile .nav-link{
        font-size: 14px;
        background: black;
        color: white;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
    .nav-links-mobile .nav-link:first-child{
        border-top: 1px solid rgba(255, 255, 255, 0.5);
    }
    .icons{
        display: flex;
        gap: 10px;
    }
    :global(.icons a svg){
        width: 20px;
    }  
    .hamburger{
        display: none;
    }
    @media (max-width: 960px){
        .me h3{
            padding-right: 32px;
            letter-spacing: normal;
            font-size: 20px;
        }
        .nav-link{
            text-align: left;
            padding-left: 32px;
        }
        .sidebar{
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 2rem;
            padding-right: 2rem;
            text-align: left;
        }
        .hamburger{
            display: block;
            cursor: pointer;
        }
        .nav-links, .me .roles, .icons{
            display: none;
        }
        .nav-links-mobile[data-expanded=true]{
            display: block;
        }
    }
    .pd-rt-25{
        padding-right: 25px;
    }
</style>

<div class="sidebar">
    <div class="me pd-rt-25">
        <h3>
            Harsh Agrawal
        </h3>
        <span class="roles">
            Coder • Artist • Tinkerer
        </span>
    </div>
    <div class="hamburger">
        {#if expanded}
            <Close20 on:click={() => expanded = false} />
        {:else}
            <Menu20 on:click={() => expanded = true} />
        {/if}
    </div>
    <div class="nav-links" data-expanded={expanded}>
        {#each navLinks as navLink}
            <div 
                class="nav-link pd-rt-25" 
                on:click={() => navigate(navLink.path)}
                data-active={activePath(navLink.path)}
            >
                {navLink.name}
            </div>
        {/each}
    </div>
    <div class="icons pd-rt-25">
        <a 
            href="https://www.linkedin.com/in/itsharshag" 
            alt="LinkedIn link"
            target="_blank"
        >
            <FaLinkedin/>
        </a>
        <a
            href="https://www.instagram.com/_itsharshag" 
            alt="Instagram link"
            target="_blank"
        >
            <FaInstagram/>
        </a>
        <a 
            href="https://twitter.com/itsharshag"
            alt="Twitter link"
            target="_blank"
        >
            <FaTwitter/>
        </a>
        <a 
            href="https://github.com/HarshAgwl" 
            alt="GitHub link"
            target="_blank"
        >
            <FaGithub/>
        </a>
    </div>
</div>
<div class="nav-links-mobile" data-expanded={expanded}>
    {#each navLinks as navLink}
        <div 
            class="nav-link pd-rt-25" 
            on:click={() => navigate(navLink.path)}
            data-active={activePath(navLink.path)}
        >
            {navLink.name}
        </div>
    {/each}
</div>