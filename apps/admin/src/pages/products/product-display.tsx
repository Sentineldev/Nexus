import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IncomingProduct } from "../../api/products/products.dto"
import { faEdit, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons";

export type ProductDisplayProps = {

    product: IncomingProduct;
}
export default function ProductDisplay({ product }: ProductDisplayProps) {


    return (
        <div className="grid grid-cols-2 gap-4 items-center justify-center">
            <div className="text-cyan-500 flex items-center gap-2">
                <FontAwesomeIcon  size="xl" icon={faUtensils}/>
                <h1 className="text-[1.2rem] font-sans text-wrap">{product.Name}</h1>
            </div>
            <div className="flex gap-6 justify-end">
                <button type="button" className="text-sky-600">
                    <FontAwesomeIcon size="xl" icon={faEdit}/>
                </button>
                <button type="button" className="text-red-600">
                    <FontAwesomeIcon size="xl" icon={faTrash}/>
                </button>
            </div>
        </div>
    );
}