import { SlashCommandBuilder, CommandInteraction } from "discord.js";

const rolemanagerCommand = {
	data: new SlashCommandBuilder()
		.setName("rolemanager")
		.setDescription("Sets up role adding reaction message"),
	async execute(interaction: CommandInteraction) {
		if (!interaction.channel)
			return interaction.reply("Could not find current channel information");

		const emojiIdentifiers: Array<string> = [
			"🔫 - Apex Legends",
			"💣 - Counter-Strike 2",
			"🪐 - Destiny 2",
			"🗡️ - Diablo",
			"🖥️ - Kodapa",
			"⌛ - Last Epoch",
			"🍄 - Maplestory",
			"🐉 - Path of Exile",
			"⚔️ - Runescape",
			"🐀 - World of Warcraft",
		];

		let baseMessage =
			"Reagera på detta meddelandet för att ge dig själv respektive roll, tar du bort reaktionen så tas rollen bort igen.";

		for (const emojiString of emojiIdentifiers) {
			baseMessage = baseMessage + "\n\n" + emojiString;
		}

		const roleMessage = await interaction.channel.send(baseMessage);
		for (const emoji of emojiIdentifiers) {
			try {
				await roleMessage.react(emoji.split(" ")[0]);
			} catch (error) {
				console.log(error);
			}
		}
	},
};

export default rolemanagerCommand;
