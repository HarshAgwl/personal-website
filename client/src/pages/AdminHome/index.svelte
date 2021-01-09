<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    import { Content, ClickableTile } from 'carbon-components-svelte'

    import LoginModal from "./LoginModal.svelte";

    let loginModalOpen = false

    const handle = (promise) => {
        return promise
            .then((data) => [data, false])
            .catch((error) => [undefined, error]);
    };

    onMount(async() => {
      const [response, err] = await handle(axios.get("/api/users")); 
      if(err){
        loginModalOpen = true
      }
    })
</script>

<style>
  .flexbox{
    display: flex;
    gap: 20px;
  }
  :global(.flexbox a){
    flex: 1;
    font-size: 20px;
  }
</style>

<Content class="content">
  <h1>Welcome to the Admin section</h1>
  <br/>
  <div class="flexbox">
      <ClickableTile href="/admin/posts">
          Posts
      </ClickableTile>
  </div>
</Content>

<LoginModal bind:loginModalOpen={loginModalOpen} />