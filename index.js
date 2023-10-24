// import { Client, GatewayIntentBits } from "discord.js";
const { Client, Collection, IntentsBitField } = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const { add } = require("./commands/add");

client.commands = new Collection();

client.on("interactionCreate", async (interation) => {
  if (!interation.isChatInputCommand()) return;
  if (interation.commandName == "ping") {
    await interation.reply("Your mom!");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  if (interaction.commandName === "hey") {
    interaction.reply("Hey!");
  }
  if (interaction.commandName == "faucet") {
    const walletAddress = interaction.options.get("wallet-address").value;
    interaction.reply(`your wallet address is ${walletAddress}`);
    console.log(add(1, 2));
  }
});

client.login(process.env.TOKEN);
