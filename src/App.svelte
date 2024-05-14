<script lang="ts">
    import LoginRegister from "./lib/LoginRegister.svelte";
    import NewTable from "./lib/NewTable.svelte";
    import AllTables from "./lib/AllTables.svelte";
    import OpenTables from "./lib/OpenTables.svelte";
    import Tables from "./lib/Tables.svelte";
    import {isEditingTable, isLoggedIn, showAllTables, showNewTable, showOpenTables} from "./Stores/stores";



    function handleNewTable() {
        $isEditingTable = false
        $showNewTable = true;
        $showAllTables = false;
        $showOpenTables = false;
    }

    function handleDashboard() {
        $showNewTable = false;
        $showAllTables = false;
        $showOpenTables = false;
    }

    function handleViewAllTables() {
        $showNewTable = false;
        $showAllTables = true;
        $showOpenTables = false;
    }

    function handleViewOpenTables() {
        $showNewTable = false;
        $showAllTables = false;
        $showOpenTables = true;
    }
</script>

{#if !$isLoggedIn}
    <LoginRegister />
{:else}
    {#if $showNewTable}
        <NewTable />
    {:else if $showAllTables}
        <AllTables />
    {:else if $showOpenTables}
        <OpenTables />
    {:else}
        <Tables onNewTable={handleNewTable} onViewAllTables={handleViewAllTables} onViewOpenTables={handleViewOpenTables} />
    {/if}
{/if}
