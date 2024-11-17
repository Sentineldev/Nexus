import { IncomingProduct } from "../../api/products/products.dto"
import ProductDisplay from "./product-display";

export type ProductsDisplayProps = {
    products: IncomingProduct[];
}
export default function ProductsDisplay({ products }: ProductsDisplayProps) {


    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 bg-cyan-500 rounded-t text-white px-4 py-3">
                <div>
                    <h1 className="text-[1.2rem] font-bold font-sans">Producto</h1>
                </div>
            </div>
            <div className="flex flex-col gap-6 px-4 py-6 bg-white border border-t-0 border-slate-200 h-[300px]  overflow-auto">
                { products.map((product) => <ProductDisplay key={`unique-product-display-${product.Id}`} product={product}/>) }
            </div>
        </div>
    );
}