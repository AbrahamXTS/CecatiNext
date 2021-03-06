import Link from "next/link";

import { ISalida } from "../interfaces";

interface Props {
	data: ISalida;
}

export function FormResumenSalida({ data }: Props) {
	return (
		<>
			<header className="py-8">
				<h1 className="text-center uppercase text-[27px] font-bold">
					Resumen de salida
				</h1>
			</header>

			<div className="drop-shadow-xl mx-auto rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 py-5 px-8 mb-8">
				<ul>
					<li className="flex items-center">
						<p className="uppercase font-bold my-[13px] mr-2 text-lg"> Almacenista: </p>
						<p className="text-lg">{data.almacenista}</p>
					</li>
					<li className="flex items-center">
						<p className="uppercase font-bold my-[13px] mr-2 text-lg"> Responsable del área solicitante: </p>
						<p className="text-lg">{data.responsable}</p>
					</li>
					<li className="flex items-center">
						<p className="uppercase font-bold my-[13px] mr-2 text-lg"> Firma de conformidad: </p>
						<p className="text-lg">{data.conformidad}</p>
					</li>
					<li className="flex items-center">
						<p className="uppercase font-bold my-[13px] mr-2 text-lg"> Total de articulos salidos: </p>
						<p className="text-lg">{data.productos.length}</p>
					</li>
				</ul>
				<div className="md:flex mx-auto md:justify-end mt-5 md:mt-[10px]">
					<Link href="/tempSalida.xlsx" >
						<a className="bg-azul w-full md:w-[80px] h-[50px] rounded-[3px]">
							<svg className="mx-auto" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /> <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /> <rect x="7" y="13" width="10" height="8" rx="2" /> </svg>
						</a>
					</Link>
				</div>
			</div>

			{data.productos.map(({ cantidad, clave, nombre, partida, precio, unidad, observacion }, index ) => (
					<div key={`Producto ${index}`} className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-8">
						<ul>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Nombre del articulo: </p>
								<p className="text-lg">{nombre}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Numero de partida: </p>
								<p className="text-lg">{partida}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Clave del articulo: </p>
								<p className="text-lg">{clave}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Tipo de unidad: </p>
								<p className="text-lg">{unidad}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Cantidad de artículos: </p>
								<p className="text-lg">{cantidad}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Precio unitario: </p>
								<p className="text-lg">{`$${precio.toFixed(2)}`}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Precio total: </p>
								<p className="text-lg">{`$${(cantidad * precio).toFixed(2)}`}</p>
							</li>
							<li className="flex items-center">
								<p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Observaciones: </p>
								<p className="text-lg">
									{observacion || "Ninguna"}
								</p>
							</li>
						</ul>
					</div>
				)
			)}
		</>
	);
}
