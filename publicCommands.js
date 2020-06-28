module.exports = (client, target, context, msg, self) => {
    if (msg.startsWith("!!public")) {
        client.say(target, "Current Public commands are: !!public - shows public commands | !!getinfo - shows data from db 'users' site");
    }
}
