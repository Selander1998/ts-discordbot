import { Client } from "discord.js";

export class MessageListener {
	private constructor(client: Client) {
		client.on("messageCreate", async (message) => {
			const prefix = "!";
			if (!message.content.startsWith(prefix) || message.author.bot) return;
			const args = message.content.slice(prefix.length).split(/ +/);
			if (args[0]) {
				const command = args[0];

				if (command === "setuproles") {
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

					const roleMessage = await message.channel.send(baseMessage);

					for (const emoji of emojiIdentifiers) {
						try {
							await roleMessage.react(emoji.split(" ")[0]);
						} catch (error) {
							console.log(error);
						}
					}

					message.delete();
				}

				if (command === "ping") {
					message.channel.send(`Websocket heartbeat: ${client.ws.ping}ms.`);
				}
			}
		});
	}

	public static init(client: Client) {
		return new MessageListener(client);
	}
}
