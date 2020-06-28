const commandcost = require("./commands/commandCost.js")
const fetch = require('node-fetch');
function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

module.exports = (client, target, context, msg, self, msgContents) => {

    var commandName = ""
    // " @bopojoe_ gave 1 Street Cred to @zanuss"
    // "@cykablondesbot - Mana: 3 | Street Cred: 3 | Cool Points: 0 | Wealth: 7 | Insured: False | https://mygeoangelfirespace.city/cykablondesbot.htm"
    if (msgContents.length >= 3) {
        commandName = msgContents[3]
        let url = 'https://mygeoangelfirespace.city/db/commands.json';
        var outputtext = ""


        fetch(url)
            .then(res => res.json())
            .then((out) => {
                // console.log('Checkout this JSON! ', out);
                var data = out
                var { commands } = data
                var cmdobj = Object.values(commands)
                var cmdarray = new Array(cmdobj);
                var cmdcost = 0


                cmdarray.forEach(item => {
                    item.forEach(obj => {
                        var { name, cost } = obj

                        if (name == commandName) {
                            cmdcost = cost;
                            console.log(`cost is ${cost}`)
                        }
                    })
                });
                console.log("before return in cmdcost")
                if (cmdcost <= parseInt(msgContents[2])) {
                    console.log("insile if")
                    client.say(target, `!buy ${commandName}`)
                    console.log("first wait")
                    wait(7000);
                    client.say(target, `!transfer ${context.username} ${commandName}`)
                    console.log("2nd wait wait")
                    wait(7000);
                    client.say(target, `Thanks for your business @${context.username}`)

                } else {
                    client.say(target, `Thanks for the props @${context.username}`)
                }

            })
            .catch(err => { console.error(err) })
        console.log(commandName)



    }
}