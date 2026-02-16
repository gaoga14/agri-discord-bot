client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand() && interaction.commandName === 'post') {
    await interaction.reply({ content: "ボタンテスト開始", ephemeral: true });
  }
});
