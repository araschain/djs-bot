const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "💙 Botun pingini görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    interaction.reply({
      embeds: [{
      image: {
	url: 'https://dummyimage.com/2000x500/33363c/ffffff&text='+ client.ws.ping +'%20MS',
	},
        
      }]
    })

  }

};
