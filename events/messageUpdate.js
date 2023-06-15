const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events  } = require("discord.js");

module.exports =  {
  name: Events.MessageUpdate,

  run: async(client, oldMsg, newMsg) => {

    if(!db.fetch(`modlogK_${oldMsg.guild.id}`)) return;

    const myDb = {
      kanal:   db.fetch(`modlogK_${oldMsg.guild.id}`)
     }
//
     const { kanal } = myDb;
    
    const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(`Yeni bir mesaj düzenlendi!`)
    .addFields(
      { name: "**Kullanıcı Tag**", value: oldMsg.author.tag, inline: false },
      { name: "**ID**", value: oldMsg.author.id, inline: false  },
      { name: "**Eski Mesaj**", value: "```" + oldMsg.content + "```", inline: false  },
      { name: "Yeni Mesaj", value: "```" + newMsg.content + "```", inline: false},
      { name: "**Düzenlendiği Zaman**", value: `<t:${parseInt(Date.now() / 1000)}:R>`, inline: true }
            )
    client.channels.cache.get(kanal).send({ embeds: [embed] })
  }
}