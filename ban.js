const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  try {
    let reason = "No reason given"
    if(args[1]) reason = args.slice(1).join(' ')
    const member = message.mentions.members.first();
    const permission = message.member.permissions.has("BAN_MEMBERS");

    if (!permission) return message.reply("You don't have permission to use this command");
    if (!args[0]) return message.reply(`Please specify someone`);
    if (!member) return message.reply(`Cannot find that member...`);
    if (member.id === message.author.id) return message.reply(`You cannot ban yourself!`);
    if (message.member.roles.highest.position < member.roles.highest.position) return message.reply(`You cannot ban user who have higher role than you...`);
    if (!member.bannable) return message.reply(`I cannot ban that member`);
    
    await member.ban({ reason: `Banned by ${message.author.username}(${message.author.id}) for: ${reason}` }).catch(e => {{
      return message.channel.send({ content: `There was an error couldn't ban this user` })
    }})
    
    let bannedEmbed = new Discord.MessageEmbed()
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
    .setFooter({ text: `${message.member.user.username}`, iconURL: `${message.member.user.avatarURL()}`})
    .setTimestamp()
    .setColor('RANDOM')
    .setTitle(`${member.user.username} has been banned`)
    .setDescription(`**Reason: **${reason}`)
   
    return message.reply({ embeds: [bannedEmbed] }).then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    })

  } catch (e) {
    console.log(e)
    console.log(e.message) 
  }
}

module.exports.help = {
  name:"ban",
  description: "Ban a member from the guild",
  catagory: "Moderation",
  usage: "ban <member>",
  example: "ban @example#0001",
  ver: "1.0.0"
}
