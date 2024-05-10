<script lang="ts">

    import {createTable} from "../service/TableService";

    let guestName = '';
    let numGuests = '';
    let notes = '';

    let errorMessage = '';

    async function validateAndSubmit() {
        errorMessage = '';
        const amount = parseInt(numGuests, 10);

        // Validaciones
        if (guestName.length < 2) {
            errorMessage = 'Guest name must be at least 2 letters';
            return;
        }

        if (isNaN(amount) || amount < 1 || amount > 10) {
            errorMessage = 'Number of guests must be from 1 - 10';
            return;
        }

        console.log('Enviando:', { guestName, amount, notes });
        await createTable( { guestName, amount, notes })



        window.location.href = '/dashboard';
    }

    function cancel() {
        window.location.href = '/dashboard';
    }
</script>

<div class="max-w-xl mx-auto mt-8">
    <h1 class="text-3xl font-semibold">New Table</h1>
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
            <button on:click={validateAndSubmit} class="btn btn-primary">Submit</button>
        </div>
    </div>
</div>
