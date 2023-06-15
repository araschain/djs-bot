const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events, PermissionsBitField  } = require("discord.js");
const Discord = require("discord.js")

module.exports =  {
  name: Events.MessageCreate,

  run: async(client, message, msg) => {
  if(message.author.bot) return;
  if(!message.guild) return;

  const xp = db.fetch(`xpPos_${message.author.id}${message.guild.id}`);
  const levellog = db.fetch(`level_log_${message.guild.id}`);
  const level = db.fetch(`levelPos_${message.author.id}${message.guild.id}`)
  
  const acikmi = db.fetch(`acikmiLevel_${message.guild.id}`) ? true : false;
  if(acikmi) {

  if(xp >= 100) {
    db.subtract(`xpPos_${message.author.id}${message.guild.id}`, xp);
    db.add(`levelPos_${message.author.id}${message.guild.id}`, 1)

    try {  //
      const embed = new EmbedBuilder()
      .setDescription(`GG!, artık yeni seviyene ulaştın, tebrikler! Yeni seviyen: **${level+1}**`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }));
      client.channels.cache.get(levellog).send({ content: `${message.author}`, embeds: [embed] })
      } catch(err) { 
        console.log(err)
      }
    
  } else {
  db.add(`xpPos_${message.author.id}${message.guild.id}`, 0.5); 
  }
}


  if (await db.get(`afk_${message.author.id}`)) {
    
    const afkDate = db.fetch(`afkDate_${message.author.id}`)
    const sebep = db.fetch(`afk_${message.author.id}`)
    
    if (afkDate && sebep) {
        const date = new EmbedBuilder()
        .setDescription(`${message.author} Hoş geldin! **${sebep}** sebebiyle <t:${parseInt(afkDate.date / 1000)}:R> afk'ydın`)
        db.delete(`afk_${message.author.id}`);
        db.delete(`afkDate_${message.author.id}`)
    
    return message.reply({ embeds: [date] })
    }

     }

  var kullanıcı = message.mentions.users.first();
  if (kullanıcı) {
    const afkDate = db.fetch(`afkDate_${kullanıcı.id}`)

  const sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    const sebeps = new EmbedBuilder()
    .setDescription(`<:soru:1039607065045385256> | Etiketlediğin kullanıcı **${sebep}** sebebiyle afk modunda!`)
    message.reply({ embeds: [sebeps] });
  }
}

    let kufur = db.fetch(`kufurengel_${message.guild.id}`)
    
    if(kufur) {
    const kufurler = [
      
      "amk",
      "piç",
      "yarrak",
      "oç",
      "göt",
      "amq",
      "yavşak",
      "amcık",
      "amcı",
      "orospu",
      "sikim",
      "sikeyim",
      "aq", 
      "mk"
         
    ]
    
  if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
      if(message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      if(message.author?.bot) return;

  message.delete()
  message.channel.send(`<:carpi:1040649840394260510> | Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
  }
  }

    let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
    
    if(reklamlar) {
  
    const linkler = [
      
      ".com.tr",
      ".net",
      ".org",
      ".tk",
      ".cf",
      ".gf",
      "https://",
      ".gq",
      "http://",
      ".com",
      ".gg",
      ".porn",
      ".edu"
         
    ]
    
  if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
      if(message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
    if(message.author?.bot) return;
  message.delete()
  message.channel.send(`<:carpi:1040649840394260510> | Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
  }
  }

    let kanal = db.get(`görselengel.${message.guild.id}`);
    if(message.channel.id == kanal){
      if(!message.attachments.first()){
  
        if(message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if(message.author?.bot) return;
        message.delete()
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author}, Bu Kanalda Sadece GIF & Resim Atabilirsiniz.`)
        .setFooter({text: message.author.tag+" UYARI!"})
        .setTimestamp()
        message.channel.send({embeds: [embed]})
  
      };
    
    };

      const data = db.fetch(`yasaklı_kelime_${message.guild.id}`)
      if(data) {
      if(message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      if(message.author?.bot) return;
      if(data.includes(message.content)) {
      message.delete()
      const embed = new EmbedBuilder()
      .setTitle(`<:uyari:1040649846400499712> **UYARI!**`)
      .setDescription(`✋ | ${message.author}, Bu sunucuda bu kelime yasak!`)
      .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      message.channel.send({ embeds: [embed] })
      }
    }
  
       let saas = db.fetch(`saas_${message.guild.id}`)
        
        if(saas) {
        
        let selaamlar = message.content.toLowerCase()  
      if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){
      
      message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
      }
      } 
            if (message.content.length > 4) {
             if (db.fetch(`capslockengel_${message.guild.id}`)) {
               let caps = message.content.toUpperCase()
               if (message.content == caps) {
                if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                   if (!message.mentions.users.first()) {
                    message.delete()
                     const embed = new EmbedBuilder()
                     .setTitle(`<:uyari:1040649846400499712> **UYARI!**`)
                     .setDescription(`✋ | ${message.author}, Bu sunucuda büyük harf kullanımı engelleniyor!`)
                     .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                     .setTimestamp()
                     message.channel.send({embeds: [embed]})
         }
        }
         }
       }
      }

  }
}