import { useEffect, useState } from "react";
import ServerApi from "../api/server.api";

export default function Index() {


    const [handshake, setHandShake] =  useState("");


    useEffect(() => {


        const load = async () => {

            const api = new ServerApi();


            const response = await api.handShake();

            if (response.status === 200) {
                setHandShake(response.data);
            }
            

        };

        load();
    },[])

    return (    
        <div className="p-4 bg-slate-200 m-2 rounded-lg flex flex-col gap-4">
            <h1 className="border border-slate-300 p-1 rounded-lg">Hola desde el cliente!</h1>
            { handshake.length > 0 && <p className="border border-slate-300 p-1 rounded-lg">Respuesta del servidor: {handshake}</p> }
            { handshake.length === 0 && <p className="border border-slate-300 p-1 rounded-lg">Sin respuesta del servidor</p> }
        </div>
    );
}