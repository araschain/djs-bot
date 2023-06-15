const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "reklam-engel",
  description: "💙 Reklam Engel Sistemini Açıp Kapatırsın!",
  type: 1,
  options: [
    {
      type: 3,
      name: "seçenek",
      description: "Sistemi kapatacak mısın yoksa açacak mısın?",
      required: true,
      choices: [
        {
          name: "Aç",
          value: "ac"
        },
        {
          name: "Kapat",
          value: "kapat"
        }
      ]
    }
  ],

  run: async(client, interaction) => {
    const { user, guild, options } = interaction;
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "<:carpi:1040649840394260510> | Rolleri Yönet Yetkin Yok!", ephemeral: true})
 
    const reklamEngelSystemTrue = options.getString("seçenek");
    const reklamEngelSystem = db.fetch(`reklamengel_${interaction.guild.id}`)

    switch(reklamEngelSystemTrue) {
      case "ac": {
                const reklamEngelSystem = db.fetch(`reklamengel_${interaction.guild.id}`)
        const reklamEngelSystemDate = db.fetch(`reklamengelDate_${interaction.guild.id}`)
        
        if (reklamEngelSystem && reklamEngelSystemDate) {
            const date = new EmbedBuilder()
            .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(reklamEngelSystemDate.date / 1000)}:R> önce açılmış!`)
        
        return interaction.reply({ embeds: [date] })
        }
  
        db.set(`reklamengel_${interaction.guild.id}`, true)
		db.set(`reklamengelDate_${interaction.guild.id}`, { date: Date.now() })
        return interaction.reply({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem açıldı!" });
      }
  
      case "kapat": {
        if(!reklamEngelSystem) return interaction.reply({ content: "<:carpi:1040649840394260510> | Bu sistem zaten kapalı?" });
  
        db.delete(`reklamengel_${interaction.guild.id}`)
		db.delete(`reklamengelDate_${interaction.guild.id}`)
        return interaction.reply({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem kapatıldı!" });
      }
    }

  }

};
