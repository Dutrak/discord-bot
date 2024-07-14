import { starRailClient } from '../../lib/hsr.js';
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('perfil')
  .setDescription('Pega o perfil de um usuário pelo UID')
  .addStringOption((option) => option.setName('uid').setDescription('UID do usuário').setRequired(true));

export async function execute(interaction) {
  const uid = interaction.options.getString('uid');
  const user = await starRailClient.fetchUser(uid).then(userData => {
    return userData;
  });

  interaction.reply({
    content: `Nickname: ${user.nickname}\nUID: ${user.uid}\nLevel: ${user.level}\n`,
  });
}
