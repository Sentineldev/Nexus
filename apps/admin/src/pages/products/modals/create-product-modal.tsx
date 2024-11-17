import { Controller, useForm } from "react-hook-form";
import { SaveProductDto } from "../../../api/products/products.dto";
import ProductsApi from "../../../api/products/products.api";
import { useState } from "react";

export type CreateProductModalProps = {
    onUpdate: () => void;
    dialogId: string;
}
export default function CreateProductModal({ onUpdate, dialogId }: CreateProductModalProps) {



    const [loading, setLoading] = useState(false);
    const { handleSubmit, control,  formState:{ errors }, reset } = useForm<SaveProductDto>({
        defaultValues: {
            name: ""
        }
    });

    async function OnSubmitHandler(data: SaveProductDto) {

        const api = new ProductsApi();

        setLoading(true);
        const response = await api.Save(data);
        setLoading(false);
        if (response.status === 201) {
            reset();
            onUpdate();
        }
    }

    return (
        <dialog id={dialogId} className="rounded transition-all min-w-[450px]">
            <div className="flex flex-col gap-2 p-4">
                <div>
                    <h1 className="font-bold text-cyan-500 text-center text-[1.2rem]">Crear Producto</h1>
                </div>
                <form onSubmit={handleSubmit(OnSubmitHandler)} className="flex flex-col gap-8">
                    <div>
                        <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: {
                                value: true,
                                message: "Ingrese el nombre"
                            }
                        }}
                        render={(({ field }) => (
                            <label htmlFor="name" className="text-cyan-500 border-b flex flex-col">
                                <p>Nombre</p>
                                <input {...field} type="text" name="name" id="name" placeholder="" className="outline-none" />
                            </label>
                        ))}
                        />
                        { errors.name && <p className="text-red-600">{errors.name.message}</p> }
                    </div>
                    <div>
                        <button disabled={loading} className="bg-cyan-500 w-full p-2 rounded-lg text-white" type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}