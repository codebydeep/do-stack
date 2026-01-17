import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { ProfileDropdown } from "@/components/DropDownMenu";
import { useTeamStore } from "@/store/useTeamStore";

export const Dashboard = () => {
  const { team } = useTeamStore();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Page Content */}
        <main className="flex-1">
          {/* Top Navbar */}
            <nav className="flex w-7xl items-center justify-between px-4 py-2 border-b">

            <div className=" flex items-center justify-baseline gap-2">
            <SidebarTrigger />
              <div className="flex gap-2">
                <h4 className="text-gray-400 font-bold">
                  {team ? "" : "No team"}
                </h4>
              <h4>Projects</h4>
              </div>

            </div>
              <ProfileDropdown />
          </nav>

          {/* Page body */}
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};