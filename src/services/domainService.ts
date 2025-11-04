import type { ApiSuccessResponse } from "@/types/rest";
import { apiFetch } from "../lib/client/api";
import type { DnsRecord } from "../types/dns";

export async function fetchRecords(): Promise<DnsRecord[]> {
    const authToken = sessionStorage.getItem('authToken')
    const response = await apiFetch<ApiSuccessResponse<DnsRecord[]>>('/domains', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.data;
}

export async function getDomainConfig(): Promise<{ zoneId: string, baseDomain: string, provider: string }> {
    const authToken = sessionStorage.getItem('authToken')
    const response = await apiFetch<ApiSuccessResponse<{ zoneId: string, baseDomain: string, provider: string }>>('/domain/config', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return response.data;
}

export async function createRecord(record: { subdomain: string; ipv4: string; ipv6: string }): Promise<{ "id": string; }> {
    const authToken = sessionStorage.getItem('authToken')
    const response = await apiFetch<ApiSuccessResponse<{ "id": string; }>>('/domain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        data: JSON.stringify({
            domain_name: record.subdomain,
            ip_v4: record.ipv4,
            ip_v6: record.ipv6,
        })
    });
    return response.data;
}

export async function updateRecord(id: string, record: Partial<{ ipv4: string; ipv6: string }>): Promise<void> {
    const authToken = sessionStorage.getItem('authToken')
    await apiFetch<ApiSuccessResponse<string>>(`/domain/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        data: JSON.stringify({
            new_ip_v4: record.ipv4,
            new_ip_v6: record.ipv6,
        })
    });
}

export async function deleteRecord(id: string): Promise<void> {
    const authToken = sessionStorage.getItem('authToken')
    await apiFetch<void>(`/domain/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
}