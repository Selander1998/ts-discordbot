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

			if (message.id === "1183042389061943347") {

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
					"%F0%9F%90%80": "1066085709066276926", // League of Legends
					"%F0%9F%94%AB": "859710965448441866", // Apex Legends
					"%F0%9F%90%89": "745395694919221323", // Path of Exile
					"%F0%9F%AA%90": "763726191789604894", // Destiny 2
					"%F0%9F%97%A1%EF%B8%8F": "1119690341050757130", // Diablo 4
					"%F0%9F%92%A3": "1098691782310629438", // Counter-Strike 2
					"%E2%8C%9B": "1083485479271403650", // Last Epoch
					"%F0%9F%96%A5%EF%B8%8F": "1066085269557739591", // Codeboy
					"%F0%9F%8D%84": "1182052608106569778" // Maplestory
				};
				const roleId = roles[emoji];
				const server = message.guild;

				if (!server) return console.log(`ERROR: Server is missing value: ${server}`);

				if (!roleId) return message.channel.send(`Det finns ingen roll bunden till emojin: ${reaction.emoji}`);

				const foundRole = server.roles.cache.find((r) => r.id === roleId);

				if (!foundRole) return message.channel.send(`Det existerar ingen roll för "${emoji}"`);

				if (member.roles.cache.has(foundRole.id)) {
					try {
						member.roles.remove(foundRole);
					} catch (error) {
						console.log(error)
					}
				} else {
					try {
						member.roles.add(foundRole);
					} catch (error) {
						console.log(error)
					}
				}
			}
		}
	}

	public static init(client: Client) {
		return new ReactionListener(client);
	}
}
