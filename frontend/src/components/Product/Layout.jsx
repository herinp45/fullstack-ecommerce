import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <Outlet />
            </main>
        </>
    )
}
export default Layout;