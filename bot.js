const Discord = require('discord.js');
const client = new Discord.Client();
const skills = require('./skills.json');

client.on('ready', () => {
    console.log('I am ready!');
});

function skillEmbed(skill) {
    var requirements = "";
    skill.requirements.forEach(function(requirement) {
        requirements += (requirement.level + " " + requirement.name + " ").trim();
    });

    const description = [
        "**Element(s):** " + skill['elements'].join(', '),
        "**Level:** " + skill['level'],
        "**Requirements:** " + requirements,
        "**Description:** " + skill['description'],
        "**One Shots: ** " + oneshots
    ];
    return {
        "title": skill.name,
        "description": description.join('\n'),
        "url": "http://carpsgame.com/printable%20forms/Carps%20V6.35.pdf",
        "timestamp": new Date(),
        "footer": {
            "icon_url": "http://wiki.carpsgame.com/static/images/favicon.png",
            "text": "CARPS v6.35"
        },
        "thumbnail": {
            "url": "http://wiki.carpsgame.com/static/images/favicon.png"
        },
        "author": {
            "name": "CARPS Skill Bot",
            "url": "https://discordapp.com",
            "icon_url": "http://wiki.carpsgame.com/static/images/favicon.png"
        }
    };
}

client.on('message', message => {
    const commandRegex = /\/skill\s+(.+)/g;
    const matches = commandRegex.exec(message.content);
    if (matches) {
        var skill = skills[matches[1].toLowerCase()];
        if (skill) {
            const embed = skillEmbed(skill);
            message.channel.send('Skill Info', { embed });
        } else {
            message.reply("Could not find skill with name '" + matches[1] + "'")
        }
    }
});

client.login('Mzc5MzY2ODU5NzM4MTg1NzMw.DOpAgw.nulOUw6I_QHndY9-LPMJBxXhfmg');
