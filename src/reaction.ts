import { Client, Events, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";

export class ReactionListener {
	
	private constructor(client: Client) {

		client.on(Events.MessageReactionAdd, async (reaction, user) => {
			this.handleReaction(client, reaction, user, true)
		})

		client.on(Events.MessageReactionRemove, async (reaction, user) => {
			this.handleReaction(client, reaction, user, false)
		});
	}

	async handleReaction(client: Client, reaction: PartialMessageReaction | MessageReaction, user: PartialUser | User, state: boolean) {
		const guild = client.guilds.cache.get("314043078849593345");

		if (guild) {
			const message = reaction.message;
			const member = guild.members.cache.get(user.id);
			if (!member) return console.error(`Missing value for member: ${member}`);

			if (message.id === "1182856863440707724") {
				console.log(`identifier for emoji: ${reaction.emoji.identifier}`);

				if (reaction.partial) {
					try {
						await reaction.fetch();
					} catch (error) {
						console.log(`Something went wrong while fetching message: ${error}`);
						return;
					}
				}

				const emoji = reaction.emoji.identifier;
				const roles: { [key: string]: string } = {
					"%F0%9F%90%80": "Toxic",
					"%F0%9F%94%AB": "Legend",
					"%F0%9F%90%89": "Fräsig PoE Gamer",
					"%F0%9F%AA%90": "Planetskuttare",
				};
				const roleName = roles[emoji];
				const server = message.guild;

				if (!server) return console.log(`ERROR: Server is missing value: ${server}`);

				if (!roleName) return message.channel.send(`Det finns ingen roll bunden till emojin: ${reaction.emoji}`);

				const foundRole = server.roles.cache.find((r) => r.name === roleName);

				if (!foundRole) return message.channel.send(`Det existerar ingen roll för "${emoji}"`);

				if (member.roles.cache.has(foundRole.id)) {
					member.roles.remove(foundRole);
				} else {
					member.roles.add(foundRole);
				}
			}
		}
	}

	public static init(client: Client) {
		return new ReactionListener(client);
	}
}
