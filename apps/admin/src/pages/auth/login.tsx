import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export type LoginFields = {
    username: string;
    password: string;
};

export default function Login() {



    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm<LoginFields>({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function OnSubmitHandler(data: LoginFields) {
        setLoading(true);
        setTimeout(() => {
            console.log(data.username, data.password);
            setLoading(false);
        }, 1000);
        
    }

    return (

        <div className="h-screen ">
            <div className="w-full h-full flex justify-center items-center">
                <div className="border p-8 h-[500px] rounded-xl flex flex-col gap-8">
                    <div>
                        {/* Header */}
                        <header className="font-sans text-[2rem] font-bold text-center">Login</header>
                    </div>
                    <div>
                        {/* Body */}
                        <form className="flex flex-col gap-12" onSubmit={handleSubmit(OnSubmitHandler)}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <Controller
                                    control={control}
                                    name="username"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Ingrese el nombre de usuario"
                                        }
                                    }}
                                    render={(({ field }) => (
                                        <label className="flex flex-col gap-1" htmlFor="">
                                            <p className="text-[1.2rem] font-sans">Nombre de usuario</p>
                                            <input { ...field } className="border text-[1.2rem] font-sans" type="text" name="" id="" />
                                        </label>
                                    ))}
                                    />
                                    { errors.username && <p className="text-red-500">{errors.username.message}</p> }
                                </div> 
                                <div>
                                    <Controller
                                    control={control}
                                    name="password"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Ingrese la clave"
                                        }
                                    }}
                                    render={(({ field }) => (
                                        <label className="flex flex-col gap-1" htmlFor="">
                                            <p className="text-[1.2rem] font-sans">Clave</p>
                                            <input { ...field } className="border text-[1.2rem] font-sans" type="text" name="" id="" />
                                        </label>
                                    ))}
                                    />
                                    { errors.password && <p className="text-red-500">{errors.password.message}</p> }
                                </div>
                            </div>
                            <div>
                                <button disabled={loading} type="submit" className="disabled:bg-slate-400 bg-cyan-500 text-white w-full p-2 rounded-lg">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 