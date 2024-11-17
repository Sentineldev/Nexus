import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


export type PaginatorProps = {
    onPageChange: (page: number) => void;
    currentPage?: number;
    pageSize: number;
    dataSize: number;
};
export default function Paginator({ onPageChange, currentPage, dataSize, pageSize }: PaginatorProps) {

    const [page, setPage] = useState(currentPage ?? 1);

    const [numberOfPages, setNumberOfPages] = useState(dataSize / pageSize);

    function Increment() {
        const newPage = page + 1;
        setPage(newPage);
        onPageChange(newPage);
    }
    function Decrement() {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            onPageChange(newPage);
        }
        
    }

    useEffect(() => {
        const newPage = currentPage ?? 1;
        const newNumberOfPages = Math.ceil(dataSize / pageSize);
        setPage(newPage);
        setNumberOfPages(newNumberOfPages);

    },[currentPage, dataSize, pageSize])


    return (
        <div className="w-fit flex items-center justify-center">
           <button disabled={page === 1} className="   hover:opacity-80 disabled:opacity-100 bg-cyan-500 disabled:bg-slate-400 p-3 rounded-l-xl text-[0.9rem] transition-all" onClick={Decrement} type="button">
                <FontAwesomeIcon color="white" icon={faAnglesLeft}/>
            </button>
            <p className="bg-slate-200 p-3 text-[0.9rem] transition-all">Pagina {page} </p>
            <button disabled={page >= numberOfPages} className="hover:opacity-80 disabled:opacity-100 bg-cyan-500 disabled:bg-slate-400 p-3 rounded-r-xl text-[0.9rem] transition-all" onClick={Increment} type="button">
                <FontAwesomeIcon color="white" icon={faAnglesRight}/>
            </button>
        </div>
    ); 
}