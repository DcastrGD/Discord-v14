const Discord = require('discord.js');
const {Client, GatewayIntentBits } = require('discord.js');
const client = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildPresences
    ]
  })

// Estructura handler para las carpetas de comandos

const fs = require('fs');
client.commands = new Discord.Collection();
const carpeta = 'commands'; 
fs.readdirSync(`./${carpeta}/`).forEach((dir) => {
const commands = fs.readdirSync(`./${carpeta}/${dir}/`).filter((file) => file.endsWith(".js"));
for (let file of commands) {
  let command = require(`./${carpeta}/${dir}/${file}`);
  client.commands.set(command.name, command)
}
});

// Cliente encendedor para los comandos y el bot

client.on('messageCreate', async (message) => {

  let prefix = ''; // Prefix del bot que va llevar, para su llamado

  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()

  // Apartado dónde van los comandos en el index

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
  cmd.execute(client, message, args)
}

})

// Logueo del bot + poner el token, entre ""

client.login();  
