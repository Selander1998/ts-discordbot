"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const main_1 = require("./main");
main_1.client.on(discord_js_1.Events.MessageReactionAdd, async (reaction, user) => {
    const guild = main_1.client.guilds.cache.get("314043078849593345");
    if (guild) {
        const message = reaction.message;
        const member = guild.members.cache.get(user.id);
        if (!member) {
            console.error(`Missing value for member: ${member}`);
            message.channel.send("Din användare kunde inte lokaliseras.");
            return;
        }
        console.log("DEBUG: message id: ", message.id);
        if (message.id === "1072571508540584008") {
            console.log(`identifier for emoji: ${reaction.emoji.identifier}`);
            if (reaction.partial) {
                try {
                    await reaction.fetch();
                }
                catch (error) {
                    console.log(`Something went wrong while fetching message: ${error}`);
                    return;
                }
            }
            const emoji = reaction.emoji.identifier;
            const roles = {
                "%F0%9F%90%80": "Toxic",
                "%F0%9F%94%AB": "Legend",
                "%F0%9F%90%89": "Fräsig PoE Gamer",
                "%F0%9F%AA%90": "Planetskuttare",
                "%F0%9F%9A%A3%E2%80%8D%E2%99%82%EF%B8%8F": "Flottbesättning",
                "%E2%99%BB%EF%B8%8F": "Recycle",
            };
            const roleName = roles[emoji];
            const server = message.guild;
            if (server) {
                if (roleName === "Recycle") {
                    message.channel.send(`Hej ${member.displayName}, dina roller kommer nu att återställas`);
                    message.channel.send(`Skojade, detta fungerar inte hehe`);
                    return;
                }
                else if (roleName) {
                    const roleToGive = server.roles.cache.find((r) => r.name === roleName);
                    if (roleToGive) {
                        if (member.roles.cache.has(roleToGive.id)) {
                            message.channel.send(`${member.displayName}, du har redan rollen ${roleName} kopplad till din profil`);
                        }
                        else {
                            member.roles.add(roleToGive);
                            console.log(`Added role: ${roleToGive.name} to ${member.displayName}`);
                        }
                    }
                    else {
                        message.channel.send(`Rollen ${roleName} existerar inte, Sellis har gjort något scuffed, skäll på honom`);
                    }
                }
                else {
                    message.channel.send(`Det finns ingen roll bunden till emojin: ${reaction.emoji}`);
                    console.error(`no matching emoji statement for: ${reaction.emoji}, aborting`);
                }
            }
            else {
                console.log(`ERROR: Server is missing value: ${server}`);
            }
        }
    }
});
