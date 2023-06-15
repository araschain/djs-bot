const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"ban",
    description: '💙 Kullanıcıyı Sunucudan Yasaklarsın.',
    type:1,
    options: [
        {
            name:"user",
            description:"Yasaklanıcak Kullanıcıyı Seçin.",
            type:6,
            required:true
        },
        {
            name:"reason",
            description:"Hangi Sebepten dolayı yasaklanıcak?",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "<:carpi:1040649840394260510> | Üyeleri Yasakla Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getMember('user')
    const sebep = interaction.options.getString('reason')
    if(user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content:"<:carpi:1040649840394260510> | Bu Kullanıcının Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.   ",ephemeral:true})
    user.ban({reason: sebep});
    interaction.reply({content: "<:tik:1039607067729727519> | Başarıyla Üyeyi Yasakladım!"})
}

};
