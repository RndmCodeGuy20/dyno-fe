import React, { createContext } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { DnsRecord } from "@/types/dns"
import {
    fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
} from "@/services/domainService"
import { toast } from "sonner"

interface DnsRecordContextValue {
    records: DnsRecord[] | undefined

    createRecord: (data: { subdomain: string; ipv4: string; ipv6: string }) => Promise<{ "id": string; }>
    updateRecord: (id: string, data: Partial<{ ipv4: string; ipv6: string }>) => Promise<void>
    deleteRecord: (id: string) => Promise<void>
    refetch: () => void

    isFetchLoading: boolean
    isFetchError: boolean
    fetchError: unknown

    isCreateLoading: boolean
    isCreateError: boolean
    createError: unknown

    isUpdateLoading: boolean
    isUpdateError: boolean
    updateError: unknown

    isDeleteLoading: boolean
    isDeleteError: boolean
    deleteError: unknown
}


export const DnsRecordContext = createContext<DnsRecordContextValue | null>(null)

export const DnsRecordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient()

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["dnsRecords"],
        queryFn: fetchRecords,
    })

    const createMutation = useMutation({
        mutationFn: createRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dnsRecords"] });
            toast.success("DNS record created successfully");
        },
        onError: () => {
            toast.error("Failed to create DNS record");
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<{ ipv4: string; ipv6: string }> }) =>
            updateRecord(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dnsRecords"] });
            toast.success("DNS record updated successfully");
        },
        onError: () => {
            toast.error("Failed to update DNS record");
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dnsRecords"] });
            toast.success("DNS record deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete DNS record");
        },
    })

    const value: DnsRecordContextValue = {
        records: data,
        createRecord: async (data) => createMutation.mutateAsync(data),
        updateRecord: async (id, data) => updateMutation.mutateAsync({ id, data }),
        deleteRecord: async (id) => deleteMutation.mutateAsync(id),
        refetch,
        isFetchLoading: isLoading,
        isFetchError: isError,
        fetchError: error,
        isCreateLoading: createMutation.isPending,
        isCreateError: createMutation.isError,
        createError: createMutation.error,
        isUpdateLoading: updateMutation.isPending,
        isUpdateError: updateMutation.isError,
        updateError: updateMutation.error,
        isDeleteLoading: deleteMutation.isPending,
        isDeleteError: deleteMutation.isError,
        deleteError: deleteMutation.error,
    }

    return <DnsRecordContext.Provider value={value}>{children}</DnsRecordContext.Provider>
}