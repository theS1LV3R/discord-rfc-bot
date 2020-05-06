const fetch = require("axios"); // Using axios because of it's support for JSON parsing
const { MessageEmbed } = require("discord.js"); // We need MessageEmbed to make discord embeds

const regexp = /rfc ?\d{1,5}/i; // The regex that matches the rfc thing
const url = "https://www.ietf.org/rfc/"; // Where to download rfcs from

/**
 *Standard module stuff, to be able to run the command
*/
module.exports = {
  /**
   *Runs a check on a message to get an rfc, and if one is found, return info on it
   *
   * @param {*} client The client object
   * @param {*} message The message object
   * @param {*} [args=null] Parsed message arguments
   * @returns null
   */
  run: function (client, message, args = null) {
    if (message.author.bot) return; // We won't respond to bots
    let rematch = message.content.match(regexp); // Use regex to check wether there is an rfc in the message
    if (rematch) {
      // And if there is
      console.log(rematch); // Log it to the console
      let rfcNumber = parseInt(rematch[0].replace(" ", "").substring(3), 10); // Get the rfc's number
      fetch({
        url: `${url}rfc${rfcNumber}.json`,
        method: "GET",
      }) // And download it from the website
        .then((response) => {
          // Then we are using that json object
          let msg = new MessageEmbed() // To make a new embed
            .setTitle(response.data["title"]) // With the RFC's title
            .setDescription(
              response.data["abstract"] // If it has a description
                ? response.data["abstract"] // Use it
                : "No description was found for this RFC" // Else say there is no description
            )
            .setAuthor(`RFC${rfcNumber}`) // SetAuthor is used for displaying which rfc it is
            .setColor("#00ff00"); // Sets the color to green
          message.channel.send(msg); // Then sends the message
        })
        .catch((error) => console.log(error)); // Catch any errors in the fetching of the RFC json
    }
  },
};
