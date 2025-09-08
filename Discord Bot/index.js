const {Client, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', message => {
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url = message.content.split('create')[1];
        return message.reply({
            content: "Generating short id for " + url,
        })
    }
    message.reply({
        content: 'Hii From Bot'
    })
});

client.login(
    CLIENT_TOKEN
);

client.on('interactionCreate', (interaction) => {
    interaction.reply('Pong!')
})