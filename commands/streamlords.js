const fetch = require('node-fetch');
module.exports = (client, target, context, msg, self) => {
    let wait = require("../utils/wait")
    let url = 'https://mygeoangelfirespace.city/db/notifications.json';
    var people = new Array()
    var lords = new Array()
    var currentStreamlords = [
        "strager",
        "zanuss",
        "nomorequity",
        "beginbot",
        "cachesking",
        "waleeboy",
        "arbaya",
        "baldclap",
        "detlion1643",
        "disk1of5",
        "eatpizza22",
        "hellsridge",
        "isidentical",
        "kiekaemodaiwieco",
        "mondaynightfreehotdogs",
        "sketchyscripts",
        "spfar",
        "sweeku",
        "tramstarzz",
        "usuallyhigh",
        "vivax3794",
        "zerostheory",
        "andrelamus",
        "syoonee",
        "loner_lena",
        "aquafunkalisticbootywhap",
        "usernamesarelame",
        "biged_twitch",
        "punchypenguin",
        "rockerboo",
        "airtonzanon",
        "pedrovalentimmm",
        "eleentje",
        "rednave21"
    ]

    const currentStreamgods = ["stupac62",
    "artmattdank",
    "syoonee",
    "sunny_ai"]

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            var data = out

            var { notifications } = data
            var notobj = Object.values(notifications)
            var notifarray = new Array(notobj);
            
            var points = 0

            notifarray.forEach(item => {

                item.forEach(obj => {
                    var { message } = obj
                    var temp =  message.split(":")
                    message = temp[0]
                    if (!people.includes(message) && currentStreamlords.includes(message) ) {
                        people.push(message)
                    }
                    if (!lords.includes(message)&& currentStreamgods.includes(message) ) {
                        lords.push(message)
                    }
                })
            });
            var val = `Streamlords that have been active today are ${people}`
            var valTwo = `Streamgods that have been active today ${lords} :)`
            client.say(target, val);
            wait(3000)
            client.say(target, valTwo);
        })
        .catch(err => { console.error(err) })
}