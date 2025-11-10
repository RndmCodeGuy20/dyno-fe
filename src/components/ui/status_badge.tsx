import { API_BASE } from "@/lib/client/api";
import { useEffect, useState } from "react";


const BadgeStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const res = await fetch(`${API_BASE}/status`);
                const data = await res.json();
                setIsOnline(data.status === "ok");
            } catch {
                setIsOnline(false);
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`mr-4 px-3 py-1 ${isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-sm font-medium rounded-full h-8 flex items-center`}>
            <span className={`w-3 h-3 ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"} rounded-full mr-2`}></span>
            {isOnline ? "Online" : "Offline"}
        </div>
    );
}

export default BadgeStatus;