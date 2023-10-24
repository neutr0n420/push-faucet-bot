// import { Client, GatewayIntentBits } from "discord.js";
const {
  Client,
  Collection,
  IntentsBitField,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const { transfer } = require("./src/transfer");
const { isValidWalletAddress } = require("./src/validAddress");

let hash;

client.commands = new Collection();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "hey") {
    interaction.reply("Hey!");
  }
  if (interaction.commandName == "faucet") {
    const walletAddress = interaction.options.get("wallet-address").value;

    if (!isValidWalletAddress(walletAddress)) {
      interaction.reply("Plese enter Valid Wallet address :) ");
      return;
    } else {
      interaction.reply("sending you $50 PUSH token");
      console.log(walletAddress);
      transfer(walletAddress)
        .then((response) => {
          // interaction.reply(response);
          const embed = new EmbedBuilder()
            .setColor("#3BA55C")
            .setDescription(
              `[View on Ethscan](https://goerli.etherscan.io//tx/${response})`
            );
          interaction.followUp({
            content: `Transcation of 50 $Push is created with hash`,
            embeds: [embed],
          });
          console.log(response);
        })
        .catch((error) => {
          interaction.followUp({
            content: `${error}`,
          });
        });
      // await interaction.reply("Hash is", hash);
    }
  }
  if (interaction.commandName == "start") {
    interaction.reply(
      `Welcome to the Push Faucet Bot! I'm here to help you distribute $PUSH test tokens for the Goerli testnet. `
    );
  }
  if (interaction.commandName == "ping") {
    InteractionResponse.reply("pong, Bot is running properly");
  }
  if (interaction.commandName == "community") {
    const twitter = new EmbedBuilder()
      .setColor("#3BA55C")
      .setDescription(`[Twitter](https://twitter.com/pushprotocol)`);
    const website = new EmbedBuilder()
      .setColor("#3BA55C")
      .setDescription(`[push's Website](https://push.org)`);
    interaction.reply({
      content: "Get involved in the community",
      embeds: [twitter, website],
    });
  }
});

client.login(process.env.TOKEN);
