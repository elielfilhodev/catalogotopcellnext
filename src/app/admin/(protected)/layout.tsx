import AdminAuthGuard from "@/components/AdminAuthGuard"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminAuthGuard>
        <AppSidebar />
        <main className="w-full">
          {children}
        </main>
      </AdminAuthGuard>
    </SidebarProvider>
  )
}
