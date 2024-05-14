<script lang="ts">

    import {createTable, updateTable} from "../service/TableService";
    import {editAmount, editId, editName, editNotes, isEditingTable} from "../Stores/stores";

    export let guestName = '';
    export let numGuests = '';
    export let notes = '';

    export let id = ''

    if ($isEditingTable){
        guestName = $editName
        numGuests = $editAmount
        notes = $editNotes
        id = $editId
    }

    let errorMessage = '';

    async function validateAndSubmit() {
        errorMessage = '';
        const amount = parseInt(numGuests, 10);

        if (guestName.length < 2) {
            errorMessage = 'Guest name must be at least 2 letters';
            return;
        }

        if (isNaN(amount) || amount < 1 || amount > 10) {
            errorMessage = 'Number of guests must be from 1 - 10';
            return;
        }

        console.log('Enviando:', {id, guestName, amount, notes });
        if (!$isEditingTable){
            await createTable( {id, guestName, amount, notes })
        }else{
            await updateTable ({id, guestName, amount, notes })
        }




        window.location.href = '/dashboard';
    }

    function cancel() {
        window.location.href = '/dashboard';
    }
</script>

<div class="max-w-xl mx-auto mt-8">
    {#if !$isEditingTable}
        <h1 class="text-3xl font-semibold">New Table</h1>
    {:else}
        <h1 class="text-3xl font-semibold">Edit table</h1>
    {/if}

    {#if errorMessage}
        <p class="text-red-500 mt-2">{errorMessage}</p>
    {/if}
    <div class="mt-4 space-y-4">
        <div>
            <label class="label">Guest Name</label>
            <input bind:value={guestName} placeholder="Guest Name" class="input input-bordered w-full" />
        </div>
        <div>
            <label class="label">Number of Guests</label>
            <input bind:value={numGuests} type="number" placeholder="Number of Guests" class="input input-bordered w-full" min="1" max="10" />
        </div>
        <div>
            <label class="label">Notes</label>
            <textarea bind:value={notes} placeholder="Notes (optional)" class="textarea textarea-bordered w-full"></textarea>
        </div>
        <div class="flex space-x-4 mt-4">
            <button on:click={cancel} class="btn">Cancel</button>
            <button on:click={validateAndSubmit} class="btn btn-primary">
                {#if !$isEditingTable}
                    Submit
                {:else}
                    Edit
                {/if}
            </button>
        </div>
    </div>
</div>
