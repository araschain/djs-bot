const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const Discord = require('discord.js')
module.exports = {
    name:"özel-oda-menü",
    description: '💙 Özel oda menüsü.',
    type:1,
    options: [],
  run: async(client, interaction) => {

    let odasi = db.fetch(`oda_${interaction.user.id}`)
    if (!odasi) return interaction.reply("<:carpi:1040649840394260510> | Sana ait bir oda bulamadım!")
    const embed = new EmbedBuilder()
   .setTitle("Silex - Özel Oda Sistemi!")
   .setDescription("Aşağıdaki butondan özel odana kullanıcı ekleyebilirsin!")
   .setColor("#ff0000")
   const row = new Discord.ActionRowBuilder()
   .addComponents(
    new Discord.ButtonBuilder()
.setLabel("Ekle")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji('1041737371131056218')
.setCustomId("ekle_"+interaction.user.id),
new Discord.ButtonBuilder()
.setLabel("Çıkar")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji('1041737369436557393')
.setCustomId("çıkar_"+interaction.user.id))
interaction.reply({embeds: [embed], components: [row]})
}

};