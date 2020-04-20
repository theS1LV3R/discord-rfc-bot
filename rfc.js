const fetch = require("axios");
const { MessageEmbed } = require("discord.js");

const rexp = /rfc ?\d{1,5}/i;
const url = "https://www.ietf.org/rfc/";

module.exports = {
  name: "RFC",
  enabled: true,
  run: function (client, message, args = null) {
    if (message.author.bot) return; // We won't respond to bots
    let rematch = message.content.match(rexp); // Use regex to check wether there is an rfc in the message
    if (rematch) {
      // And if there is
      console.log(rematch); // Log it to the console
      let rfcNumber = parseInt(rematch[0].replace(" ", "").substring(3), 10); // Get the rfc's number
      fetch({ url: `${url}rfc${rfcNumber}.json`, method: "GET" }) // And download it from the website
        .then((response) => {
          // Then we are using that json object
          let msg = new MessageEmbed() // To make a new embed
            .setTitle(response.data["title"]) // With the RFC's title
            .setDescription(
              response.data["abstract"] // If it has a description
                ? response.data["abstract"] // Use it
                : "No description for this RFC" // Else say there is no description
            )
            .setAuthor(`RFC${rfcNumber}`) // SetAuthor is used for displaying which rfc it is
            .setColor("#00ff00"); // Sets the color to green
          message.channel.send(msg); // Then sends the message
        })
        .catch((error) => console.log(error)); // Catch any errors in the fetching of the RFC json
    }
  },
};
