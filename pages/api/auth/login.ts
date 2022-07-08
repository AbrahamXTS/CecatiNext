import { generateJWT } from "../../../utils";
import { UsuarioModel } from "../../../models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { _jwt: string } | { validations: [{ msg: string }] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "POST":
			return handleLogin(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleLogin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email, password } = req.body;

	try {
		const user = await UsuarioModel.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({
				validations: [{ msg: "El correo registrado no pertenece a ningún usuario." }],
			});
		}

		if (!user.confirmed) {
			return res.status(401).json({
				validations: [{ msg: "Esta cuenta no ha sido confirmada. Por favor finalice el proceso de registro." }],
			});
		}

		if (!user.checkPassword(password)) {
			return res.status(401).json({
				validations: [{ msg: "Acceso incorrecto, por favor verifique sus datos." }],
			});
		}

		return res.status(201).json({ _jwt: generateJWT({ id: user.id! }) });
	} catch (error) {
		console.log(`¡Oh no! Ocurrió un error mientras obteniamos la información de la base de datos. ${error}`);
	}
};
