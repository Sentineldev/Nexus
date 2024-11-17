import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
export default function Layout() {

    return  (
        <div className="h-screen flex">
            <div>
                <Sidebar/>
            </div>
            <div className="flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>
    );
}