import { Model, InferAttributes, InferCreationAttributes, } from "sequelize";

export interface IPartida extends Model<InferAttributes<IPartida>, InferCreationAttributes<IPartida>> {
	id: string;
	partida: string;
}