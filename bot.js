const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;

var bot = new Discord.Client();

// Events.
bot.on("ready", function() {
    bot.user.setActivity('x-help | Xanoria V1.5', { type: 'STREAMING' });
    console.log(`${bot.user.username} est Prêt!`);
});

bot.on("message", function(message) {

    if (message.author.bot) return;

    if (!message.guild) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

// Commands.
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setAuthor("💬 Liste des Commandes.")
            .addField(" - avatar", "Affiche ton avatar(non fonctionnel pour l'instant).")
            .addField(" - ping", "PING PONG.")
            .addField(" - ip", "Affiche l'IP et le Port du serveur.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2019-2020 Xanoria.", bot.user.displayAvatarURL);
        var embedhelpadmin = new Discord.RichEmbed()
            .setAuthor("💬 Commandes de Modération.")
            .addField(" - clear", "Clear jusqu'à **99** Messages.")
            .addField(" - kick", "Expulser un membre du serveur.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2019-2020 Xanoria.", bot.user.displayAvatarURL);
            message.channel.send(embedhelpmember);
            message.channel.send(embedhelpadmin);
    };
   
    if (command == "ip") {

        var embedserverip = new Discord.RichEmbed()

            .setAuthor(">>Xanoria SkyBlock<<")

            .addField("🛰️IP:", "game01.ouiheberg.com")

            .addField("⛏️Port:", "25554")
        
            .addField("📡État:", "En maintenance")
        
            .addField("<:minecraftpe:656810065843716106>Minecraft:", "1.14")
        
            .addField("<:pixelogo:638057582237319169>Version:", "V1.5")
        
            .addField("🌴Vote:", "https://minecraftpocket-servers.com/server/89478/")
        
            .setColor(0x00FFEE)

            .setFooter("Ⓒ 2019-2020 Xanoria.", bot.user.displayAvatarURL);

        
            message.channel.send(embedserverip);

        

    };

    if (command == "avatar") {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send({
               embed: {
                  title: `${member.displayAvatarURL}'s Profile Picture.`,
                  image: {
                      url: member.AvatarURL
                  },
                  color: 0x00FFEE
               }
        })
    };

    if (command == "ping") {
        message.channel.send("**:ping_pong: PONG!**");
    };
    
    if (command == "test") {
        message.channel.send("**pas de test pour l'instant**");
    };

    if(command === "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Sorry, you can't do that.**");
        var messagesToDelete = args[1];
        if (!args[1]) return message.channel.send("❌ Merci de donner le nombre de messages à Clear.");

        if (args[1] > 99) return message.channel.send("❌ Je ne peux pas Clear Plus de 99 Messages.");
        message.channel.fetchMessages({limit: messagesToDelete})
        .then(messages => message.channel.bulkDelete(messages.size + 1))
        .catch(error => message.channel.send(`❌ Désolé ${message.author}, Échec du Clear car: *${error}*.`));
    };

    if(command == "kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ Merci de **@mention** la personne à Expulser!");
        let kReason = args.join(" ").slice(0);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Désolé, tu ne peux pas faire ça.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Échec du Kick, j'ai besoin d'un rôle plus haut.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kicked**")
        .setColor(0x00FFEE)
        .addField("Personne", `${kUser}`)
        .addField("Modérateur", `<@${message.author.id}>`)
        .addField("Raison", `**\`\`\`${kReason}\`\`\`**`);
    
        let adminlog = message.guild.channels.find(`name`, "logs");
        if(!adminlog) return message.channel.send("❌ Désolé, j'ai besoin de me connecter dans un channel de logs.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };

});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
