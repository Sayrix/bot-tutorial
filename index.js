const Discord = require('discord.js'),
config = require('./config.json'),
prefix = config.prefix,
bot = new Discord.Client();

bot.on("ready", ()=> {
    bot.user.setActivity('Les papillons', {type: "LISTENING"});
    console.log("Pret !")
});

bot.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const cmd = message.content.split(' ')[0].slice(prefix.length);
    const args = message.content.split(' ').slice(1);

    if (cmd === "ping") {
        message.channel.send(`${bot.ws.ping}ms`);
    }
});

bot.login(config.token);
