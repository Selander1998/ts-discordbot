import {
	Client,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	Message,
	MessageActionRowComponentBuilder,
} from "discord.js";
import { Role } from "./dbmodels/role";

export class RoleManager {
	private readonly client: Client;
	private channelId: string;
	private activeMessage: Message<true> | null;

	public constructor(client: Client) {
		this.client = client;
		this.channelId = process.env.GUILD_INVITE_CHANNEL as string;
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
			let rolesToCreate: ButtonBuilder[] = [];
			const actionRows: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];
			const roles = await this.getRolesFromDb();

			let count = 0;
			for (const role of roles) {
				rolesToCreate.push(
					new ButtonBuilder()
						.setCustomId(role.roleId)
						.setLabel(role.buttonLabel)
						.setStyle(ButtonStyle.Primary)
				);
				count++;
				if (count >= 5) {
					actionRows.push(new ActionRowBuilder<ButtonBuilder>().addComponents(...rolesToCreate));
					count = 0;
					rolesToCreate.length = 0;
				}
			}

			// If there´s still roles left behind
			if (rolesToCreate.length > 0) {
				actionRows.push(new ActionRowBuilder<ButtonBuilder>().addComponents(...rolesToCreate));
			}

			if (rolesToCreate.length <= 0 && actionRows.length <= 0)
				return console.error("No roles found in database, aborting sending interactive message");

			this.activeMessage = await channel.send({
				content:
					"Klicka på knapparna nedan för att få respektive roll och med det tillgång till dess kanaler.",
				components: [...actionRows],
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
