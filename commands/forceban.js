const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"forceban",
    description: '💙 ID ile kullanıcı yasaklarsın!',
    type:1,
    options: [
        {
            name:"id",
            description:"Lütfen bir kullanıcı ID girin!",
            type:3,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "<:carpi:1040649840394260510> | Üyeleri Yasakla Yetkin Yok!", ephemeral: true})
    const id = interaction.options.getString('id')
  interaction.guild.members.ban(id).catch(() => {})
interaction.reply(id+ "<:tik:1039607067729727519> | IDLI Kullanıcı Başarıyla Yasaklandı!")
}

};
