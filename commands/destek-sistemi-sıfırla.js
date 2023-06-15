const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "destek-sistemi-sıfırla",
    description: "💙 Destek sistemini sıfırlarsın!",
    type: 1,
    options: [],
    // 
    run: async (client, interaction) => {

        const { user, customId, guild } = interaction;
        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<:tik:1039607067729727519> | __**Destek Sistemi**__ başarıyla sıfırlandı!`)
            db.delete(`ticketKanal_${interaction.guild.id}`)
            db.delete(`ticketSystem_${interaction.guild.id}`)
            db.delete(`ticketLvl_${interaction.guild.id}`)
            db.delete(`ticketCategory_${interaction.guild.id}`);
			db.delete(`ticketSystemDate_${interaction.guild.id}`)

        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};