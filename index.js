import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = join(import.meta.dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

(async () => {
  for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = await import(`file://${filePath}`);
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }

  const eventsPath = join(import.meta.dirname, 'events');
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = await import(`file://${filePath}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();


client.login(process.env.TOKEN);