import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Package, Truck, Palette, User, Zap } from "lucide-react";
import sbLogo from "@/assets/brand/sb-logo.jpg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Products", url: "/products", icon: Package },
  { title: "Special Agents", url: "/agents", icon: Zap },
  { title: "Order Tracker", url: "/tracker", icon: Truck },
  { title: "Design Studio", url: "/studio", icon: Palette },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (u: string) => (u === "/" ? pathname === "/" : pathname.startsWith(u));

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border/60 py-4">
        <Link to="/" className="flex items-center gap-2 px-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-teal">
            <img src={sbLogo} alt="JustPrint SB logo" className="h-full w-full object-contain p-0.5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="font-display text-lg font-semibold tracking-tight text-sidebar-foreground">JustPrint</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/60">.com</div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-xl bg-sidebar-accent/50 p-3 text-xs text-sidebar-foreground/80">
          <div className="font-medium text-sidebar-foreground">Need help?</div>
          <div className="mt-0.5">Chat with a print expert 9am–9pm.</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
