const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
const moment = require('moment')
module.exports = {
  name: "sunucu-bilgi",
  description: "💙 Sunucu bilgileri!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const onlinekişi = interaction.guild.members.cache.filter(o => o.presence && o.presence.status === 'online').size
    const boştakişi = interaction.guild.members.cache.filter(o => o.presence && o.presence.status === 'idle').size
    const retmekişi = interaction.guild.members.cache.filter(o => o.presence && o.presence.status === 'dnd').size
    const offlinekişi = interaction.guild.members.cache.filter(o => !o.presence).size

    const kategori = interaction.guild.channels.cache.filter(c => c.type === 4).size
    const ses = interaction.guild.channels.cache.filter(c => c.type === 2).size
    const yazı = interaction.guild.channels.cache.filter(c => c.type === 0).size
    const altbaşlk = interaction.guild.channels.cache.filter(c => c.type === 11).size

    const sahip = await interaction.guild.fetchOwner()
    const bölge = interaction.guild.preferredLocale
    if(bölge === 'tr') { ülke = 'Türkiye' } else if(bölge === 'en-US') { ülke = 'Amerika' } else ülke = interaction.guild.preferredLocale 
    const doğrulamailk = interaction.guild.verificationLevel
    if(doğrulamailk === 0) doğrulama = 'Yok'
    if(doğrulamailk === 1) doğrulama = 'Düşükk'
    if(doğrulamailk === 2) doğrulama = 'Orta'
    if(doğrulamailk === 3) doğrulama = 'Yüksek'
    if(doğrulamailk === 4) doğrulama = 'Çok Yüksek'

    const emojis = interaction.guild.emojis.cache.map(e => e.toString())
    let array = [];
    for (let i = 0; i < 32; i++) {
        array.push(emojis[i])
    }
    if(interaction.guild.emojis.cache.size === 0)  { emoji = 'Emoji Yok' } else { emoji = array.join(" ") } 

    const roles = interaction.guild.roles.cache.map(e => e.toString())
    let array2 = [];
    for (let i = 0; i < 8; i++) {
        if(roles[i] !== '@everyone') {
        array2.push(roles[i] + ' ')
        }
    }
    if(interaction.guild.roles.cache.size < 5)  { rol = 'Yönetilebilir Rol Yok' } else { rol = array2.join(" ") } 

    const embed = new Discord.EmbedBuilder()
        .setColor("Purple")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }) ? interaction.guild.iconURL({ dynamic: true }) : 'https://cdn.discordapp.com/attachments/985147469363036232/1001388484868714527/6134072535d460dc1097a60a729b43c2.png')
        .addFields(
            { name: `Sunucu Adı`, value: `\`${interaction.guild.name}\``, inline: true },
            { name: `Sunucu ID`, value: `\`${interaction.guild.id}\``, inline: true },
            { name: `Sunucu Sahibi`, value: `\`${sahip.user.tag}\``, inline: true },
            { name: `Sunucu Bölgesi`, value: `\`${ülke}\``, inline: true },
            { name: `Oluşturulma Tarihi`, value: `\`${moment(interaction.guild.createdAt).format('D MMMM YYYY')}\``, inline: true },
            { name: `Takviye Seviyesi`, value: ` \`${interaction.guild.premiumTier}. Seviye - ${interaction.guild.premiumSubscriptionCount} Takviye\``, inline: true },
            { name: `Kişi-Bot Sayısı (\`${interaction.guild.memberCount}-${interaction.guild.members.cache.filter(x => x.user.bot == true).size}\`)`, value: `\`${onlinekişi} Çevirimiçi\n${retmekişi} Rahatsız Etmeyin\n${boştakişi} Boşta\n${offlinekişi} Çevrimdışı\``, inline: true },
            { name: `Doğrulama Seviyesi`, value: `\`${doğrulama}\``, inline: true },
            { name: `Kanal Sayısı (\`${interaction.guild.channels.cache.size}\`)`, value: `\`${kategori} Kategori Kanalları\n${ses} Ses Kanalları\n${yazı} Yazı Kanalları\n${altbaşlk} Altbaşlık Kanalları\``, inline: true },
            { name: `Emojiler (\`${interaction.guild.emojis.cache.filter(a => a.animated === true).size}-${interaction.guild.emojis.cache.filter(a => a.animated === false).size}\`)`, value: emoji, inline: true },
            { name: `Roller (\`${interaction.guild.roles.cache.size}\`)`, value: rol, inline: true }
            
        )
    interaction.reply({ embeds: [embed] })
  }  

};