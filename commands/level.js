const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "level",
  description: "💙 Seviyenizi görüntüleyin.",
  type: 1,
  options: [],

  
  run: async(client, interaction, db, Rank, AddRank, RemoveRank) => {
    
    const { user, guild, options } = interaction;
    
    const level = db.fetch(`levelPos_${user.id}${guild.id}`) || 0;
    const xp = db.fetch(`xpPos_${user.id}${guild.id}`) || 0;
    
    return Rank(interaction, String(xp), String(level), "100")
    
  }
};
