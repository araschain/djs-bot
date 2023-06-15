const Discord = require("discord.js");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const db = require("croxydb");
const moment = require("moment");
const rp = require("../helpers/rcapchta");

module.exports = {
    name: Discord.Events.GuildMemberAdd,

    run: async(client, member) => {
		
		 const giriscikissystem = db.fetch(`canvaskanal_${member.guild.id}`)

    if(giriscikissystem) {
        const giriscikiskanal = member.guild.channels.cache.find(c => c.id === giriscikissystem.channel);

        const Canvas = require("canvas")
                
        const canvas = Canvas.createCanvas(648, 387);
        const ctx = canvas.getContext("2d");
      
        const background = await Canvas.loadImage(
          "https://cdn.discordapp.com/attachments/1059089831604531243/1067877929251508376/gelen.png"
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
      
        const canvasgiris = new AttachmentBuilder(canvas.toBuffer(), { name: 'giris.png' });
      try {
        giriscikiskanal.send({content: `${member} sunucumuza hoşgeldin! Sunucumuz **${member.guild.memberCount}** kişi oldu.`, files: [canvasgiris]});
		} catch(err) { }
        if (member.user.bot) {
        try {
			giriscikiskanal.send(`Bu bir bot, ${member.user.tag}`);
			} catch(err) { }
        }
    }
		
		        const hgbb = db.fetch(`hgbb_${member.guild.id}`)
        const sayacmessage = db.fetch(`sayacmessage_${member.guild.id}`)
        if(hgbb) {
            const kanal = member.guild.channels.cache.find(c => c.id === hgbb.channel);
            if(sayacmessage) {
                const girismesaj = sayacmessage.joinMsg
                .replaceAll("{guild.memberCount}", `${member.guild.memberCount}`)
                .replaceAll("{guild.name}", `${member.guild.name}`)
                .replaceAll("{owner.name}", `<@${member.guild.ownerId}>`)
                .replaceAll("{member}", `<@${member.user.id}>`)
        
                const girismesajs = new Discord.EmbedBuilder()
                .setDescription(`${girismesaj}`)
                try {
            kanal.send({ embeds: [girismesajs] });
			} catch(err) { }
              } else {
                const normalmesaj = new Discord.EmbedBuilder()
                .setDescription(`:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`)
				try {
                kanal.send({ embeds: [normalmesaj] });
				} catch(err) { }
              }
                }
        
        const data = db.fetch(`ekleniyor_${member.user.id}${member.guild.id}`)

        if(member.user.bot) {
            if(data) {
                let useravatar = await client.users.fetch(data.bot);
                let avatar = useravatar.avatar
                let link = "https://cdn.discordapp.com/avatars/" + data.bot + "/" + avatar + ".png?size=1024"
                const embed = new EmbedBuilder()
                .setTitle("<:tik:1039607067729727519> | Bot Onaylandı!")
                .setDescription("<@" + data.bot + "> adlı botun başvurusu kabul edildi!")
                .setThumbnail(link)
                .setColor("Green")

                const user = await member.guild.members.cache.get(data.user);

               const botrole = db.fetch(`botRol_${member.guild.id}`)
                const userrole = db.fetch(`devRol_${member.guild.id}`)

                member.roles.add(botrole)
                user.roles.add(userrole)

                const log = db.fetch(`log_${member.guild.id}`)
                const channel = await member.guild.channels.cache.get(log);
try {
                channel.send({ content: `${user}`, embeds: [embed] })
            } catch(err) { }
			db.delete(`botSira_${member.guild.id}`, 1)
            }
        } 

        const tag = db.get(`ototag_${member.guild.id}`)
        if(tag) {
        member.setNickname(`${tag} | ${member.displayName}`)
		}

                   const acc = member.user.bot ? db.fetch(`botrol_${member.guild.id}`) : db.fetch(`otorol_${member.guild.id}`);
                   if(acc) {
                   member.roles.add(acc).catch(() => {})
				   }


        // captcha sistemi
        if (db.fetch(`rcaptcha_${member.guild.id}`)) {
            const channel = member.guild.channels.cache.get(db.fetch(`rcaptcha_${member.guild.id}`).kanal);
            if (!channel)
                return;


            function randPassword(letters, numbers, either) {
                var chars = [
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                    "0123456789",
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // either
                ];

                return [letters, numbers, either].map(function (len, i) {
                    return Array(len).fill(chars[i]).map(function (x) {
                        return x[Math.floor(Math.random() * x.length)];
                    }).join('');
                }).concat().join('').split('').sort(function () {
                    return 0.5 - Math.random();
                }).join('');
            }
            const random = randPassword(3, 2, 1);

            const attachment = new Discord.AttachmentBuilder(rp(random), { name: `rcaptcha-${member.user.id}.png` });

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId(`benıdogrula_everyone_${member.guild.id}${member.user.id}`)
                        .setLabel("Beni Doğrula")
                        .setEmoji("1026818020120723476")
                        .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                        .setCustomId(`randomGöster_everyone_${member.guild.id}${member.user.id}`)
                        .setLabel("Kodu Görüntüle")
                        .setStyle(Discord.ButtonStyle.Secondary)
                );

            db.set(`beklenıyor_${member.guild.id}${member.user.id}`, random);
			try {
            channel.send({
                content: `<@${member.user.id}>`, embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#36393F")
                        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription('• Merhaba Silex kullanıcısı, seni sunucumuza güvenle alabilmek için altta bulunan yazıyı butona tıklayarak yazman gerekiyor.')
                        .setImage("attachment://rcaptcha-" + member.user.id + ".png")
                        .setTimestamp()
                        .setFooter({ text: member.user.username + " tarafından kullanıldı.", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                ], files: [attachment], components: [row], fetchReply: true
            });
			} catch(err) { }
            //
        }

        const uye = db.fetch(`kayıtlıuye_${member.id}`);

        if (uye) {
            const kayitsistemi = db.fetch(`kayıtsistemi_${member.guild.id}`)
            const registerChannel = await member.guild.channels.cache.find(ch => ch.id === kayitsistemi.kayıtkanal);
            const kayıtlırol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtlırol);
            const kayıtsızrol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtsızrol);
            member.setNickname(`${uye.isim} | ${uye.yas}`);
            await member.roles.add(kayıtlırol);
            await member.roles.remove(kayıtsızrol);
			try {
            registerChannel.send({
                embeds: [
                    {
                        description: `${member} sunucuya tekrar katıldı ve otomatik olarak kaydı yapıldı!`
                    }
                ],
            });
			} catch(err) { }
        }

                  const kayitsistemi = db.fetch(`kayıtsistemi_${member.guild.id}`)

        if(kayitsistemi) {

            const registerChannel = await member.guild.channels.cache.find(ch => ch.id === kayitsistemi.kayıtkanal);
            const kayıtlırol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtlırol);
            const kayıtsızrol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtsızrol);

        member.guild.members.cache.get(member.id).roles.add(kayıtsızrol)
        
        const row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId("kayitol_"+member.user.id)
					.setLabel('Kayıt Ol')
                    .setEmoji('1044325577064190033')
					.setStyle(Discord.ButtonStyle.Secondary),
			);
            try {
        registerChannel.send({ content: `${member}`, embeds: [
            {
                description: `<:giris:1041737371131056218> | Seni aramızda görmekten mutluluk duyuyoruz!\n\n<:bot:1039607042291269703> | Sunucumuza katılan **${member.guild.memberCount}.** üyesin.\n\n<:guardian:1044325535800635422> | Hesabın <t:${parseInt(member.user.createdTimestamp  / 1000)}:R> açılmıştır.\n\n<:uyari:1040649846400499712> | Sunucumuzun kurallarını okumayı unutma iyi eğlenceler.`
            }
        ], components: [row] })
    } catch(err) { }

    }// 
	
	    const hesapKoruması = db.fetch(`hesapkoruma_${member.guild.id}`)
		const logChannel = await member.guild.channels.cache.find(ch => ch.id === hesapKoruması.channel);
    if(hesapKoruması) {

        const now = new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime() < 1296000000

        if(now) {


			member.kick();
			try {
				logChannel.send({ 
					embeds: [
					new EmbedBuilder()
                    .setDescription(`⚠️ | **${member.user.tag}**, Hesabı yeni olduğu için sunucudan atıldı.`).setColor(`#FEE75C`).setFooter({ text: `${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) 
                })
					]
				 })
				 } catch(err) { }


		}

    }

}
}