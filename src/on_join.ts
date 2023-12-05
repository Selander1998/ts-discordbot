import { client } from "./main";

client.on("guildMemberAdd", (member) => {
	const roleName = "1-åring";

	const guild = client.guilds.cache.get("314043078849593345");

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
