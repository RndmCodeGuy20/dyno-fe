import { useAuth } from "@/hooks/useAuth";
import { Eye, Info, Clipboard } from "lucide-react";
import React from "react";
import { toast } from "sonner";


const Profile: React.FC = () => {
    const { user, token } = useAuth();

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
                <div className="p-6 w-full">
                    <div className="w-full  rounded-xl border border-zinc-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                                    Profile Overview
                                    <Info className="h-4 w-4 text-zinc-400" />
                                </h2>
                                <p className="text-sm text-zinc-600 mt-0.5">
                                    Manage and review your profile details.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-4">
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">Username</p>
                                <p className="font-mono text-sm text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-md px-2 py-1">
                                    {
                                        user?.username || "-"
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">Email</p>
                                <p className="font-mono text-sm text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-md px-2 py-1">
                                    {
                                        user?.email || "-"
                                    }
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs text-zinc-500">Token</p>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => {
                                                const tokenElement = document.getElementById('token-value');
                                                if (tokenElement) {
                                                    tokenElement.classList.toggle('blur-sm');
                                                }
                                            }}
                                            className="text-xs text-zinc-600 hover:text-zinc-900"
                                        >
                                            {/* Toggle visibility */}
                                            <Eye size={12} />
                                        </button>
                                        <div
                                            onClick={() => {
                                                if (token) {
                                                    navigator.clipboard.writeText(token);
                                                    toast.success("Token copied to clipboard!");
                                                }
                                            }}
                                            className="text-xs text-zinc-600 hover:text-zinc-900"
                                        >
                                            <Clipboard size={12} />
                                        </div>
                                    </div>
                                </div>
                                <div

                                    className="font-mono text-sm text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-md px-2 py-1 transition-all"
                                >
                                    <p id="token-value" className="blur-sm select-all">
                                        {token || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
