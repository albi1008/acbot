const Discord = require('discord.js')
const mySecret = process.env['TOKEN']
ig = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')
const keepAlive = require('./server');
const mongoose = require('mongoose')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); 

mongoose.connect('mongodb+srv://admin:admin@cluster0.bum0f.mongodb.net/test?authSource=admin&replicaSet=atlas-u8j8d9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {

useUnifieldTopology : true,
useNewUrlParser: true,
}).then(console.log('connesso al db!'))

const prefix = process.env.PREFIX;
const ownerID = process.env.OWNERID;



client.on("message", message => {
    if (message.content.startsWith("^userinfo")) {
        if (message.content == "^userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("Status", "```" + utente.user.presence.status + "```", true)
            .addField("Is a bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account created", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Joined this server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permissions", "```" + elencoPermessi + "```", false)
            .addField("Roles", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send(embed)

    }
});


client.once('ready', () => {
    console.log('Ready.')
    //Below Status
    client.user.setActivity('Arcanyc Network' , { type: "PLAYING" }) // Can Be WATCHING, STREAMING, LISTENING
    
    //Below Auto-Changing Status
    setInterval(() => {
        const statuses = [
            `a/help`,
            `developed by AC | Albi1008#7787`,
            `per ora sono in ${client.guilds.cache.size} server`,
            `Enjoy!`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "PLAYING"}) // Can Be WATCHING, STREAMING, LISTENING
    }, 5000) 

});


  client.on("guildMemberAdd", (member) => {
client.channels.cache.get("798285271958945862").send("Benvenuto " + member.toString() + " su " + member.guild.name + " sei il " + member.guild.memberCount + "° membro");
  var role = member.guild.roles.find('name', 'user');
  member.addRole(798285647369601025);

client.on("guildMemberRemove", (member) => {
client.channels.cache.get("843938454198157374").send("Arrivederla! " + member.toString());
})


  command(client, 'help', (message) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Arcanyc Network')
      .setAuthor(message.author.username)
      .setFooter('Arcanyc Network')
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'membri',
          value: 'a/membri, il bot ti dice quanti membri hanno i server in cui è presente il nostro bot',
          inline: true,
        },
         {
          name: 'clear channel',
          value: '"Solo admin"',
          inline: false,
        },

        {
          name: 'inviti',
          value: 'a/inviti, ti manda gli inviti del server e del bot',
          inline: false,
        },
        {
          name: 'sito',
          value: 'a/sito, il bot ti manda il link del sito di Arcanyc',
          inline: false,
        },

         {
          name: 'user info',
          value: 'a/sito, il bot ti manda il link del sito di Arcanyc',
          inline: false,
        },

          {
          name: 'dashboard',
          value: '**COMING SOON**',
          inline: false,
        },
        {
          name: 'Fai una Partner!',
          value: 'Chiedi al addetto partner o a qualche staffer!',
          inline: false,
        }
      )

    message.channel.send(embed)
  })
})

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'membri', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `  ${guild.name}:  ${guild.memberCount} membri`
      )
    })
  })


  command(client, 'sito', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `sito ufficiale di arcanyc: http://www.arcanyc.tk/`
      )
    })
  })



  command(client, 'inviti', (message) => {
      message.reply(
        `invito arcanyc: https://discord.gg/kBYgKRcpPq invito bot: https://discord.com/api/oauth2/authorize?client_id=840927724452577311&permissions=275967092&scope=bot`
      )
    })
  

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

client.on('message', message => {
	if (message.content === 'salve') {
		message.react('🤚');
	}
});
client.on('message', message => {
	if (message.content === 'partner') {
		message.reply('**PER PARTNER**                                                                         1. Chiedi allo staff o al gestore partner                                                                      2. copia il nostro testo                                                                                                 3. metti il nostro testo sul tuo server e noi sul nostro                                                4. Partner effettuata'); 
	}
});

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

    if (cmd === '^poll'){
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        let embedPoll = new Discord.MessageEmbed()
        .setTitle('😲 Nuovo sondaggio 😲')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }

})

client.on('message', message => {
    if (message.channel.type == "dm") return
  const args = message.content.split(" ").slice(1);
  if(message.content.startsWith('a/say')) {
     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(":❌: Non hai il permesso :❌:");
      return;
     }
      message.delete({timeout: 10})
      var saytext = args.join(" ");
      message.channel.send(saytext)
  };
})

client.on("message", message => {
    if (message.content == "!ciao") {
        message.channel.send("Clicca sulla reazione per aprire un ticket")
            .then(msg => msg.react("📩")) //Personalizzare l'emoji della reaction
    }
})


client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "📩") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == "806975463829929995") { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("830531292789211236") //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
                canale.send("`Arcanyc`Grazie per aver aperto un ticket lo staff sarà al più presto da te")
            })
        }
    }
})

client.on("message", message => {
    if (message.content == "a/close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }

    if (message.content.startsWith("a/add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("a/remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }

                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })

                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})


keepAlive();
client.login(process.env.TOKEN)











