<!-- src/AllTables.svelte -->
<script lang="ts">



    import {fetchAllTables} from "../service/TableService";

    function goBack() {
        window.location.href = '/dashboard';
    }
</script>

<div class="max-w-2xl mx-auto mt-8">
    <h1 class="text-3xl font-semibold">All Tables</h1>
    <div class="overflow-x-auto mt-4">
        <table class="table table-zebra w-full">
            <thead>
            <tr>
                <th>Guest Name</th>
                <th># Guests</th>
                <th>Arrived at</th>
                <th>Server</th>
            </tr>
            </thead>
            <tbody>
            {#await fetchAllTables()}
            {:then tables}
                {#each tables as table (table.id)}
                    <tr>
                        <td>{table.guestName}</td>
                        <td>{table.amount}</td>
                        <td>{table.arrivedAt}</td>
                        <td>{table.server}</td>
                    </tr>
                {/each}
            {:catch e}
            {/await}

            </tbody>
        </table>
    </div>
    <a href="#" on:click={goBack} class="link text-blue-600 mt-4 block">home</a>
</div>
