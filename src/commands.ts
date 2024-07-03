import { Collection, REST, Routes, Events, Interaction, Client, Role } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { RoleManager } from "./rolemanager";
import { Role as dbRole } from "./dbmodels/role";

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

	private constructor(client: Client, roleManager: RoleManager) {
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

		CommandsLoader.createInteractions(roleManager);
	}

	public static async createInteractions(roleManager: RoleManager) {
		CommandsLoader.client.on(Events.InteractionCreate, async (interaction: Interaction) => {
			if (interaction.isCommand()) {
				const command = CommandsLoader.client.commands.get(interaction.commandName);
				if (!command) return;
				try {
					await command.execute(interaction, roleManager);
				} catch (error) {
					console.error(error);
					await interaction.reply({
						content: "There was an error while executing this command!",
						ephemeral: true,
					});
				}
			}

			if (interaction.isButton()) {
				const guild = CommandsLoader.client.guilds.cache.get(process.env.BOT_GUILD_ID as string);
				if (guild) {
					const member = guild.members.cache.get(interaction.user.id);
					if (!member) return console.error(`Missing value for member: ${member}`);

					let roleId = "";

					const roles = await this.getRolesFromDb();
					for (const role of roles) {
						if (interaction.customId === role.buttonName) {
							roleId = role.roleId;
							break;
						}
					}

					const foundRole = guild.roles.cache.find((r: Role) => r.id === roleId);

					if (!foundRole)
						return console.error(`Unassigned roleId for role addition/removal: ${roleId}`);

					const memberHasRole = member.roles.cache.has(foundRole.id);

					try {
						(memberHasRole && member.roles.remove(foundRole)) || member.roles.add(foundRole);
						const message =
							(memberHasRole && `Du tog bort rollen: ${foundRole.name}`) ||
							`Du fick rollen: ${foundRole.name}`;
						await interaction.reply({
							content: message,
							ephemeral: true,
						});
					} catch (error) {
						console.log(error);
					}

					//if (interaction.customId === "apexButton") {
					//	roleId = "859710965448441866";
					//} else if (interaction.customId === "counterstrikeButton") {
					//	roleId = "1098691782310629438";
					//} else if (interaction.customId === "destinyButton") {
					//	roleId = "763726191789604894";
					//} else if (interaction.customId === "codezButton") {
					//	roleId = "1066085269557739591";
					//} else if (interaction.customId === "diabloButton") {
					//	roleId = "1119690341050757130";
					//} else if (interaction.customId === "lastepochButton") {
					//	roleId = "1083485479271403650";
					//} else if (interaction.customId === "maplestoryButton") {
					//	roleId = "1182052608106569778";
					//} else if (interaction.customId === "pathofexileButton") {
					//	roleId = "745395694919221323";
					//} else if (interaction.customId === "worldofwarcraftButton") {
					//	roleId = "1066085709066276926";
					//}
				}
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

	private static async getRolesFromDb() {
		return await dbRole.findAll();
	}

	public static init(client: Client, roleManager: RoleManager) {
		return new CommandsLoader(client, roleManager);
	}
}
