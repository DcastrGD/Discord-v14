const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
  name: "", // Nombre que va llevar el comando
  alias: [""], // Distintos nombres que va llevar el comando
usage: "Añade lo que quieras",
  desc: "", // Descripción del lo que hace el comando en general

 async execute (client, message, args) {

    const row = new ActionRowBuilder()
    .addComponents(

        new SelectMenuBuilder()
        .setPlaceholder(``) // Descripción del select menu a la hora de elegir
        .setCustomId("") // Poner id del componente
        .setOptions([

           {
              value: "Información",
              label: "Información",
              description: "Información de lo que quieras",
              emoji: "📌" 
           },
        /* {
              value: "", Nombre de lo que queremos almacenar
              label: "", Lo que va llevar el título
              description: "", Descripción de lo que hace
              emoji: "" Emojis
            } */  
  
        ])
  
        
    )
  
  // Embeds para las distintas categorías
  
  const guild = message.guild

  const Información = new EmbedBuilder()
  .setColor(0xFF0000)
  .setTitle("Ejemplo")
  .setDescription("Ejemplo")
  .setThumbnail('Ejemplo')
  .addFields(
		{ name: 'Ejemplo', value: 'Ejemplo', inline: false},
		{ name: 'Ejemplo', value: 'Ejemplo', inline: false },
		{ name: 'Ejemplo', value: 'Ejemplo', inline: false },
	)
  .setFooter({ text: 'Ejemplo' })

// Esta parte es lo primero que se va ejecitar, lo primero que va a salir del comando
    const m = await message.channel.send({ embeds: [Información], components: [row]})

// Lo que hace esto es crear un filtro, que a su vez todo el mundo puede interactuar con el selectMenú 
    const ifilter = m => m.user.channel === message.author.channel;
  
    const collector = m.createMessageComponentCollector({ filter: ifilter}) 
  
    collector.on("collect", async suge => {
        if(suge.values[0] === "Información"){ 
          await suge.deferUpdate()
       return suge.editReply({ embeds: [Información], ephemeral: true}) 
        }
      })

     /* collector.on("collect", async suge => {
        if(suge.values[0] === ""){ Nombre de lo que va llevar la variable value del componente
          await suge.deferUpdate()
       return suge.editReply({ embeds: [], ephemeral: true}) // Nombre de la variable embed
        }
      }) */
  }

}