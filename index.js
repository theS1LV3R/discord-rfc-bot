const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  require("./rfc.js").run(client, message)
});

client.login(process.env.TOKEN); //Add your token to a .env file
