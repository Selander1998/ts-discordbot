import { Client } from "discord.js";
import { Sequelize, DataTypes, Dialect, QueryTypes } from "sequelize";

export class SequelizeWrapper {
	private static instance: Sequelize;

	private constructor(client: Client) {
		console.log("Noticed SequelizeWrapper constructor");

		SequelizeWrapper.instance = new Sequelize(
			process.env.DB_NAME as string,
			process.env.DB_USER as string,
			process.env.DB_PASSWORD as string,
			{
				host: process.env.DB_HOST as string,
				dialect: process.env.DB_DIALECT as Dialect,
			}
		);

		SequelizeWrapper.instance
			.authenticate()
			.then(() => {
				console.log("Database connection has been established successfully.");
			})
			.catch((error) => {
				console.error("Unable to connect to the database:", error);
			});

		if ((process.env.DB_CREATE as string) == "true") {
			console.log(
				".env indicates that you wish to set up database tables\nSetting up database tables..."
			);
			SequelizeWrapper.generateTables();
		}
	}

	public static generateTables() {
		this.instance.define(
			"roles",
			{
				role_id: {
					type: DataTypes.STRING,
					allowNull: false,
					primaryKey: true,
				},
				emoji_id: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				updated_at: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				created_at: {
					type: DataTypes.DATE,
					allowNull: false,
				},
			},
			{}
		);

		this.instance.sync().then(() => {
			console.log("Database tables have been generated");
		});
	}

	public static async fetchRoles() {
		const rolesData = await this.instance.query("SELECT * FROM roles", {
			type: QueryTypes.SELECT,
		});
		return rolesData;
	}

	public static async addRole(roleId: string, emojiId: string) {
		this.instance.query(
			"INSERT INTO `roles` (role_id, emoji_id, created_at, updated_at) VALUES (?, ?)",
			{
				replacements: [roleId, emojiId],
				type: QueryTypes.INSERT,
			}
		);
	}

	public static init(client: Client) {
		return new SequelizeWrapper(client);
	}
}
