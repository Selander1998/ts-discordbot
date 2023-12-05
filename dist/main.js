"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction],
});
exports.client.once("ready", (botClient) => {
    if (botClient) {
        botClient.user.setPresence({
            activities: [{ name: "alla busiga elever", type: discord_js_1.ActivityType.Watching }],
            status: "online",
        });
        console.log(`Bot successfully loaded its client and is now logged in as: ${botClient.user.tag}`);
    }
    else {
        console.error("Bot did not correctly load its client");
    }
});
exports.client.login("NzYzNzQxMTM5MjQ0OTQxMzMy.X38HXQ.kXrG7VDNP3zIEfYYSqXfI_XZVSA");
