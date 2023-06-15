const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "level-sistemi",
  description: "💙 Level sistemini açıp kapatırsın.",
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

  
  run: async(client, interaction, db, Rank, AddRank, RemoveRank) => {
    
    const { user, guild, options } = interaction;
    
    const levelSystem = db.fetch(`acikmiLevel_${guild.id}`) ? true : false;
    const levelSystemTrue = options.getString("seçenek");

    switch(levelSystemTrue) {
      case "ac": {
                const levelSystem = db.fetch(`acikmiLevel_${interaction.guild.id}`)
        const levelSystemDate = db.fetch(`levelSystemDate_${interaction.guild.id}`)
        
        if (levelSystem && levelSystemDate) {
            const date = new EmbedBuilder()
            .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(levelSystemDate.date / 1000)}:R> önce açılmış!`)
        
        return interaction.reply({ embeds: [date] })
        }
        db.set(`acikmiLevel_${guild.id}`, true)
		db.set(`levelSystemDate_${interaction.guild.id}`, { date: Date.now() })
        return interaction.reply({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem açıldı!" });
      }

      case "kapat": {
        if(!levelSystem) return interaction.reply({ content: "<:carpi:1040649840394260510> | Bu sistem zaten kapalı?" });

        db.delete(`acikmiLevel_${guild.id}`)
		db.delete(`levelSystemDate_${interaction.guild.id}`)
        return interaction.reply({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem kapatıldı!" });
      }
    }
  }
};

//