import Link from "next/link";
import { AxiosError } from "axios";
import { GetStaticProps } from "next";
import { useForm } from "react-hook-form";
import { FormEvent, useState } from "react"

import { cecatiAPI } from "../api";
import { Partida } from '../models/Partida';
import { Header, FloatingButton } from "../components";

interface Props {
    partidas: Partida[];
}

export default function Entrada({ partidas }: Props) {

    const [rendersCounter, setRendersCounter] = useState([1]);
    
    const { register, handleSubmit } = useForm();

    const callComponent = () => {
        setRendersCounter([...rendersCounter, 1]);
    }

    // const handleProductsSubmit = ({productos}) => {

    //     fetch("https://cecatirestapi-production.up.railway.app/entrada", { method: "POST", body: JSON.stringify(data), headers: {"Content-Type":"application/json"}})
    //     .then((res) => res.blob())
    //     .then((blob) => { 
    //         alert("Registro exitoso.");
    //         setData(data);
    //         setRenderInsert(false); // Ocultamos para mostrar el resumen.
    //         setRenderResume(true);

    //         // Descargamos el archivo
    //         const a = document.createElement("a");
    //         a.href = window.URL.createObjectURL(blob);
    //         a.download = `Entrada - ${new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "2-digit" })}`;
    //         a.click();

    //     }).catch((error) => alert(error));
    // }

    return (
        <>
            <Header title="Entrada de articulos" />
            <h1>Hola</h1>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await cecatiAPI.get("/partidas");

    return {
        props: {
            partidas: data
        }
    }
}