import { Client } from "discord.js";
import profanity from "../json/profanity.json";
import { Delay } from "./delay";

export class MessageListener {
	private constructor(client: Client) {
		client.on("messageCreate", async (message) => {
			for (const word of profanity.filter) {
				if (message.content.includes(word)) {
					message.reply("Apapap, dumma ord här... Stopp och belägg!");
					await Delay(5000);
					try {
						await message.delete();
					} catch (error: unknown) {
						console.error(error);
					}
				}
			}
		});
	}

	public static init(client: Client) {
		return new MessageListener(client);
	}
}
