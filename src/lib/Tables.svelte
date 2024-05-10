<!-- src/Tables.svelte -->
<script lang="ts">
    import {fetchMyTables, finishTable, giveupTableById} from "../service/TableService";
    import {username} from "../Stores/stores";

    export let onNewTable;
    export let onViewAllTables;
    export let onViewOpenTables;

    async function finished(id) {
        await finishTable(id)
        window.location.href = '/dashboard';
    }

    function edit(id) {
        console.log(`Editando mesa con ID: ${id}`);
    }

    async function giveUpTable(id) {
        console.log(`Cediendo mesa con ID: ${id}`);
        await giveupTableById(id)
        window.location.href = '/dashboard';
    }
</script>

<div class="max-w-2xl mx-auto mt-8">
    <h1 class="text-2xl font-semibold text-orange-500">Welcome back, {username}.</h1>
    <h2 class="text-lg font-semibold mt-4">Your Tables</h2>
    <div class="overflow-x-auto mt-2">
        <table class="table table-zebra w-full">
            <thead>
            <tr>
                <th>Guest Name</th>
                <th># Guests</th>
                <th>Arrived at</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#await fetchMyTables()}
            {:then tables}
                {#each tables as table (table.id)}
                    <tr>
                        <td>{table.guestName}</td>
                        <td>{table.amount}</td>
                        <td>{table.arrivedAt}</td>
                        <td>
                            <button on:click={() => finished(table.id)} class="link text-blue-600">finished</button> |
                            <button on:click={() => edit(table.id)} class="link text-blue-600">edit</button> |
                            <button on:click={() => giveUpTable(table.id)} class="link text-pink-600">Give Up Table</button>
                        </td>
                    </tr>
                {/each}
            {:catch e}
            {/await}
            </tbody>
        </table>
    </div>
    <a href="#" on:click={onViewAllTables} class="link text-blue-600 mt-4 block">See Other Tables</a>
    <a href="#" on:click={onViewOpenTables} class="link text-blue-600 mt-4 block">See Open Tables</a>
    <button on:click={onNewTable} class="btn btn-primary mt-4">+ new table</button>
</div>
