const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "level-sıralaması",
  description: "💙 Sunucunun level sıralamasını görüntüleyin.",
  type: 1,
  options: [],

  
  run: async(client, interaction, db, Rank, AddRank, RemoveRank) => {
    
    const { user, guild, options } = interaction;
   
    let sayi = 1;
    
    const content = client.users.cache.filter(x => (db.fetch(`levelPos_${x.id}${guild.id}`))|| 0)
  .sort((x,y) => (db.fetch(`levelPos_${y.id}${guild.id}`)|| 0) - (db.fetch(`levelPos_${x.id}${guild.id}`))|| 0)
  .map((x) => {
    return `${sayi++}. <@${x.id}> **|** ${db.fetch(`levelPos_${x.id}${guild.id}`) || 0} Seviye`
  });
    
  return interaction.reply({ embeds: [{ description: `${content.slice(0, 10).join("\n")}`}] })
    
  }
};
