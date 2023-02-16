import { Events } from "discord.js";
import { client } from "./main";

const debugging = true;

setImmediate(() => {
    if (debugging) {
        client.on(Events.MessageReactionAdd, async (reaction, user) => {
            console.log(`DEBUG: ${user.username} reacted with: ${reaction.emoji}`);
        })
    }
})