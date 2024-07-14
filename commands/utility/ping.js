import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replys with Pong!')
  .addUserOption((option) => option.setName('user').setDescription('Shall I greet a user?'),
  );
export async function execute(interaction) {
  const user = interaction.options.getUser('user');

  if (user !== null) { interaction.reply({ content: `Hey ${user}!` }); }
  else {
    interaction.reply({
      content: 'Pong!',
      ephemeral: true,
    });
  }
}
