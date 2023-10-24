const { REST, Routes } = require("discord.js");
require("dotenv").config();
// console.log(process.env.CLIENT_ID);
const command = [
  {
    name: "ping",
    description: "Replies with pong",
  },
];
const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: command,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
