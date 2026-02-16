const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, SlashCommandBuilder, REST, Routes } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// ── スラッシュコマンド登録 ──
const commands = [
  new SlashCommandBuilder()
    .setName('post')
    .setDescription('記事をXに投稿するボタンを作成')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// ── ボタン作成＆投稿イベント ──
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'post') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('post_to_x')
            .setLabel('Xに投稿')
            .setStyle(ButtonStyle.Primary)
        );
      await interaction.reply({ content: '記事を投稿するにはボタンをクリックしてください', components: [row] });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'post_to_x') {
      // ここにX投稿処理を追加
      await interaction.reply({ content: '記事をXに投稿しました！', ephemeral: true });
    }
  }
});

client.once('ready', () => {
  console.log(`✅ Bot is online`);
});

client.login(process.env.DISCORD_TOKEN);
