import type { NextApiRequest, NextApiResponse } from "next";

type Data = { _jwt: string } | { validations: [{ msg: string }] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "POST":
			return handleRegister(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleRegister = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email, password } = req.body;
}