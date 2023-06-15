const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "timeout-sistemi",
    description: "💙 Timeout sistemini ayarlarsın!",
    type: 1,
    options: [
        {
            name: "log-kanalı",
            description: "Timeout atıldığında mesaj atılacacak kanalı ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "yetkili-rol",
            description: "Timeout atabilecek yetkili rolünü ayarlarsın!",
            type: 8,
            required: true,
        },
    ],
    // 
    run: async (client, interaction) => {

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        const kanal = interaction.options.getChannel('log-kanalı')
        const rol = interaction.options.getRole('yetkili-rol')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })
			
		
        const timeoutSistemi = db.fetch(`timeoutSistemi_${interaction.guild.id}`)
        const timeoutSistemiDate = db.fetch(`timeoutSistemiDate_${interaction.guild.id}`)
        
        if (timeoutSistemi && timeoutSistemiDate) {
            const date = new EmbedBuilder()
            .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(timeoutSistemiDate.date / 1000)}:R> önce açılmış!`)
        
        return interaction.reply({ embeds: [date] })
        }

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<:tik:1039607067729727519> | __**Timeout Sistemi**__ başarıyla ayarlandı! __/timeout__ komutu ile sistemi kullanabilirsin.\n\n<:kanal:1040649841996464139> Log Kanalı: ${kanal}\n<:bot:1039607042291269703> Yetkili Rolü: ${rol}`)

        db.set(`timeoutSistemi_${interaction.guild.id}`, { log: kanal.id, yetkili: rol.id })
		db.set(`timeoutSistemiDate_${interaction.guild.id}`, { date: Date.now() })
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};