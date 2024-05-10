import type { TableDto } from "../model/Table";

function getAuthHeader(): HeadersInit {
    const token = localStorage.getItem("jwt-token");
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
    console.log(headers);
    return headers;
}



export async function giveupTableById(tableId: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/tables/${tableId}/giveup`, {
        method: "PUT",
        headers: getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Failed to pick up table with ID ${tableId}`);
    }
}

export async function pickupTableById(tableId: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/tables/${tableId}/pickup`, {
        method: "PUT",
        headers: getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Failed to pick up table with ID ${tableId}`);
    }
}

export async function finishTable(tableId: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/tables/${tableId}/finish`, {
        method: "PUT",
        headers: getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Failed to finish table with ID ${tableId}`);
    }
}

export async function fetchAllTables(): Promise<TableDto[]> {
    const headers = getAuthHeader();
    const response = await fetch('http://localhost:8080/api/tables', {
        method: "GET",
        headers: headers
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch tables:', errorText);
        throw new Error(`Failed to fetch tables: ${errorText}`);
    }
    return await response.json() as Promise<TableDto[]>;
}

export async function fetchMyTables(): Promise<TableDto[]> {
    const response = await fetch('http://localhost:8080/api/tables/my', {
        method: "GET",
        headers: getAuthHeader()
    });
    if (!response.ok) {
        throw new Error('Failed to fetch my tables');
    }
    return await response.json() as Promise<TableDto[]>;
}

export async function fetchOpenTables(): Promise<TableDto[]> {
    const response = await fetch('http://localhost:8080/api/tables/open', {
        method: "GET",
        headers: getAuthHeader()
    });
    if (!response.ok) {
        throw new Error('Failed to fetch open tables');
    }
    return await response.json() as Promise<TableDto[]>;
}

export async function createTable(tableRequest: TableRequest): Promise<TableDto> {
    const response = await fetch('http://localhost:8080/api/tables', {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(tableRequest)
    });
    if (!response.ok) {
        throw new Error('Failed to create table');
    }
    return await response.json() as Promise<TableDto>;
}

export interface TableRequest {
    guestName: string;
    amount: number;
    notes: string;
}

