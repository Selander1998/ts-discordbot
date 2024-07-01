import { Collection, REST, Routes, Events, Interaction, Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";

interface ICommand {
	data: {
		name: string;
		description: string;
		options: [];
	};
	execute: Function;
}

const commands: ICommand[] = [];

export class CommandsLoader {
	private static client: Client;

	private constructor(client: Client) {
		console.log("Noticed CommandsLoader constructor");

		CommandsLoader.client = client;
		CommandsLoader.client.commands = new Collection();

		const commandsPath = path.join(__dirname, "commands");
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			console.log(`Reading command file: ${file}`);

			const command = require(path.join(commandsPath, file)).default;

			if (command && command.data && command.data.name) {
				console.log(`Loaded command: ${command.data.name}`);

				commands.push(command.data.toJSON());

				CommandsLoader.client.commands.set(command.data.name, command);
			} else {
				console.error(`Failed to load command at: ${path.join(commandsPath, file)}`);
			}
		}

		CommandsLoader.createInteractions();
	}

	public static async createInteractions() {
		CommandsLoader.client.on(Events.InteractionCreate, async (interaction: Interaction) => {
			if (!interaction.isCommand()) return;

			const command = CommandsLoader.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		});

		CommandsLoader.refreshCommands();
	}

	private static refreshCommands() {
		const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN as string);

		(async () => {
			try {
				console.log("Started refreshing application (/) commands.");

				await rest.put(
					Routes.applicationGuildCommands(
						process.env.BOT_CLIENT_ID as string,
						process.env.BOT_GUILD_ID as string
					),
					{ body: commands }
				);

				console.log("Successfully reloaded application (/) commands.");
			} catch (error) {
				console.error(error);
			}
		})();
	}

	public static init(client: Client) {
		return new CommandsLoader(client);
	}
}
