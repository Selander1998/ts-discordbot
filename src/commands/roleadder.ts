import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { Role } from "../dbmodels/role";
import { RoleManager } from "../rolemanager";
import i18n from "../i18n";

const roleadderCommand = {
	data: new SlashCommandBuilder()
		.setName("addroletodb")
		.setDescription(i18n.t("roleadder_command_description"))
		.addStringOption((roleId: SlashCommandStringOption) =>
			roleId
				.setName("roleid")
				.setDescription(i18n.t("roleadder_command_role_description"))
				.setRequired(true)
		)
		.addStringOption((buttonName: SlashCommandStringOption) =>
			buttonName
				.setName("buttonname")
				.setDescription(i18n.t("roleadder_command_buttonname_description"))
				.setRequired(true)
		)
		.addStringOption((buttonLabel: SlashCommandStringOption) =>
			buttonLabel
				.setName("buttonlabel")
				.setDescription(i18n.t("roleadder_command_buttonlabel_desription"))
				.setRequired(true)
		),
	async execute(interaction: CommandInteraction, roleManager: RoleManager) {
		// TODO: ^ THIS IS NOT OKAY, MAKE LESS RETARD
		const roleId = interaction.options.get("roleid");
		const buttonName = interaction.options.get("buttonname");
		const buttonLabel = interaction.options.get("buttonlabel");

		if (!roleId) return interaction.reply(i18n.t("roleadder_command_invalid_role_id"));
		if (!buttonName) return interaction.reply(i18n.t("roleadder_command_invalid_buttonname"));
		if (!buttonLabel) return interaction.reply(i18n.t("roleadder_command_invalid_buttonlabel"));

		const role = new Role();
		role.roleId = roleId.value as string;
		role.buttonName = buttonName.value as string;
		role.buttonLabel = buttonLabel.value as string;
		await role.save();

		await roleManager.reload();

		await interaction.reply(
			i18n.t("roleadder_command_interation_added", {
				role_id: roleId.value,
				button_name: buttonName.value,
				button_label: buttonLabel.value,
			})
		);
	},
};

export default roleadderCommand;
