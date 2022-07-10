import type { NextApiRequest, NextApiResponse } from "next";

import { Partida, PartidaModel } from "../../models";

type Data = { msg: string } | { validations: [{ msg: string }] } | Partida[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getAllPartidas(res);
	
		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const getAllPartidas = async (res: NextApiResponse<Data>) => {
	try {
        return res.json(await PartidaModel.findAll());
    } catch(error) {
        console.log(`¡Oh no! Ocurrió un error mientras obteniamos la información de la base de datos. ${error}`)
    }
}
