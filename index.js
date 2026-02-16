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

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'post_to_x') {
      // 最小テスト
      await interaction.reply({ 
        content: "ボタン動作OK", 
        ephemeral: true  // 他の人には見えない
      });
    }
  }
});

    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'post_to_x') {
      // ここにX投稿処理を追加
      await interaction.reply({ content: "テスト投稿成功", ephemeral: true });
    }
  }
});

client.once('ready', () => {
  console.log(`✅ Bot is online`);
});

client.login(process.env.DISCORD_TOKEN);
