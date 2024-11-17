import { useEffect, useState } from "react"
import { IncomingProduct, ProductsPageFilter } from "../../../api/products/products.dto"
import ProductsApi from "../../../api/products/products.api";
import { PageData } from "../../../api/common/page.dto";

export default function useProducts() {


    const [data, setData] = useState<PageData<IncomingProduct>>();
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState(true);

    const [filter, setFilter] = useState<ProductsPageFilter>({
        Name: "",
        Page: 1,
        PageSize: 5,
    });

    useEffect(() => {


        const load = async () => {


            const api = new ProductsApi();
            setLoading(true);
            const response = await api.GetPage(filter);
            setLoading(false);
            setFetch(false);
            if (response.status === 200) {
                setData(response.data)
            }

        };
        if (fetch) {
            load();
        }
    },[fetch, filter])

    return { data, loading, setFetch, setFilter }
}