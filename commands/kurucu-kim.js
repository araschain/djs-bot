const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kurucu",
  description: "💙 Sunucunun kurucusunu görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const owner = interaction.guild.members.cache.get(interaction.guild.ownerId);
interaction.reply(owner.user.tag)
  }

};
