'use client'

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
    currentUser: SafeUser | null;
}


const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh()
        }

    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                router.push('/cart')
                router.refresh()
                toast.success("Sesión iniciada correctamente")
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
        console.log(data);

    }

    if(currentUser) {
        return <p className="text-center">Entrando. Redireccionando</p>
    }


    return (<>
        <Heading
            title="Inicia sesión en Babysitter"
        />
        <Button icon={AiOutlineGoogle} outline label="Inicia sesión con Google" onClick={() => {
            signIn('google') 
        }
            } 
        />
        <hr className="bg-slate-300 w-full h-px" />
        <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="password"
        />
        <Button label = {isLoading? "Cargando...": "Iniciar Sesión"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">
            ¿No tienes una cuenta? <Link href="/register" className="underline">Registrate</Link>
        </p>
    </>);
}

export default LoginForm;