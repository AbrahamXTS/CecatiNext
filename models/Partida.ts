import { db } from "../config/";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, } from "sequelize";

export interface Partida extends Model<InferAttributes<Partida>, InferCreationAttributes<Partida>> {
	id: string;
	partida: string;
}

export const PartidaModel = db.define<Partida>(
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
