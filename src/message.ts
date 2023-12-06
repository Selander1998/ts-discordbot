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
						"Reagera på detta meddelandet för att ge dig själv respektive roll.\n\n:rat: - League of Legends\n\n:gun: - Apex Legends\n\n:dragon: - Path of Exile\n\n:ringed_planet: - Destiny\n\n:recycle: - Återställ dina roller."
					);
					const emojiIdentifiers = [
						"%F0%9F%90%80",
						"%F0%9F%94%AB",
						"%F0%9F%90%89",
						"%F0%9F%AA%90",
						"%F0%9F%9A%A3%E2%80%8D%E2%99%82%EF%B8%8F",
						"%E2%99%BB%EF%B8%8F",
					];
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
