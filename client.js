const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const config = require("./config.json");
const botPrefix = config.prefixe // prefix

for (let i = 0; i < config.token.length; ++i) {

    let client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
    client.once('ready', () => {
      console.log(`[I]Bot ` + i + ` Started[I]`); // Bot identity
      client.user.setActivity(config.activity.message, {
        type: config.activity.type,
      });
    });

    client.on('messageCreate', msg => {
      if (msg.content.startsWith(config.command)) {
        if (msg.author.id !== config.whitelist)
            return;
        console.log(`[!].spam detected[!]`);
        let yourmessage = msg.content.slice(config.command.length); 
        var i;
        
        for (i = 0; i < config.spam_number; i++) {
            setTimeout(() => {
                msg.channel.send(yourmessage)
                console.log(`Spam Send`); 
            }, config.delay)  
        }
      }
    });

    client.on('messageCreate', msg => {
      if (msg.content === '.stop') {
        if (msg.author.id !== config.whitelist)
            return;
        msg.delete()
        process.exit(1);
      }

      if (msg.content.startsWith(config.commandMP)) {
        if (msg.author.id !== config.whitelist)
            return;
        let messageArray = msg.content.split(' ')
        let args = messageArray.splice(1)
        console.log('[!].spam detected[!]');
        let yourmessage2 = args.slice(1).join(" ");
        let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
        var i;

        for (i = 0; i < config.spam_number; i++) { 
            setTimeout(() => {
                user.send(yourmessage2)
                console.log('Spam DM Send');
            }, config.delay) 
        }
      }
    });
    client.login(config.token[i]); // Client Token 

}