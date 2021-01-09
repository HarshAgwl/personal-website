<script>
    import { ClickableTile } from 'carbon-components-svelte'
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

<h1>Welcome to the Admin section</h1>
<br/>
<div class="flexbox">
    <ClickableTile href="/admin/posts">
        Posts
    </ClickableTile>
</div>