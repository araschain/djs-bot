const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")
const fs = require("fs");
const db = require('croxydb')
const config = require("./config.json");

const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");

const client = new Discord.Client({
	intents:  3276543,
    partials: Object.values(Discord.Partials),
	allowedMentions: {
		parse: ["users", "roles", "everyone"]
	},
	retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

/*                         SLASH COMMANDS                               */

console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`)

for(let commandName of fs.readdirSync("./commands")) {
	if(!commandName.endsWith(".js")) return;

	const command = require(`./commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description.toLowerCase(),
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

/*                         EVENTS                                    */

console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`)

for(let eventName of fs.readdirSync("./events")) {
	if(!eventName.endsWith(".js")) return;

	const event = require(`./events/${eventName}`);	
	const evenet_name = eventName.split(".")[0];

	client.on(event.name, (...args) => {
		event.run(client, ...args)
	});

	console.log(`[+] ${eventName} olayı başarıyla yüklendi.`)
}

/*                     LOADING SLASH COMMANDS                     */

//

client.once("ready", async() => {
	const rest = new Rest.REST({ version: "10" }).setToken(config.token);
  try {
    await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
      body: client.commands,  //
    });
  } catch (error) {
    throw error;
  }
});

client.login(config.token).then(() => {
	console.log(`[-] Discord API'ye istek gönderiliyor.`);
	eval("console.clear()")
}).catch(() => {
	console.log(`[x] Discord API'ye istek gönderimi başarısız.`);
});