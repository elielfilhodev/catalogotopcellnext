"use client"

import {
    FolderOpen,
    Home,
    LayoutDashboard,
    LogOut,
    Package,
    Settings,
    ShoppingCart,
    Users,
} from "lucide-react"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

const mainItems = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Produtos",
        url: "/admin/products",
        icon: Package,
    },
    {
        title: "Categorias",
        url: "/admin/categories",
        icon: FolderOpen,
    },
    {
        title: "Pedidos",
        url: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Usuários",
        url: "/admin/users",
        icon: Users,
    },
]

const settingsItems = [
    {
        title: "Configurações",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-4 p-6">
                    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        CA
                    </div>
                    <span className="font-semibold text-lg">Catálogo</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="overflow-x-hidden">
                <SidebarMenu>
                    {mainItems.map((item) => (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.url}
                                className="h-10 pl-6"
                            >
                                <a href={item.url}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                <SidebarSeparator className="my-4" />

                <SidebarMenu>
                    {settingsItems.map((item) => (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.url}
                                className="h-10 p-6"
                            >
                                <a href={item.url}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="h-10">
                            <a href="/">
                                <Home className="h-4 w-4" />
                                <span>Voltar para Loja</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => {
                                localStorage.removeItem("admin_logged_in")
                                window.location.href = "/admin/login"
                            }}
                            className="h-10"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sair</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}