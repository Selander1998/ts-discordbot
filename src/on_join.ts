import { Client, GuildMember } from "discord.js";

export class UserJoined {
	private constructor(client: Client) {
		console.log("Noticed UserJoined constructor");
		client.on("guildMemberAdd", (member: GuildMember) => {
			const guild = client.guilds.cache.get(member.guild.id);
			const roleId = "514826778057900041";

			if (!guild) return console.log(`Guild missing, got value of: ${guild}`);

			const roleToGive = guild.roles.cache.find((role) => role.id === roleId);

			if (roleToGive) {
				if (member.roles.cache.has(roleToGive.id)) {
					return console.log(
						`${member.displayName} already has the role ${roleToGive.name}, aborting addition`
					);
				}
				member.roles.add(roleToGive.id);
			} else {
				const role = guild.roles.cache.get(roleId);

				if (!role) return console.error("Role name unknown");

				console.log(`Could not add role ${role.name} to newly joined user: ${member.displayName}`);
			}
		});
	}

	public static init(client: Client) {
		return new UserJoined(client);
	}
}
