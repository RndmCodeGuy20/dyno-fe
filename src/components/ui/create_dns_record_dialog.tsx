import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDnsRecordContext } from "@/hooks/useDns"

export function CreateDNSRecordDialog({ open, onOpenChange }: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const [subdomain, setSubdomain] = useState("")
    const [ipv4, setIpv4] = useState("")
    const [ipv6, setIpv6] = useState("")
    const { createRecord, isCreateLoading } = useDnsRecordContext();

    const handleCreate = async () => {
        if (!subdomain.trim()) return

        if (!ipv4.trim() && !ipv6.trim()) return

        const ipv4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/
        const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

        if (ipv4.trim() && !ipv4Regex.test(ipv4)) return
        if (ipv6.trim() && !ipv6Regex.test(ipv6)) return

        await createRecord({ subdomain: subdomain.trim(), ipv4: ipv4.trim(), ipv6: ipv6.trim() })
        setSubdomain("")
        setIpv4("")
        setIpv6("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-zinc-800">Create DNS Record</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="subdomain" className="text-zinc-500 text-xs">Subdomain</Label>
                        <Input
                            id="subdomain"
                            placeholder="app1"
                            value={subdomain}
                            onChange={(e) => setSubdomain(e.target.value)}
                            className="font-mono text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="ipv4" className="text-zinc-500 text-xs">IPv4 Address</Label>
                            <Input
                                id="ipv4"
                                placeholder="0.0.0.0"
                                value={ipv4}
                                onChange={(e) => setIpv4(e.target.value)}
                                className="font-mono text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ipv6" className="text-zinc-500 text-xs">IPv6 Address</Label>
                            <Input
                                id="ipv6"
                                placeholder="::1"
                                value={ipv6}
                                onChange={(e) => setIpv6(e.target.value)}
                                className="font-mono text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-zinc-600 hover:text-zinc-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!subdomain.trim() || (!ipv4.trim() && !ipv6.trim()) || isCreateLoading}
                        onClick={handleCreate}
                        className="bg-violet-500 hover:bg-violet-600 text-white"
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
