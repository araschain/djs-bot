const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"unban",
    description: '💙 Kullanıcının Yasağını Kaldırırsın!',
    type:1,
    options: [
        {
            name:"id",
            description:"Kullanıcı ID Girin!",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "<:carpi:1040649840394260510> | Üyeleri Yasakla Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getString('id')
    
    interaction.guild.members.unban(user)
    interaction.reply({content: "<:tik:1039607067729727519> | Başarıyla Üyenin Yasağını Kaldırdım."})
}

};
