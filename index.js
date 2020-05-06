const { Client } = require("discord.js"); // We need the client object in order to make the discord client
const client = new Client(); // Making the client
require("dotenv").config(); // Standard dotenv stuff

/*
When the client is ready, console.log it's tag
*/
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

/*
Every time there is a message, run the rfc.js file
*/
client.on("message", (message) => {
  require("./rfc.js").run(client, message);
});


/*
Log the bot in when everything is ready
*/
client.login(process.env.TOKEN); //Add your token to a .env file
