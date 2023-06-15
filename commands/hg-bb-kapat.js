const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"giriş-çıkış-kapat",
    description: '💙 Giriş Çıkış Sistemini kapatırsın!',
    type:1,
    options: [],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:carpi:1040649840394260510> | Kanalları Yönet Yetkin Yok!", ephemeral: true})
   db.delete(`hgbb_${interaction.guild.id}`)
   interaction.reply("<:tik:1039607067729727519> | Hoşgeldin Güle Güle Kanalı Başarıyla Sıfırlandı!")
}

};
