import { Client } from "discord.js";
import profanity from "../json/profanity.json";

export class MessageListener {
	private constructor(client: Client) {
		client.on("messageCreate", async (message) => {
			for (const word of profanity.filter) {
				if (message.content.includes(word)) {
					message.reply("Apapap, dumma ord här... Stopp och belägg!");
				}
			}
		});
	}

	public static init(client: Client) {
		return new MessageListener(client);
	}
}
