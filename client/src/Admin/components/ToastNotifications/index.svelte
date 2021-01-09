<script>
    import { ToastNotification } from "carbon-components-svelte";
    import { toastNotifications } from "../../stores/globalStore";
</script>

<style>
    .notifications-container {
        position: fixed;
        z-index: 1000;
        top: 100px;
        right: 0;
    }
</style>

<div class="notifications-container">
    {#each $toastNotifications as notification}
        <ToastNotification
            lowContrast 
            kind={notification.kind}
            title={notification.title}
            caption={notification.caption} 
            timeout="5000"
        />
    {/each}
</div>
