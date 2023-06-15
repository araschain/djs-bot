const Discord = require("discord.js");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const db = require("croxydb");
const moment = require("moment");

module.exports = {
    name: Discord.Events.GuildMemberRemove,

    run: async(client, member) => {
	const giriscikissystem = db.fetch(`canvaskanal_${member.guild.id}`)

    if(giriscikissystem) {
        const giriscikiskanal = member.guild.channels.cache.find(c => c.id === giriscikissystem.channel);

        const Canvas = require("canvas")
      
        const canvas = Canvas.createCanvas(648, 387);
        const ctx = canvas.getContext("2d");
      
        const background = await Canvas.loadImage(
          "https://cdn.discordapp.com/attachments/1059089831604531243/1067877929016635412/giden.png"
        );
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      
        ctx.strokeStyle = "#3c3c3c";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
        ctx.fillStyle = `#D3D3D3`;
        ctx.font = `37px "Warsaw"`;
        ctx.textAlign = "center";
        ctx.fillText(`${member.user.tag}`, 320, 300);

        if(member.displayAvatarURL().endsWith(".webp") ) {
            var avatar1 = member.displayAvatarURL()
            
            img = await Canvas.loadImage(avatar1.replace("webp", "jpg")); 
          } else {
            img = await Canvas.loadImage(member.displayAvatarURL({ format: "jpg", size: 1024 })); 
          }
      
        let boyut = 85, x = 325.5, y = 161;
        ctx.beginPath();
        ctx.arc(x, y, boyut, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.drawImage(img, (x - boyut), (y - boyut), (boyut * 2), (boyut * 2));
      
        const canvasgiris = new AttachmentBuilder(canvas.toBuffer(), { name: 'cikis.png' });
      
        giriscikiskanal.send({content: `${member} sunucumuzdan çıktı! Sunucumuz **${member.guild.memberCount}** kişi kaldı.`, files: [canvasgiris]});
        if (member.user.bot) {
          return giriscikiskanal.send(`Bu bir bot, ${member.user.tag}`);
        }
    }
	
		        const hgbb = db.fetch(`hgbb_${member.guild.id}`)
        const sayacmessage = db.fetch(`sayacmessage_${member.guild.id}`)
        if(hgbb) {
            const kanal = member.guild.channels.cache.find(c => c.id === hgbb.channel);
            if(sayacmessage) {
                const cikismesaj = sayacmessage.leaveMsg
                .replaceAll("{guild.memberCount}", `${member.guild.memberCount}`)
                .replaceAll("{guild.name}", `${member.guild.name}`)
                .replaceAll("{owner.name}", `<@${member.guild.ownerId}>`)
                .replaceAll("{member}", `<@${member.user.id}>`)
        
                const cikismesajs = new Discord.EmbedBuilder()
                .setDescription(`${cikismesaj}`)
												try {
                kanal.send({ embeds: [cikismesajs] });
				} catch(err) { }
              } else {
                const normalmesaj = new Discord.EmbedBuilder()
                .setDescription(`📤 | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi kaldı!`)
								try {
                kanal.send({ embeds: [normalmesaj] });
				} catch(err) { }
              }
                }
		
            if(db.fetch(`rcaptcha_${member.guild.id}`)) {
    if(db.fetch(`beklenıyor_${member.guild.id}${member.user.id}`)) return db.delete(`beklenıyor_${member.guild.id}${member.user.id}`)
    if(!db.fetch(`rcaptchaOnaylılar_${member.guild.id}`)) return;  
      
     db.unpush(`rcaptchaOnaylılar_${member.guild.id}`, member.user.id)  
			}

                    let ayrildiLog = db.get(`ayrildiLog_${member.guild.id}`)
                  
                    var data = db.fetch(`ekledi_${member.id}`)
                    if (!data) return;
                  
                    let botsdata = data
                    const unban = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setEmoji("🔓")
                            .setLabel("Banı Kaldır")
                            .setStyle(Discord.ButtonStyle.Danger)
                            .setCustomId("unban_everyone")
                    )
                    const banembed = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle("<:tik:1039607067729727519> | Banlandı!")
                        .setDescription("<@" + member.id + ">, sunucudan ayrıldığı için **botunu** sunucudan banladım!")
                  
                    member.guild.members.ban(botsdata).catch(() => { })
                    try {
                    member.guild.channels.cache.get(ayrildiLog).send({ embeds: [banembed], components: [unban] }).then(mesaj => {
                        db.delete(`ekleniyor_${member.user.id}`)
                        db.set(`user_${mesaj.id}`, member.id)
                    })
                    } catch(err) { }

    //
    }
}