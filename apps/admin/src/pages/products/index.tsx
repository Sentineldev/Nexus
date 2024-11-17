import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paginator from "../../components/paginator/paginator";
import useProducts from "./hooks/useProducts";
import ProductsDisplay from "./products-display";
import { faPlus, faSearch, faUtensils } from "@fortawesome/free-solid-svg-icons";
import CreateProductModal from "./modals/create-product-modal";
import DialogUtils from "../../shared/dialog.utils";

export default function ProductsIndex() {

    const { data, setFetch, setFilter } = useProducts();


    function onPageChangeHandler(page: number) {
        setFilter((current) => ({...current, Page: page}));
        setFetch(true);
    }
    function onUpdateHandler() {
        setFetch(true);
    }
    function onSearch(value: string) {
        setFilter((current) => ({...current, page: 1,  Name: value }));
        setFetch(true);
    }
    return (
        <div className=" w-[800px] m-auto p-4">
            <CreateProductModal dialogId="create-product-modal-id" onUpdate={onUpdateHandler}/>
            { data &&
            <div className="flex flex-col gap-4">
                <div>
                    <div className=" font-sans text-white bg-cyan-500 border-none rounded-xl w-[280px] p-2 border flex items-center px-4">
                        <div className="flex-1">
                            <p className="text-[1.2rem]">{data.Meta.DataSize}</p>
                            <p>Productos</p>
                        </div>
                        <div>
                            <FontAwesomeIcon size="2x" icon={faUtensils}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <form className="flex-1 p-3 border border-cyan-500 rounded-xl">
                            <label htmlFor="search" className="text-cyan-500 flex items-center gap-2">
                                <FontAwesomeIcon  icon={faSearch}/>
                                <input onChange={(event) => onSearch((event.target as HTMLInputElement).value)} className="outline-none bg-transparent w-full" type="text" name="search" id="search"/>
                            </label>
                        </form>
                        <button onClick={() => DialogUtils.Open("create-product-modal-id")} type="button" className="p-3 w-fit border border-cyan-500 text-cyan-500 rounded-xl  flex items-center justify-center transition-all hover:bg-cyan-500 hover:text-white">
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <ProductsDisplay products={data.Data}/>
                    <div className="w-fit m-auto">
                        <Paginator dataSize={data.Meta.DataSize} pageSize={data.Meta.PageSize} currentPage={data.Meta.Page} onPageChange={onPageChangeHandler} />
                    </div>
                </div>
            </div>
            }
            
        </div>
    );
}