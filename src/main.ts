import process from "node:process";
import { Client, GatewayIntentBits, Partials, ActivityType, Events } from "discord.js";
import { UserJoined } from "./on_join";
import { MessageListener } from "./message";
import { ReactionListener } from "./reaction";
import { SequelizeWrapper } from "./sequelize";
import dotenv from "dotenv";

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

client.once("ready", (botClient: Client<true>) => {
	if (!botClient) {
		console.error("Bot did not correctly load its client, exiting process");
		process.exit(0);
	}
	console.log(`Bot successfully loaded its client and is now logged in as: ${botClient.user.tag}`);

	botClient.user.setPresence({
		activities: [{ name: "all the naughties", type: ActivityType.Watching }],
		status: "online",
	});

	SequelizeWrapper.init() || console.error("LOG: SequelizeWrapper failed to initialize properly");

	UserJoined.init(client) || console.error("LOG: UserJoined failed to initialize properly");

	MessageListener.init(client) ||
		console.error("LOG: MessageListener failed to initialize properly");

	ReactionListener.init(client) ||
		console.error("LOG: ReactionListener failed to initialize properly");

	if (logging) console.log("LOG: All init functions ran successfully");
});

client.login(process.env.BOT_TOKEN as string);
