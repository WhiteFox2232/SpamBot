const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const botPrefix = config.prefixe // prefix
const token = config.token.token1; // Token du bot

client.once('ready', () => {
  console.log(`[I]Bot 1 Started[I]`);
  client.user.setActivity(config.activity.message, {
  type: config.activity.type,
});
});

client.on('message', msg => {

  if(msg.content.startsWith(config.command)){
    if (msg.author.id !== '740900329213657089') return;
    console.log(`[!].spam detected[!]`);
    let yourmessage = msg.content.slice(config.command.length); 
    var i;
    
    for (i = 0; i < config.spam_number; i++) { // 100 à remplacer par le nombre de message à mettre
    setTimeout(() => {
       msg.channel.send(yourmessage)
       console.log(`Spam Send`);
    },config.delay) //3 secondes
    }
    
  }
  
});

client.on('message', msg => {
  
  if (msg.content === '.stop') {
    if (msg.author.id !== '740900329213657089') return;
    msg.delete()
  
    process.exit(1);
  
  } 

  if(msg.content.startsWith(config.commandMP)){
    if (msg.author.id !== '740900329213657089') return;
    let messageArray = msg.content.split(' ')
    let args = messageArray.splice(1)
    console.log('[!].spam detected[!]');
    let yourmessage2 = args.slice(1).join(" ");
    let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
    var i;

    for (i = 0; i < config.spam_number; i++) { // 100 à remplacer par le nombre de message à mettre
    setTimeout(() => {
       user.send(yourmessage2)
       console.log('Spam DM Send');
    },config.delay) //3 secondes
    }


  }

});


client.login(token) 
