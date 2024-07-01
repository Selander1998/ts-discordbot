import { SlashCommandBuilder, CommandInteraction } from "discord.js";

const pingCommand = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Returns client websocket ping"),
	async execute(interaction: CommandInteraction) {
		const sent = await interaction.reply({
			content: "Pinging WebSocket...",
			fetchReply: true,
		});
		const latency = sent.createdTimestamp - interaction.createdTimestamp;
		const websocketPing = interaction.client.ws.ping;

		if (websocketPing === -1)
			await interaction.editReply(
				`Latency is ${latency}ms.\nWebSocket ping could not be fetched properly.`
			);
		else {
			await interaction.editReply(
				`Latency is ${latency}ms.\nWebSocket ping is ${websocketPing}ms.`
			);
		}
	},
};

export default pingCommand;
