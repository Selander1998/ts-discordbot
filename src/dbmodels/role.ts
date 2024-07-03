import { Column, Table, DataType, PrimaryKey, Model } from "sequelize-typescript";

interface RoleModel {
	roleId: string;
	buttonName: string;
	buttonLabel: string;
	createdAt: number;
	updatedAt: number;
}

@Table({
	tableName: "roles",
	underscored: true,
})
export class Role extends Model<RoleModel> {
	@PrimaryKey
	@Column(DataType.STRING)
	public declare roleId: string;

	@Column(DataType.STRING)
	public declare buttonName: string;

	@Column(DataType.STRING)
	public declare buttonLabel: string;

	@Column(DataType.DATE)
	public declare createdAt: number;

	@Column(DataType.DATE)
	public declare updatedAt: number;
}
