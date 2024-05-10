<script lang="ts">
    import { Route } from 'svelte-routing';
    import Login from "./lib/auth/Login.svelte";
    import {token} from "./redux/stores";

    export let path;
    export let component;

    $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />
{:else}
    <Route path={path} component={Login} />
{/if}