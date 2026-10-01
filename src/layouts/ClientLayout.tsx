
import Footer from "@/components/client/common/Footer";
import Header from "@/components/client/header_component/Header";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
    return (
        <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden">
            <Header />
            <main className="min-w-0 grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ClientLayout;
