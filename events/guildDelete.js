const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: Discord.Events.GuildDelete,

    run: async(client, guild) => {
      const kanal = "1066724841341849650"; 

      const owner = await client.users.fetch(guild.ownerId)
      const embed = new EmbedBuilder()
      .setDescription(`Bir Sunucudan Atıldım!
    Sunucu İsmi: ${guild.name}
    Sunucu Kimliği: ${guild.id} 
    Kurucu: ${owner.tag}
    Kurucu Kimliği: ${owner.id}
    Üye Sayısı: ${guild.memberCount}`)
      client.channels.cache.get(kanal).send({ embeds: [embed] })

        
    //
    }
}