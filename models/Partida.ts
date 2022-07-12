import { db } from "../config/";
import { DataTypes } from "sequelize";
import { IPartida } from "../interfaces";

export const PartidaModel = db.define<IPartida>(
	"partidas",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		partida: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {},
	}
);
