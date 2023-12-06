import { Client, GuildMember } from "discord.js";
export class UserJoined {
	private constructor(client: Client) {
		client.on("guildMemberAdd", (member: GuildMember) => {
			const guild = client.guilds.cache.get(member.guild.id);
			const roleName = "1-åring";

			if (guild) {
				const roleToGive = guild.roles.cache.find((role) => role.name === roleName);

				if (roleToGive) {
					if (member.roles.cache.has(roleToGive.id)) {
						return console.log(
							`${member.displayName} already has the role ${roleName}, aborting addition`
						);
					}
					member.roles.add(roleToGive.id);
				} else {
					console.log(`Could not add role ${roleName} to newly joined user: ${member.displayName}`);
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
