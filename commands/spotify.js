const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "spotify",
  description: "💙 Kullanıcının Spotify bilgilerine bakarsın!",
  type: 1,
  options: [         {
    name: "kullanıcı",
    description: "Kullanıcı belirt!",
    type: 6,
    required: true
},],

  run: async(client, interaction) => {
    const kullanıcı = interaction.options.getMember('kullanıcı')
    const spotify = kullanıcı.presence.activities.filter(x => x.name === 'Spotify' && x.type === 2)[0]

    const dinleyenyok = new Discord.EmbedBuilder()
    .setDescription(`:x: ${kullanıcı} Spotify **Dinlemiyor**`)
    .setColor('Red')
    if(!spotify) return interaction.reply({ embeds: [dinleyenyok] })

    const resim = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(8)}`;
    const ad = spotify.details;
    const album = spotify.assets.largeText;
    const yapimci = spotify.state;
  
    const embed = new Discord.EmbedBuilder()
    .setThumbnail(resim)
    .setDescription(`
    🎧 **| ${kullanıcı} Adlı kişinin spotify bilgisi**

    • **Şarkı İsmi »** \`${ad}\`
    • **Albüm »** \`${album}\`
    • **Yapımcı »** \`${yapimci}\`
    `)
    .setColor("Aqua")
    await interaction.reply({ embeds: [embed] })

  }  

};