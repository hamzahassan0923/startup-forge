import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";


const LayoutPage = ({ children }) => {
    return (
        <div className='flex min-h-screen'>
        <DashboardSidebar></DashboardSidebar>
            <div className='flex-1 p-4'>
                {children}
            </div>
        </div>
    );
};

export default LayoutPage;