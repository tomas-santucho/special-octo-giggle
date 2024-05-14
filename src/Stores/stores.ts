import {writable} from "svelte/store";

const storedUsername = localStorage.getItem("user-name");

function persistentStore(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? JSON.parse(storedValue) : initialValue;
    const store = writable(data);

    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

export const isLoggedIn = writable(localStorage.getItem("jwt-token") !== null);
export const username = persistentStore("user-name", '');

export const showNewTable = writable(false);
export const showAllTables = writable(false);
export const showOpenTables = writable(false);

export const isEditingTable = writable(false)

//this should be an object

export const editId = writable<string>()
export const editName = writable<string>()
export const editAmount = writable<number>()
export const editNotes = writable<string>()
