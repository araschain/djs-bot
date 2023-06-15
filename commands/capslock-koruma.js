const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "capslock-engel",
  description: "💙 CapsLock Engel Sistemini Açıp Kapatırsın!",
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
    const capslockSystemTrue = options.getString("seçenek");
    const capslockSystem = db.fetch(`capslockengel_${interaction.guild.id}`)

   switch(capslockSystemTrue) {
    case "ac": {
            const capslockSystem = db.fetch(`capslockengel_${interaction.guild.id}`)
      const capslockSystemDate = db.fetch(`capslockSystemDate_${interaction.guild.id}`)
      
      if (capslockSystem && capslockSystemDate) {
          const date = new EmbedBuilder()
          .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(capslockSystemDate.date / 1000)}:R> önce açılmış!`)
      
      return interaction.reply({ embeds: [date] })
      }

      db.set(`capslockengel_${interaction.guild.id}`, true)
	  db.set(`capslockSystemDate_${interaction.guild.id}`, { date: Date.now() })
      return interaction.reply({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem açıldı!" });
    }

    case "kapat": {
      if(!capslockSystem) return interaction.reply({ content: "<:carpi:1040649840394260510> | Bu sistem zaten kapalı?" });

      db.delete(`capslockengel_${interaction.guild.id}`)
	  db.delete(`capslockSystemDate_${interaction.guild.id}`)
      return interaction.reply({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem kapatıldı!" });
    }
  }

  }

};
