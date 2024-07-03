import { Client } from "discord.js";

export class InviteManager {
	private readonly client: Client;
	private channelId: string;

	public constructor(client: Client) {
		this.client = client;
		this.channelId = process.env.GUILD_INTERACTIVE_MESSAGE_CHANNEL as string;

		this.sendMessage();
	}

	private async sendMessage() {
		const guild = this.client.guilds.cache.find(
			(guild) => guild.id === (process.env.BOT_GUILD_ID as string)
		);

		if (!guild) return console.error("Could not find guild ID");

		const channel = guild.channels.cache.find((channel) => channel.id === this.channelId);

		if (!channel) return console.error("Could not find channel ID");

		if (channel.isTextBased()) {
			channel.send(`Invite-länk för discorden:\n\n${process.env.GUILD_INVITE_LINK}`);
		}
	}

	public static init(client: Client) {
		return new InviteManager(client);
	}
}
