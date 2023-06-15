const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events  } = require("discord.js");

module.exports =  {
  name: Events.MessageDelete,

  run: async(client, message) => {
    let kanal = db.get(`modlogK_${message.guild.id}`)
    try {
    const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(`Yeni bir mesaj silindi!`)
    .addFields(
      { name: "**Kullanıcı Tag**", value: message.author.tag, inline: false },
      { name: "**ID**", value: message.author.id, inline: false  },
      { name: "**Silinen Mesaj**", value: "```" + message.content + "```", inline: false  },
      { name: "**Silindiği Zaman**", value: `<t:${parseInt(Date.now() / 1000)}:R>`, inline: true }
        )
    client.channels.cache.get(kanal).send({ embeds: [embed] })
  } catch(err) { }
  }
}