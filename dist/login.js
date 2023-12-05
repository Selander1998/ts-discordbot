"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const main_1 = require("./main");
main_1.client.once("ready", (botClient) => {
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
main_1.client.login("NzYzNzQxMTM5MjQ0OTQxMzMy.X38HXQ.kXrG7VDNP3zIEfYYSqXfI_XZVSA");
