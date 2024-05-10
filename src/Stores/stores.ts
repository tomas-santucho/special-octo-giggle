import {writable} from "svelte/store";

export const isLoggedIn = writable(localStorage.getItem("jwt-token") !== null);
export const username =   localStorage.getItem("user-name")