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
					const roleMessage = message.channel.send(
						"Reagera på detta meddelandet för att ge dig själv respektive roll.\n\n🐀 - League of Legends\n\n🔫 - Apex Legends\n\n🐉 - Path of Exile\n\n🪐 - Destiny\n\n♻ - Återställ dina roller."
					);
					const emojiIdentifiers = ["🐀", "🔫", "🐉", "🪐", "♻"];
					for (const emoji of emojiIdentifiers) {
						(await roleMessage).react(emoji);
						console.log(emoji);
					}
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
