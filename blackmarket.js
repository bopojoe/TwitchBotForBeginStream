const fetch = require('node-fetch');
const wait = require("./utils/wait.js")

module.exports = (client, target, user, requestedCmd, ammount) => {

    // " @bopojoe_ gave 1 Street Cred to @zanuss"
    // "@cykablondesbot - Mana: 3 | Street Cred: 3 | Cool Points: 0 | Wealth: 7 | Insured: False | https://mygeoangelfirespace.city/cykablondesbot.htm"

    let url = 'https://mygeoangelfirespace.city/db/commands.json';


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

                    if (name == requestedCmd) {
                        cmdcost = cost;
                        console.log(`cost is ${cost}`)
                    }
                })
            });
            if (cmdcost <= ammount) {
                client.say(target, `!buy ${requestedCmd}`)
                wait(7000);
                client.say(target, `!transfer ${user} ${requestedCmd}`)
                console.log("2nd wait wait")
                wait(7000);
                client.say(target, `Thanks for your business @${user}`)

            } else {
                client.say(target, `Thanks for the props @${user}`)
            }

        })
        .catch(err => { console.error(err) })



} 
