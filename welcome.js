module.exports = (client) => {
    const channelId = '798285271958945862' // welcome channel
    const targetChannelId = '808740528127737877' // rules and info
  
    client.on('guildMemberAdd', (member) => {
      const message = `Please welcome <@${
        member.id
      }> to the server! Please check out ${member.guild.channels.cache
        .get(targetChannel)
        .toString()}`
  
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
    })
  }