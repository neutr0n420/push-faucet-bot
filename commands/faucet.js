const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aryan")
    .setDescription("Lord aryan will say your name")
    .addStringOption((option) =>
      option
        .setName("Enter your name")
        .setDescription("Takes your name as a input!")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply(
      `Yooo ${interaction.option.get("Enter your name")}`
    );
  },
};
