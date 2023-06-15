const { Client, EmbedBuilder } = require("discord.js");
const randomanime = require("random-anime")
const Discord = require("discord.js")
module.exports = {
  name: "random-anime",
  description: "💙 Random anime atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {


    const anime = randomanime.anime();
    const embed = new EmbedBuilder()
    .setImage(anime)
    .setColor("Random")
interaction.reply({embeds: [embed]})
  }  

};