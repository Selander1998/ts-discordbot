import process from "node:process";
import { Client, GatewayIntentBits, Partials, ActivityType } from "discord.js";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { InviteManager } from "./invite";
import { UserJoined } from "./joinrole";
import { MessageListener } from "./message";
import { ReactionListener } from "./reaction";
import { CommandsLoader } from "./commands";
import { RoleManager } from "./rolemanager";
import dotenv from "dotenv";
import { Role } from "./dbmodels/role";
import "./i18n";
import i18n from "i18next";

export const logging = true;
export const envConfig = dotenv.config();
export const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
	partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

const sequelizeInstance = new Sequelize(
	process.env.DB_NAME as string,
	process.env.DB_USER as string,
	process.env.DB_PASSWORD as string,
	{
		host: process.env.DB_HOST as string,
		dialect: process.env.DB_DIALECT as Dialect,
		models: [Role],
	}
);

client.once("ready", async (botClient: Client<true>) => {
	const language = process.env.GUILD_LANGUAGE as string;
	await i18n.changeLanguage(language);
	console.log(i18n.t("language_loaded"));

	await sequelizeInstance.authenticate();
	await sequelizeInstance.sync();

	if (!botClient) {
		console.error("Bot did not correctly load its client, exiting process");
		process.exit(0);
	}
	console.log(`Bot successfully loaded its client and is now logged in as: ${botClient.user.tag}`);

	botClient.user.setPresence({
		activities: [{ name: "all the naughties", type: ActivityType.Watching }],
		status: "online",
	});

	const roleManager =
		new RoleManager(client) || console.error("LOG: RoleManager failed to initialize properly");

	new InviteManager(client) || console.error("LOG: InviteManager failed to initialize properly");

	CommandsLoader.init(client, roleManager) ||
		console.error("LOG: CommmandsLoader failed to initialize properly");

	UserJoined.init(client) || console.error("LOG: UserJoined failed to initialize properly");

	MessageListener.init(client) ||
		console.error("LOG: MessageListener failed to initialize properly");

	ReactionListener.init(client) ||
		console.error("LOG: ReactionListener failed to initialize properly");

	if (logging) console.log("LOG: All init functions ran successfully");
});

client.login(process.env.BOT_TOKEN as string);
