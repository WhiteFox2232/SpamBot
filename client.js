const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require("./config.json");
const botPrefix = config.prefixe // prefix

// EMBED :

const notPermissionEmbed = new MessageEmbed()
    .setColor('#eb090d')
    .setTitle(`❌ Vous n'avez pas la permission d'utiliser cette commande ! `)

const commandDetectedEmbed = new MessageEmbed()
    .setColor('#2308d1')
    .setTitle(`✅ Commande détectée, le spam va commencer ! `)

const emergencyStopEmbed = new MessageEmbed()
    .setColor('#7a0404')
    .setTitle(`⚠️ Arrêt d'urgence ! `)

// END EMBED

for (let i = 0; i < config.token.length; ++i) {

    let client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
    client.once('ready', () => {
      console.log(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
│    Logged in as ${client.user.tag} ==> ✔️        │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);

      client.user.setActivity(config.activity.message, {
        type: config.activity.type,
      });
    });

    client.on('messageCreate', msg => {
      if (msg.content.startsWith(config.command)) {
        if (msg.author.id !== config.whitelist)
            return msg.channel.send({ embeds: [notPermissionEmbed] });
        console.log(`Spam Command Detected`);
        msg.channel.send({ embeds: [commandDetectedEmbed] }); // confirmer que la commande a bien été détéctée.
        let yourmessage = msg.content.slice(config.command.length);
        var i;

        for (i = 0; i < config.spam_number; i++) {
            setTimeout(() => {
                msg.channel.send(yourmessage)
            }, config.delay)
        }
      }
    });

    client.on('messageCreate', msg => {
      if (msg.content === '.stop') {
        if (msg.author.id !== config.whitelist)
            return msg.channel.send({ embeds: [notPermissionEmbed] });
        console.log(`Emergency Stop Command Detected`);
        msg.channel.send({ embeds: [emergencyStopEmbed] }); // confirmer que la commande a bien été détéctée
          setTimeout(() => {
              process.exit(1);
          }, 1000)
      }

      if (msg.content.startsWith(config.commandMP)) {
        if (msg.author.id !== config.whitelist)
            return msg.channel.send({ embeds: [notPermissionEmbed] });
        console.log(`Spam DM Command Detected`);
        msg.channel.send({ embeds: [commandDetectedEmbed] }); // confirmer que la commande a bien été détéctée.
        let messageArray = msg.content.split(' ')
        let args = messageArray.splice(1)
        let yourmessage2 = args.slice(1).join(" ");
        let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
        var i;

        for (i = 0; i < config.spam_number; i++) {
            setTimeout(() => {
                user.send(yourmessage2)
            }, config.delay)
        }
      }
    });
    client.login(config.token[i]); // Client Token

}
