import path from "path";
import Excel from "exceljs";
import { copyFile } from "fs/promises";
import { IProducto } from "../interfaces";

interface dataForEntrie {
	id: number;
	almacenista: string;
	director: string;
	elaborador: string;
	factura: string;
	fecha: string;
	procedencia: string;
	productos: IProducto[];
	tipo: string;
}

export const generateReportFromEntrie = async (entrada: dataForEntrie) => {
	try {
		await copyFile(
			path.resolve("public", "FormatoEntrada.xlsx"),
			path.resolve("public", "tempEntrada.xlsx")
		);
	} catch (error) {
		console.error(
			"Ocurrió un error mientras generabamos el nuevo reporte.",
			error
		);
	}

	const fecha = entrada.fecha.split("-");

	const workbook = new Excel.Workbook();
	await workbook.xlsx.readFile(path.resolve("public", "tempEntrada.xlsx"));

	const worksheet = workbook.getWorksheet("FORMATO");

	let row = worksheet.getRow(3);

	row.getCell(5).value = fecha[2];
	row.getCell(6).value = fecha[1];
	row.getCell(7).value = fecha[0];
	row.getCell(9).value = entrada.factura;
	row.commit();

	row = worksheet.getRow(4);

	row.getCell(9).value = entrada.tipo;
	row.commit();

	row = worksheet.getRow(6);

	row.getCell(6).value = entrada.id;
	row.getCell(8).value = entrada.procedencia;
	row.commit();

	row = worksheet.getRow(26);

	row.getCell(10).value = entrada.almacenista;
	row.getCell(6).value = entrada.director;
	row.getCell(2).value = entrada.elaborador;
	row.commit();

	let fila = 9;
	entrada.productos.forEach(
		({ cantidad, nombre, observacion, partida, precio, unidad }) => {
			row = worksheet.getRow(fila);
			row.getCell(1).value = partida.split(" - ")[0];
			row.getCell(2).value = nombre;
			row.getCell(6).value = cantidad;
			row.getCell(7).value = unidad;
			row.getCell(8).value = precio;
			row.getCell(10).value = observacion || "Ninguna";
			row.commit();
			fila += 1;
		}
	);

	workbook.xlsx.writeFile(path.resolve("public", "tempEntrada.xlsx"));
};

interface dataForOutput {
	id: number;
	almacenista: string;
	responsable: string;
	conformidad: string;
	fecha: string;
	productos: IProducto[];
}

export const generateReportFromOutput = async (salida: dataForOutput) => {
	try {
		await copyFile(
			path.resolve("public", "FormatoSalida.xlsx"),
			path.resolve("public", "tempSalida.xlsx")
		);
	} catch (error) {
		console.error(
			"Ocurrió un error mientras generabamos el nuevo reporte.",
			error
		);
	}

	const fecha = salida.fecha.split("-");

	const workbook = new Excel.Workbook();
	await workbook.xlsx.readFile(path.resolve("public", "tempSalida.xlsx"));

	const worksheet = workbook.getWorksheet("FORMATO");

	let row = worksheet.getRow(3);

	row.getCell(9).value = fecha[2];
	row.getCell(10).value = fecha[1];
	row.getCell(11).value = fecha[0];
	row.commit();

	row = worksheet.getRow(6);

	row.getCell(6).value = salida.id;
	row.commit();

	row = worksheet.getRow(26);

	row.getCell(2).value = salida.responsable;
	row.getCell(6).value = salida.almacenista;
	row.getCell(10).value = salida.conformidad;
	row.commit();

	let fila = 9;
	salida.productos.forEach(
		({ cantidad, nombre, observacion, partida, precio, unidad }) => {
			row = worksheet.getRow(fila);
			row.getCell(1).value = partida.split(" - ")[0];
			row.getCell(2).value = nombre;
			row.getCell(6).value = cantidad;
			row.getCell(7).value = unidad;
			row.getCell(8).value = precio;
			row.getCell(10).value = observacion || "Ninguna";
			row.commit();
			fila += 1;
		}
	);

	workbook.xlsx.writeFile(path.resolve("public", "tempSalida.xlsx"));
};
