import { Partida, PartidaModel } from "../../models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { msg: string } | Partida[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getAllPartidas(res);
	
		default:
			return res.status(400).json({ msg: "Método HTTP no válido." })
	}
}

const getAllPartidas = async (res: NextApiResponse<Data>) => {
	try {
        return res.json(await PartidaModel.findAll());
    } catch(error) {
        console.log(`¡Oh no! Ocurrió un error mientras obteniamos la información de la base de datos. ${error}`)
    }
}
