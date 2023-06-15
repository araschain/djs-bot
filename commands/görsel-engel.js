const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"görsel-engel",
    description: '💙 Görsel engel sistemini ayarlarsın!',
    type:1,
    options: [
        {
            name: "kanal",
            description: "Görsel engel kanalını ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:carpi:1040649840394260510> | Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`görselengel.${interaction.guild.id}`, kanal2.id)
   interaction.reply("<:tik:1039607067729727519> | <#"+kanal2+"> kanalında sadece gif ve resimlere izin vereceğim!")
}

};