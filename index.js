const Discord = require('discord.js'),
config = require('./config.json'),
prefix = config.prefix,
bot = new Discord.Client();

bot.on("ready", ()=> {
    bot.user.setActivity('Les papillons', {type: "LISTENING"});
    console.log("Pret !")
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;

    const cmd = message.content.split(' ')[0].slice(prefix.length);
    const args = message.content.split(' ').slice(1);

    if (cmd === "ping") {
        message.channel.send(`${bot.ws.ping}ms`);
    };

    if (cmd === "clear") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission requise');
        if(!args[0]) return message.channel.send('Veuillez écrire un nombre entre 1 et 100');
        if(args[0] === "0") return message.channel.send('Veuillez écrire un nombre entre 1 et 100');

        let messageDelete = parseInt(args[0]);
        if (messageDelete > 99) messageDelete = 99;
        let messages = await message.channel.messages.fetch({limit: 100});
        message.channel.bulkDelete(messages);
    }

    if (cmd === "help") {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Help`, bot.user.avatarURL())
        .setThumbnail(bot.user.avatarURL())
        .setDescription(`Nombre de commande : \`3\``)
        .addField("Liste :", "`ping`, `clear`, `help`")
        .addField("qsfdqsdf", "dfsdfsdf", true)
        .addField("qtyhdj", "qfieuzsh", true)
        .setTimestamp()
        .setFooter('Bonsoir', bot.user.avatarURL())
        .setImage(bot.user.avatarURL())
        message.channel.send(embed)
    }
});

bot.on("guildMemberAdd", member => {
    let embed = new Discord.MessageEmbed()
    .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    .setAuthor(`👋 ${member.user.username} a rejoint le serveur !`, member.user.displayAvatarURL())
    .setColor('00ff80')
    member.guild.channels.cache.get('channel_id').send(embed);
    member.send(`Bienvenue sur le serveur ! Grâce à toi nous sommes **${member.guild.memberCount}**`);
    member.roles.add('roles_id');
})

bot.on("guildMemberRemove", member => {
    let embed = new Discord.MessageEmbed()
    .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    .setAuthor(`😢 ${member.user.username} a quitté le serveur...`, member.user.displayAvatarURL())
    .setColor('ff3030')
    member.guild.channels.cache.get('channel_id').send(embed);
})

bot.login(config.token);
