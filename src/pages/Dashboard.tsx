import React, { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import DNSSection from "@/components/dns/DNSSection";
import NavBar from "@/components/ui/nav";


const Dashboard: React.FC = () => {
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    return (
        <div className="flex max-h-screen">
            <Sidebar />
            <div className="ml-60 flex min-h-screen flex-1 flex-col">
                <NavBar setCreateDialogOpen={setCreateDialogOpen} />
                <DNSSection createDialogOpen={createDialogOpen} setCreateDialogOpen={setCreateDialogOpen} />
            </div>
        </div>
    );
};

export default Dashboard;
