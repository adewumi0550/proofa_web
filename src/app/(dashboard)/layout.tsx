import { NewProjectProvider } from "@/components/new-project-context";
import { NewProjectModal } from "@/components/modals/new-project-modal";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NewProjectProvider>
            <div className="flex bg-[#fbfbfb] dark:bg-[#090909] h-screen w-full overflow-hidden transition-colors duration-500 pt-10">
                <DashboardSidebar />
                <div className="flex-1 h-full min-w-0 flex flex-col relative overflow-hidden">
                    {children}
                    <NewProjectModal />
                </div>
            </div>
        </NewProjectProvider>
    );
}
