import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import i18n from "../i18n";

const pingCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription(i18n.t("ping_command_description")),
	async execute(interaction: CommandInteraction) {
		const sent = await interaction.reply({
			content: i18n.t("pinging_websocket"),
			fetchReply: true,
		});
		const latency = sent.createdTimestamp - interaction.createdTimestamp;
		const websocketPing = interaction.client.ws.ping;

		if (websocketPing === -1)
			await interaction.editReply(i18n.t("websocket_response_invalid", { latency: latency }));
		else {
			await interaction.editReply(
				i18n.t("websocket_response_valid", { latency: latency, websocket_ping: websocketPing })
			);
		}
	},
};

export default pingCommand;
