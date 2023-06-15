const { PermissionsBitField, ChannelType, EmbedBuilder } = require("discord.js");
const db = require('croxydb');
const Discord = require('discord.js');
const { Permissions } = require("discord.js")
module.exports = {
    name:"sunucu-kur",
    description: '💙 Otomatik Sunucu kurarsın!',
    type:1,
    options: [],
  run: async(client, interaction) => {

    if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply('<:blurplecross:922176863881797693> | Bu komutu sadece **sunucu sahibi** kullanabilir!')


    const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId('sunucukuronay_'+interaction.user.id)
            .setLabel('Onayla')
            .setEmoji("1039607067729727519")
            .setStyle('Success'),
        new Discord.ButtonBuilder()
            .setCustomId('sunucukurred_'+interaction.user.id)
            .setLabel('İptal')
            .setEmoji("1040649840394260510")
            .setStyle('Danger'),

    );

const embed = new EmbedBuilder()
    .setDescription(`Sunucuyu kurmak istediğinden emin misin? Sunucudaki bütün kanallar ve roller silinecek.`)

interaction.reply({ embeds: [embed], components: [row] })
}

};