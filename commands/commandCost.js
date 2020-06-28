const fetch = require('node-fetch');
module.exports = (client, target, context, msg, self) => {

    var strings = msg.split(" ")
    if (strings.length > 1) {
        var requestedcmd = strings[1].toLowerCase()
        console.log(requestedcmd)

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

                        if (name == requestedcmd) {
                            cmdcost = cost;
                            console.log(`cost is ${cost}`)
                        }
                    })
                });
                outputtext = `@${context.username} the command ${requestedcmd} costs ${cmdcost}`
                console.log("before return in cmdcost")
                return cmdcost

            })
            .catch(err => { console.error(err) })
        console.log("after return in cmdcost")
    }
}