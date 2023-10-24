require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with Hey!",
  },
  {
    name: "faucet",
    description: "Send $PUSH Token to you",
    options: [
      {
        name: "wallet-address",
        description: "Enter your wallet address",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Registered slash commands");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
