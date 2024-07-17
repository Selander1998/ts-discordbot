# Typescipt Discordbot

## Overview

Discord Bot built with TypeScript. It allows users to add roles to themselves via interactive messages and stores roles data in a database. Additionally, the bot sends a welcome message with a Discord invite link upon startup. It also provides commands to manage roles dynamically without needing a bot restart.

## Features

- **Interactive Role Assignment:** Users can add or remove roles to themselves by interacting with a bot-generated message.
- **Automatic Invite Link:** Sends a Discord invite link to a specified channel upon startup.
- **Database Integration:** Saves roles data in a database for persistent role management.
- **Runtime Commands:** Offers commands to manage roles dynamically without requiring a bot restart.
- **Server Join Role Assignment:** Adds a role automatically on a users server join.
- **Profanity Filter:** Gives users a warning when using a blacklisted word

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- npm
- Discord account and a server where you have permission to add a bot
- Discord Bot Token
- Invite link to your Discord server
- Database

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Selander1998/keff-discbot.git
   cd keff-discbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Modify the `.env` file in the root directory and add your configuration:**

   ```env
   BOT_CLIENT_ID=your-bot-client-id
   BOT_GUILD_ID=your-bot-guild-id
   BOT_TOKEN=your-bot-token-id

   DB_NAME=your-database-name
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_HOST=your-database-ip
   DB_DIALECT=your-database-dialect

   GUILD_INVITE_LINK=your-discord-invite-link
   GUILD_INVITE_CHANNEL=your-discord-invite-link-autopost-channel
   GUILD_INTERACTIVE_MESSAGE_CHANNEL=your-discord-channel-autopost-interactive-message
   ```

## Usage

1. **Run the bot:**

   ```bash
   npm run start
   ```

2. **Interactive Role Assignment:**

   - The bot will generate a message with interactive buttons to add roles.
   - Users can click these buttons to assign roles to themselves.

3. **Automatic Invite Link:**

   - Upon startup, the bot sends a message with the invite link to the specified channel.

4. **Runtime Commands:**
   - The bot supports commands to add roles without restarting.

## Commands

### `/addrole <roleId> <buttonName> <buttonLabel>`

Adds a new role to the role managing interactive message.

```plaintext
/addrole 123456789012345678 pathofexile Path of Exile
```

### `/ping`

Displays the latency and ping for the websocket.

## Contributing

Contributions are always welcome! Please feel free to submit a Pull Request or open an Issue.

## License

Distributed under the GNU General Public License v3.0. See `LICENSE` for more information.

---

This README hopefully provides a comprehensive guide to setting up and running the Discord Bot. If you have any questions or need further assistance, feel free to reach out via Issues on the repository.
