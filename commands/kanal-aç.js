const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "kanal-aç",
  description: "💙 Kanalı mesaj gönderimine açar!",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:carpi:1040649840394260510> | Kanalları yönet yetkin yok!", ephemeral: true})
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
      SendMessages: true,
    });
interaction.reply({content: '<:tik:1039607067729727519> | Kanal başarılı bir şekilde mesaj gönderimine açıldı!'})
  }  

};