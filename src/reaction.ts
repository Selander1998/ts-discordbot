import {
	Client,
	Events,
	MessageReaction,
	PartialMessageReaction,
	PartialUser,
	User,
} from "discord.js";
import { logging } from "./main";

export class ReactionListener {
	private constructor(client: Client) {
		client.on(Events.MessageReactionAdd, async (reaction, user) => {
			this.handleReaction(client, reaction, user, true);
		});

		client.on(Events.MessageReactionRemove, async (reaction, user) => {
			this.handleReaction(client, reaction, user, false);
		});
	}

	async handleReaction(
		client: Client,
		reaction: PartialMessageReaction | MessageReaction,
		user: PartialUser | User,
		state: boolean
	) {
		const guild = client.guilds.cache.get(process.env.BOT_GUILD_ID as string);

		if (guild) {
			const message = reaction.message;
			if (!message) return console.error(`Missing value for message: $(message)`);

			const stateString = (state && "added") || "removed";
			if (logging)
				console.log(`LOG: ${user.username} ${stateString} reaction emoji: ${reaction.emoji}`);
		}
	}

	public static init(client: Client) {
		return new ReactionListener(client);
	}
}
