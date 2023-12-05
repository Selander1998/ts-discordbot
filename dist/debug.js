"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const main_1 = require("./main");
const debugging = true;
setImmediate(() => {
    if (debugging) {
        main_1.client.on(discord_js_1.Events.MessageReactionAdd, async (reaction, user) => {
            console.log(`DEBUG: ${user.username} reacted with: ${reaction.emoji}`);
        });
    }
});
