import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { Role } from "../dbmodels/role";
import { RoleManager } from "../rolemanager";

const roleadderCommand = {
	data: new SlashCommandBuilder()
		.setName("addroletodb")
		.setDescription("Adds a role to the interactive message")
		.addStringOption((roleId: SlashCommandStringOption) =>
			roleId
				.setName("roleid")
				.setDescription("The ID of the role you want to create the interaction for")
				.setRequired(true)
		)
		.addStringOption((buttonName: SlashCommandStringOption) =>
			buttonName
				.setName("buttonname")
				.setDescription(
					"The name identifier for the button, needs to be one word! example: pathofexile"
				)
				.setRequired(true)
		)
		.addStringOption((buttonLabel: SlashCommandStringOption) =>
			buttonLabel
				.setName("buttonlabel")
				.setDescription("The label for the button. example: Path of Exile")
				.setRequired(true)
		),
	async execute(interaction: CommandInteraction, roleManager: RoleManager) {
		// TODO: ^ THIS IS NOT OKAY, MAKE LESS RETARD
		const roleId = interaction.options.get("roleid");
		const buttonName = interaction.options.get("buttonname");
		const buttonLabel = interaction.options.get("buttonlabel");

		if (!roleId) return interaction.reply("You did not enter a valid role ID");
		if (!buttonName) return interaction.reply("You did not enter a valid button name");
		if (!buttonLabel) return interaction.reply("You did not enter a valid button label");

		const role = new Role();
		role.roleId = roleId.value as string;
		role.buttonName = buttonName.value as string;
		role.buttonLabel = buttonLabel.value as string;
		await role.save();

		await roleManager.reload();

		await interaction.reply(
			`Interaction added for role (${roleId.value}) with button name (${buttonName.value}) and button label (${buttonLabel.value})`
		);
	},
};

export default roleadderCommand;
