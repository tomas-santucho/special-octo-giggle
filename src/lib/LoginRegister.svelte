<!-- src/LoginRegister.svelte -->
<script lang="ts">

    import {login, register} from "../service/AuthService";

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let loginEmail = '';
    let loginPassword = '';
    let errorMessage = '';

    function handleLogin() {
        login({ user: loginEmail, pass: loginPassword })
            .then(success => {
                if (success) {

                } else {
                    errorMessage = "Login failed!";
                }
            })
            .catch(error => {
                errorMessage = "An error occurred during login.";
                console.error(error);
            });
    }

    function handleRegister() {
        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match!";
            return;
        }

        register({ name: name, user: email, pass: password })
            .then(success => {
                if (success) {

                } else {
                    errorMessage = "Registration failed!";
                }
            })
            .catch(error => {
                errorMessage = "An error occurred during registration.";
                console.error(error);
            });
    }
</script>

<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full space-y-8">
        <h1 class="text-4xl font-bold text-center text-orange-500">TableMaster</h1>
        <div class="grid grid-cols-2 gap-8">
            <div>
                <h2 class="text-lg font-semibold">New Waitstaff</h2>
                <div class="space-y-4">
                    <input bind:value={name} placeholder="Name" class="input input-bordered w-full" />
                    <input bind:value={email} type="email" placeholder="Email" class="input input-bordered w-full" />
                    <input bind:value={password} type="password" placeholder="Password" class="input input-bordered w-full" />
                    <input bind:value={confirmPassword} type="password" placeholder="Confirm PW" class="input input-bordered w-full" />
                    <button on:click={handleRegister} class="btn btn-primary w-full">Register</button>
                </div>
            </div>
            <div>
                <h2 class="text-lg font-semibold">Log in</h2>
                <div class="space-y-4">
                    <input bind:value={loginEmail} type="email" placeholder="Email" class="input input-bordered w-full" />
                    <input bind:value={loginPassword} type="password" placeholder="Password" class="input input-bordered w-full" />
                    <button on:click={handleLogin} class="btn btn-primary w-full">Login</button>
                </div>
            </div>
        </div>
        {#if errorMessage}
            <div class="mt-4 p-2 border border-red-500 bg-red-100">
                <p>{errorMessage}</p>
            </div>
        {/if}
    </div>
</div>
