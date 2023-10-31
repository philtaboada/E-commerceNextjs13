'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { SafeUser } from "@/types";

interface RegisterFormProps {
    currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
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
        axios.post("/api/register", data).then(() => {
            toast.success("Usuario registrado correctamente");

            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    router.push('/cart')
                    router.refresh()
                    toast.success("Sesión iniciada correctamente")
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
        }).catch(() => toast.error("Error al registrar usuario")).finally(() => setIsLoading(false))

    }

    if(currentUser) {
        return <p className="text-center">Entrando. Redireccionando</p>
    }

    return (<>
        <Heading
            title="Registrate en Babysitter"
        />
        <Button icon={AiOutlineGoogle} outline label="Registrarse con Google" onClick={() => {
            signIn('google')
         }} />
        <hr className="bg-slate-300 w-full h-px" />
        <Input
            id="name"
            label="Nombre"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
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
        <Button label={isLoading ? "Cargando..." : "Registrarse"} onClick={handleSubmit(onSubmit)} />
        <p className="text-sm">
            ¿Ya tienes cuenta? <Link href="/login" className="underline">Inicia sesión</Link>
        </p>
    </>);
}

export default RegisterForm;