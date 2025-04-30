import { Home, Inbox, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    title: "Food Menu",
    url: "/FoodMenu",
    icon: Home,
  },
  {
    title: "Order",
    url: "/Order",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/Settings",
    icon: Settings,
  },
]

export function DashboardSideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5 mx-2">
            <LogoX></LogoX>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-2 p-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
