import { faHome, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {

    return (
        <div className="h-full">
            <nav className="h-full border-r border-slate-300  w-20 p-4 px-12 flex flex-col">
                <div className="flex-1 flex flex-col gap-4">
                    <a href="/admin/products"  className="flex flex-col items-center text-[0.9rem] text-wrap text-cyan-500">
                        <div className="p-1 px-2 rounded hover:bg-slate-200 transition-all">
                            <FontAwesomeIcon size="lg" icon={faUser}/>
                        </div>
                        <p>Usuarios</p>
                    </a>
                    <a href="/admin/products"  className="flex flex-col items-center text-[0.9rem] text-wrap text-cyan-500">
                        <div className="p-1 px-2 rounded hover:bg-slate-200 transition-all">
                            <FontAwesomeIcon size="lg" icon={faHome}/>
                        </div>
                        <p>Productos</p>
                    </a>
                </div>
                
                <a href="/admin/products"  className="flex flex-col items-center text-[0.9rem] text-wrap text-cyan-500">
                    <div className="p-1 px-2 rounded hover:bg-slate-200 transition-all">
                        <FontAwesomeIcon size="lg" icon={faRightFromBracket}/>
                    </div>
                    <p>Salir</p>
                </a>
            </nav>
        </div>
    );

}