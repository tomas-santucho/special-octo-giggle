<!-- src/OpenTables.svelte -->
<script lang="ts">


    import {fetchOpenTables, pickupTableById} from "../service/TableService";

    async function pickupTable(id) {
        await pickupTableById(id)
        goBack()
    }

    function goBack() {
        window.location.href = '/dashboard';
    }
</script>

<div class="max-w-2xl mx-auto mt-8">
    <h1 class="text-3xl font-semibold">Open Tables</h1>
    <div class="overflow-x-auto mt-4">
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
            {#await fetchOpenTables()}
            {:then openTables}
                {#each openTables as table (table.id)}
                    <tr>
                        <td>{table.guestName}</td>
                        <td>{table.amount}</td>
                        <td>{table.arrivedAt}</td>
                        <td>
                            <button on:click={() => pickupTable(table.id)} class="link text-blue-600">Pickup Table
                            </button>
                        </td>
                    </tr>
                {/each}
            {:catch e}
            {/await}
            </tbody>
        </table>
    </div>
    <a href="#" on:click={goBack} class="link text-blue-600 mt-4 block">home</a>
</div>