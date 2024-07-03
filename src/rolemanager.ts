import { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, Message } from "discord.js";
import { Role } from "./dbmodels/role";

export class RoleManager {
	private readonly client: Client;
	private channelId: string;
	private activeMessage: Message<true> | null;

	public constructor(client: Client) {
		this.client = client;
		this.channelId = "1071790160271917096"; // TODO: fetch relevant channel
		this.activeMessage = null;

		this.setupMessage();
	}

	private async setupMessage() {
		const guild = this.client.guilds.cache.find(
			(guild) => guild.id === (process.env.BOT_GUILD_ID as string)
		);

		if (!guild) return "Fuck you säger Jabok";

		const channel = guild.channels.cache.find((channel) => channel.id === this.channelId);

		if (!channel) return "Juste, channel kan också vara null säger Jabok";

		if (channel.isTextBased()) {
			const rolesToCreate: ButtonBuilder[] = [];
			const roles = await this.getRolesFromDb();

			for (const role of roles) {
				rolesToCreate.push(
					new ButtonBuilder()
						.setCustomId(role.roleId)
						.setLabel(role.buttonLabel)
						.setStyle(ButtonStyle.Primary)
				);
			}

			if (rolesToCreate.length <= 0)
				return console.error("No roles found in database, aborting sending interactive message");

			this.activeMessage = await channel.send({
				content:
					"Klicka på knapparna nedan för att få respektive roll och med det tillgång till dess kanaler.",
				components: [new ActionRowBuilder<ButtonBuilder>().addComponents(...rolesToCreate)],
			});
		}
	}

	public async reload() {
		if (this.activeMessage) {
			await this.activeMessage.delete();
			this.setupMessage();
		}
	}

	private async getRolesFromDb() {
		return await Role.findAll();
	}

	public static init(client: Client) {
		return new RoleManager(client);
	}
}
