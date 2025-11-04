import { DnsRecordContext } from "@/context/DNSRecordContext"
import { useContext } from "react"

export const useDnsRecordContext = () => {
    const ctx = useContext(DnsRecordContext)
    if (!ctx) throw new Error("useDnsRecordContext must be used within a DnsRecordProvider")
    return ctx
}
