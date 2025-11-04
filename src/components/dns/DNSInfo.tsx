import { getDomainConfig } from "@/services/domainService"
import { useQuery } from "@tanstack/react-query"
import { Info } from "lucide-react"

interface DomainInfoPanelProps {
    gotchas?: string[]
}

const DomainInfoPanel: React.FC<DomainInfoPanelProps> = ({
    gotchas = [],
}) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["dnsConfig"],
        queryFn: getDomainConfig,
    })

    function getValue(key: string): string {
        if (isLoading) return "-";
        if (isError) return "oops...";
        else return data?.[key as keyof typeof data] || "-";
    }

    return (
        <div className="p-6 w-full">
            <div className="w-full  rounded-xl border border-zinc-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                            Domain Overview
                            <Info className="h-4 w-4 text-zinc-400" />
                        </h2>
                        <p className="text-sm text-zinc-600 mt-0.5">
                            Manage and review DNS details for your domain.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-4">
                    <div>
                        <p className="text-xs text-zinc-500 mb-1">Base Domain</p>
                        <p className="font-mono text-sm text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-md px-2 py-1">
                            {
                                getValue('baseDomain')
                            }
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 mb-1">Provider</p>
                        <p className="font-mono text-sm text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-md px-2 py-1">
                            {
                                getValue('provider')
                            }
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 mb-1">Zone ID</p>
                        <p className="font-mono text-sm text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-md px-2 py-1">
                            {getValue('zoneId')}
                        </p>
                    </div>
                </div>

                {gotchas.length > 0 && (
                    <div className="mt-5 border-t border-zinc-200 pt-4">
                        <h3 className="text-sm font-medium text-zinc-800 mb-2">Gotchas</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600">
                            {gotchas.map((g, i) => (
                                <li key={i}>{g}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DomainInfoPanel
