import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
    
    return (
        <SidebarProvider>
            <TooltipProvider>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    )
}