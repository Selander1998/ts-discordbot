import { Client, GuildMember } from "discord.js";
export class UserJoined {
	private constructor(client: Client) {
		client.on("guildMemberAdd", (member: GuildMember) => {
			const guild = client.guilds.cache.get(member.guild.id);
			const roleId = "514826778057900041";

			if (guild) {
				const roleToGive = guild.roles.cache.find((role) => role.id === roleId);

				if (roleToGive) {
					if (member.roles.cache.has(roleToGive.id)) {
						return console.log(
							`${member.displayName} already has the role ${roleToGive.name}, aborting addition`
						);
					}
					member.roles.add(roleToGive.id);
				} else {
					console.log(`Could not add role ${roleId} to newly joined user: ${member.displayName}`);
				}
			} else {
				console.log(`Guild missing, got value of: ${guild}`);
			}
		});
	}

	public static init(client: Client) {
		return new UserJoined(client);
	}
}
