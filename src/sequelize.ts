import { Sequelize, DataTypes } from "sequelize";
import { envConfig } from "./main";

const queryTypes = require("sequelize"); // Does not work with import("sequelize"), don´t know why. Common JS is just to good i guess?

export class SequelizeWrapper {
	private static instance: Sequelize;

	private constructor() {
		console.log("Noticed SequelizeWrapper constructor");

		console.log(envConfig.error);
		console.log(envConfig.parsed);

		SequelizeWrapper.instance = new Sequelize(
			process.env.DB_NAME as string,
			process.env.DB_USER as string,
			process.env.DB_PASSWORD as string,
			{
				host: process.env.DB_NAME as string,
				dialect: process.env.DB_NAME as any,
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

		if (process.env.DB_CREATE) {
			console.log("Setting up database tables...");
			SequelizeWrapper.generateTables();
		}
	}

	public static generateTables() {
		this.instance.define(
			"roles",
			{
				roleId: {
					type: DataTypes.STRING,
					allowNull: false,
					primaryKey: true,
				},
				emojiId: {
					type: DataTypes.STRING,
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
			type: queryTypes.SELECT,
		});
		return rolesData;
	}

	public static async addRole(roleId: string, emojiId: string) {
		this.instance.query("INSERT INTO `roles` (roleId, emojiId) VALUES (?, ?)", {
			replacements: [roleId, emojiId],
			type: queryTypes.INSERT,
		});
	}

	public static init() {
		return new SequelizeWrapper();
	}
}
