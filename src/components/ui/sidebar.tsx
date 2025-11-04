
import avatarImage from "@/assets/images/avatar.png";
import downChevronIcon from "@/assets/icons/down_chevron.svg";
import DnsIcon from "@/components/icons/DnsIcon";
import PortForwardingIcon from "@/components/icons/PortForwardingIcon";
import DocsIcon from "@/components/icons/DocumentationIcon";
import SupportIcon from "@/components/icons/SupportIcon";
import React from "react";
import { useDnsRecordContext } from "@/hooks/useDns";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
export default function Sidebar() {
    const { records, isFetchLoading, isFetchError } = useDnsRecordContext();
    const { user, logout } = useAuth();
    const navItems = React.useMemo(() => [
        { name: "DNS Records", href: "dashboard", current: true, count: records?.length, icon: DnsIcon },
        { name: "Port Forwarding", href: "#", current: false, count: 0, icon: PortForwardingIcon },
    ], [records]);


    const helpItems = [
        { name: "Documentation", href: "https://github.com/RndmCodeGuy20/dyno-fe", current: false, icon: DocsIcon },
        { name: "Support", href: "https://github.com/RndmCodeGuy20/dyno-fe/issues/new", current: false, icon: SupportIcon },
    ];

    const handleLogout = () => {
        logout();
    };
    return (
        <aside
            className="fixed left-0 top-0 h-screen max-h-screen w-60 bg-zinc-50 text-white border-r border-zinc-200 flex flex-col"
            aria-label="Sidebar"
        >
            <div className="h-16 border-b border-zinc-200  flex items-center px-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center cursor-pointer  w-full">
                            <img
                                src={avatarImage}
                                alt="User Avatar"
                                className="h-8 w-auto rounded-sm"
                            />
                            <span className="ml-2 text-md font-medium text-zinc-950">{user?.username}</span>
                            <img src={downChevronIcon} alt="dropdown" className="ml-1 h-4 w-4 brightness-0" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {/* <DropdownMenuLabel className="text-xs text-zinc-500">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuItem
                            onClick={() => {
                                window.location.href = "/profile";
                            }}
                            className="cursor-pointer text-zinc-700 hover:text-violet-600"
                        >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer text-red-600 focus:text-red-700"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex flex-col px-4 py-2 flex-1">
                <ul className="gap-1 flex flex-col mt-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={`py-2 rounded-md text-sm font-medium flex items-center text-zinc-800 hover:text-zinc-900 transition-colors duration-150`}
                            >
                                <item.icon stroke="var(--color-zinc-500)" height={18} width={18} />
                                <div className="ml-2 text-zinc-800">{item.name}</div>
                                {item.count !== undefined && item.count !== 0 && (
                                    <span className="ml-auto inline-block rounded-md border border-zinc-200 px-2 py-0.5 text-xs font-semibold text-zinc-800">
                                        {item.count}
                                    </span>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-t border-zinc-200 px-4 py-2">
                <ul className="space-y-1 flex flex-col mt-2">
                    {helpItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className="px-3 py-2 rounded-md text-xs font-medium flex items-center hover:bg-zinc-100"
                            >
                                <item.icon stroke="var(--color-zinc-500)" height={18} width={18} />
                                <div className="ml-2 text-zinc-800">{item.name}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside >
    )
}