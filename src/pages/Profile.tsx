import React from "react";
import Sidebar from "@/components/ui/sidebar";
import NavBar from "@/components/ui/nav";
import Profile from "@/components/ui/profile";


const ProfilePage: React.FC = () => {
    const [, setCreateDialogOpen] = React.useState<boolean>(false);

    return (
        <div className="flex max-h-screen">
            <Sidebar />
            <div className="ml-60 flex min-h-screen flex-1 flex-col">
                <NavBar setCreateDialogOpen={setCreateDialogOpen} />
                <Profile />
            </div>
        </div>
    );
};

export default ProfilePage;
