const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"rol-al",
    description: '💙 Birinden Rol Alırsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Rolü alınıcak kullanıcıyı seçin!",
            type:6,
            required:true
        },
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "<:carpi:1040649840394260510> | Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    const user = interaction.options.getMember('user')
    interaction.guild.members.cache.get(user.id).roles.remove(rol)
    interaction.reply({content: "<:tik:1039607067729727519> | Başarıyla <@"+user+"> Kullanıcısının <@&"+rol.id+"> Rolü Alındı!"})
}

};
