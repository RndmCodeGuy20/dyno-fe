import { CreateDNSRecordDialog } from "../ui/create_dns_record_dialog";
import DNSInfo from "./DNSInfo";
import DNSRecords from "./DNSRecords";

export default function DNSSection(
    {
        createDialogOpen,
        setCreateDialogOpen,
    }: {
        createDialogOpen: boolean;
        setCreateDialogOpen: (open: boolean) => void;
    }
) {
    return (
        <main
            className="flex-1 overflow-auto bg-white p-4 relative"
            aria-label="Main content"
        >
            <div className="absolute inset-0 overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full">
                <div className="flex p-4 opacity-30 items-center justify-center h-full">
                    <div className="w-30 h-30 bg-violet-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-green-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-yellow-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-orange-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-red-500 transform -skew-y-12"></div>
                </div>
            </div>

            <div className="flex flex-col h-full relative w-full z-10 backdrop-blur-3xl items-center">
                <DNSInfo gotchas={
                    [
                        "Your IPv4 entry corresponds to the A record of the actual DNS record.",
                        "Your IPv6 entry corresponds to the AAAA record of the actual DNS record.",
                    ]
                } />
                <DNSRecords />
                <CreateDNSRecordDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
            </div>
        </main>
    );
}