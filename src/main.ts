import { Client, GatewayIntentBits, Partials, ActivityType } from "discord.js";

export const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
	partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.once("ready", (botClient: Client<true>) => {
	if (botClient) {
		botClient.user.setPresence({
			activities: [{ name: "alla busiga elever", type: ActivityType.Watching }],
			status: "online",
		});
		console.log(
			`Bot successfully loaded its client and is now logged in as: ${botClient.user.tag}`
		);
	} else {
		console.error("Bot did not correctly load its client");
	}
});

client.login("NzYzNzQxMTM5MjQ0OTQxMzMy.X38HXQ.kXrG7VDNP3zIEfYYSqXfI_XZVSA");
