<script>
    import axios from 'axios'

    import {
        ComposedModal,
        ModalHeader,
        ModalBody,
        TextInput,
        Button,
        InlineNotification
    } from "carbon-components-svelte";

    export let loginModalOpen ;

    let notifications = [];
    let password = ""

    const handle = (promise) => {
        return promise
            .then((data) => [data, false])
            .catch((error) => [undefined, error]);
    };

    const updateNotifications = (notification) => {
      notifications = [...notifications, notification]
    }

    const login = async () => {
        const [_, error] = await handle(
            axios.post("/api/users/login", {
                password
            })
        );
        if (error) {
           updateNotifications({
                    kind: "error",
                    title: "Error logging you in",
                    subtitle: "Password provided might be incorrect",
                })
        } else {
            updateNotifications({
                    kind: "success",
                    title: "Successfully logged in",
                    subtitle: "",
                })
            setTimeout(() => window.location.reload(), 1000);
        }
    };
</script>

<ComposedModal 
 open={loginModalOpen} 
 on:close={() => (loginModalOpen = false)}
>
    <ModalHeader title="Login" />
    <ModalBody hasForm>
        <TextInput labelText="Password" bind:value={password} />
        <br />
        <Button on:click={login}>Submit</Button>

        {#each notifications as notification}
            <InlineNotification
                kind={notification.kind}
                title={notification.title}
                subtitle={notification.subtitle}
                timeout="5000" />
        {/each}
    </ModalBody>
</ComposedModal>
