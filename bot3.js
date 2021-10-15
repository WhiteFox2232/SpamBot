const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const botPrefix = config.prefixe // prefix
const token = config.token.token3; // Token du bot

client.once('ready', () => {
  console.log(`[I]Bot 1 Started[I]`);
  client.user.setActivity(config.activity.message, {
  type: config.activity.type,
  url: config.activity.url
});
});


client.on('message', msg => {

  if(msg.content.startsWith(config.command)){
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

client.login(token)