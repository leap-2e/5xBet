import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { AppSidebar } from "../../components/dashboard/sidebar/app-sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
