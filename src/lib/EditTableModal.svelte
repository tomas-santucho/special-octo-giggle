<script lang="ts">
    import { updateTable } from "../service/TableService";
    import type { TableRequest } from "../service/TableService";

    export let table;
    export let onClose;

    let guestName = table.guestName;
    let amount = table.amount.toString();
    let notes = table.notes || '';
    let errorMessage = '';

    async function submit() {
        errorMessage = '';

        if (guestName.length < 2) {
            errorMessage = 'Guest name must be at least 2 letters';
            return;
        }

        const amountInt = parseInt(amount, 10);
        if (isNaN(amountInt) || amountInt < 1 || amountInt > 10) {
            errorMessage = 'Number of guests must be from 1 - 10';
            return;
        }

        const tableRequest: TableRequest = {
            guestName,
            amount: amountInt,
            notes
        };

        try {
            await updateTable(table.id, tableRequest);
            onClose();
            window.location.href = '/dashboard';  // Redirect after successful edit
        } catch (error) {
            console.error('Failed to update table:', error);
            errorMessage = 'Failed to update table';
        }
    }

    function cancel() {
        onClose();
    }
</script>

<div class="modal">
    <div class="modal-content">
        <h2 class="text-2xl font-semibold mb-4">Edit Table</h2>
        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}
        <div class="mt-4 space-y-4">
            <div>
                <label class="label">Guest Name</label>
                <input bind:value={guestName} placeholder="Guest Name" class="input input-bordered w-full" />
            </div>
            <div>
                <label class="label">Number of Guests</label>
                <input bind:value={amount} type="number" placeholder="Number of Guests" class="input input-bordered w-full" min="1" max="10" />
            </div>
            <div>
                <label class="label">Notes</label>
                <textarea bind:value={notes} placeholder="Notes (optional)" class="textarea textarea-bordered w-full"></textarea>
            </div>
            <div class="flex space-x-4 mt-4">
                <button on:click={cancel} class="btn">Cancel</button>
                <button on:click={submit} class="btn btn-primary">Save Changes</button>
            </div>
        </div>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 5px;
        width: 90%;
        max-width: 500px;
    }
</style>
