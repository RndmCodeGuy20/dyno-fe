import { PlusIcon } from "lucide-react";
import dynoLogo from "@/assets/images/logo.png";
import BadgeStatus from "./status_badge";


const NavBar = ({ setCreateDialogOpen }: { setCreateDialogOpen: (open: boolean) => void }) => {
    return (
        <nav
            className="sticky top-0 z-20 flex h-16 items-center border-b border-zinc-200 bg-white px-4 flex-row"
            aria-label="Top navigation"
        >
            <div className="flex-1">
                <img
                    src={dynoLogo}
                    alt="Dyno Logo"
                    className="h-8 w-auto"
                />
            </div>
            {/* <div className="flex items-center border border-zinc-300 rounded-md px-2 py-1 mr-4 bg-zinc-100 h-8">
                                <img src={searchIcon} alt="Search" className="h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="search..."
                                    className="ml-2 text-zinc-500 placeholder-zinc-400 focus:outline-none"
                                />
                            </div> */}
            <BadgeStatus />
            <div
                onClick={() => setCreateDialogOpen(true)}
                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium 
                                        text-zinc-800 bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-200
                                        border border-zinc-300 rounded-md shadow-sm
                                        transition-all duration-200 ease-out cursor-pointer
                                        hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 h-8"
            >
                <PlusIcon className="h-4 w-4 mr-2 text-violet-500" />
                Add New Record
            </div>
        </nav>

    );
}

export default NavBar;