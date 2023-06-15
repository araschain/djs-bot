const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "afk",
  description: "💙 Afk Olursun!",
  type: 1,
  options: [
    {
        name:"sebep",
        description:"Afk Olma Sebebini Gir!",
        type:3,
        required:true
    },
  ],

  run: async(client, interaction) => {
    const sebep = interaction.options.getString('sebep')
    db.set(`afk_${interaction.user.id}`, sebep);
	db.set(`afkDate_${interaction.user.id}`, { date: Date.now() } )
    interaction.reply("<:tik:1039607067729727519> | Başarıyla Afk Oldun!")

    

  }

};
