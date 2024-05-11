import { isLoggedIn } from "../Stores/stores";

export interface RegisterRequest {
    name: string;
    user: string;
    pass: string;
}

export interface AuthRequest {
    user: string;
    pass: string;
}

export async function login(authRequest: AuthRequest): Promise<boolean> {
    try {
        const response = await fetch(`https://table-master.fly.dev/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authRequest)
        });

        if (response.ok) {
            const authResponse = await response.json(); // Parse JSON response
            localStorage.setItem("jwt-token", authResponse.token);
            localStorage.setItem("user-name", authResponse.name); // Store the user's name
            isLoggedIn.set(true);
            console.info("Logged in as", authResponse.name);
            return true;
        } else {
            console.error("Login failed:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Error in login:", error);
        return false;
    }
}

export async function register(registerRequest: RegisterRequest): Promise<boolean> {
    try {
        const response = await fetch(`https://table-master.fly.dev/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerRequest)
        });

        if (response.ok) {
            const authResponse = await response.json(); // Parse JSON response
            localStorage.setItem("jwt-token", authResponse.token);
            localStorage.setItem("user-name", authResponse.name); // Store the user's name
            isLoggedIn.set(true);
            console.info("Registered and logged in as", authResponse.name);
            return true;
        } else {
            console.error("Registration failed:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Error in registration:", error);
        return false;
    }
}

export async function logout(): Promise<void> {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-name");
    isLoggedIn.set(false);
    console.info("Logged out");
}

export function isAuthenticated(): boolean {
    return localStorage.getItem("jwt-token") !== null;
}
