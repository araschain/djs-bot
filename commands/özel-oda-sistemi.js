const { PermissionsBitField, ChannelType } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
module.exports = {
    name:"özel-oda-sistemi",
    description: '💙 Özel oda sistemini ayarlarsın!',
    type:1,
    options: [
      {
        type: 3,
        name: "isim",
        description: "Oda ismi yaz!",
        required: true
      }
    ],
  run: async(client, interaction) => {
    const { user, guild, options } = interaction;
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:carpi:1040649840394260510> | Kanalları Yönet Yetkin Yok!", ephemeral: true})
		    const ozelOdaSystem = db.fetch(`ozelodasistemi_${interaction.guild.id}`)
    const ozelOdaSystemDate = db.fetch(`ozelOdaSystemDate_${interaction.guild.id}`)
    
    if (ozelOdaSystem && ozelOdaSystemDate) {
        const date = new EmbedBuilder()
        .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(ozelOdaSystemDate.date / 1000)}:R> önce açılmış!`)
    
    return interaction.reply({ embeds: [date] })
  }
  const isim = options.getString("isim")

  const category = await guild.channels.create({
    name: 'ÖZEL ODA',
    type: Discord.ChannelType.GuildCategory,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
      },
    ],
  });  
  db.set(`ozelOdaSystemCategory_${interaction.guild.id}`, { category: category.id });
  const ozelOdaCategory = db.fetch(`ozelOdaSystemCategory_${interaction.guild.id}`);
  const channel = await interaction.guild.channels.create({
    name: `${isim}`,
    type: Discord.ChannelType.GuildVoice,
    parent: ozelOdaCategory.category,
    permissionOverwrites: [],
  });
 
    db.set(`ozelodasistemi_${interaction.guild.id}`, isim)
	  db.set(`ozelOdaSystemDate_${interaction.guild.id}`, { date: Date.now() })
    interaction.reply("<:tik:1039607067729727519> | Sesli Kanal Başarıyla Oluşturuldu.")
}

};