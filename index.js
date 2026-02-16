const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// clientReady イベントに変更（v15対応）
client.once('clientReady', () => {
  console.log('✅ Bot is online');
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'post') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('post_to_x')
            .setLabel('ボタン押してテスト')
            .setStyle(ButtonStyle.Primary)
        );

      await interaction.reply({ 
        content: 'ボタンをクリックして動作確認', 
        components: [row] 
      });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'post_to_x') {
      await interaction.reply({ content: 'ボタン動作OK', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
