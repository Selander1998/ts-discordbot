import process from "node:process";
import { Client, GatewayIntentBits, Partials, ActivityType, Events } from "discord.js";
import { UserJoined } from "./on_join";
import { MessageListener } from "./message";
import { ReactionListener } from "./reaction";
import { request } from "node:http";

const debugging = true;

export const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
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
		console.error("Bot did not correctly load its client");
		process.exit(0);
	}

	botClient.user.setPresence({
		activities: [{ name: "alla busiga elever", type: ActivityType.Watching }],
		status: "online",
	});
	console.log(`Bot successfully loaded its client and is now logged in as: ${botClient.user.tag}`);
	setImmediate(() => {
		if (debugging) {
			client.on(Events.MessageReactionAdd, async (reaction, user) => {
				console.log(`DEBUG: ${user.username} reacted with: ${reaction.emoji}`);
			});
		}
	});

	UserJoined.init(client);
	MessageListener.init(client);
	ReactionListener.init(client);
	console.log("Ran init funcs");
});

client.login("NzYzNzQxMTM5MjQ0OTQxMzMy.X38HXQ.kXrG7VDNP3zIEfYYSqXfI_XZVSA");