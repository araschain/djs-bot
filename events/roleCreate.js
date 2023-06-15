const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events  } = require("discord.js");

module.exports =  {
  name: Events.GuildRoleCreate,

  run: async(client, role) => {
    let kanal = db.get(`modlogK_${role.guild.id}`)
    try {
    const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(`Yeni bir rol oluşturuldu!`)
    .addFields(
      { name: "**Rol**", value: `\`${role.name}\``, inline: false },
      { name: "**Rol Rengi Kodu**", value: `${role.hexColor}`, inline: false  },
      { name: "**Oluşturulduğu Zaman**", value: `<t:${parseInt(Date.now() / 1000)}:R>`, inline: true }
            )
    client.channels.cache.get(kanal).send({ embeds: [embed] })
  } catch(err) { }
  }
}