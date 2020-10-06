const sortObj = require("../utils/sortobj.js")
const fetch = require('node-fetch');

module.exports = (client, target, context, msg, self) => {
    let url = 'https://mygeoangelfirespace.city/db/rap_sheet.json';
    var outputStr = "The biggest stealers are:"

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            var data = out

            var { rap_sheet } = data
            var usrobj = Object.values(rap_sheet)
            var userarray = new Array(usrobj);
            var rodobj = {}


            userarray.forEach(item => {
                item.forEach(obj => {
                    var { user } = obj

                    if (user != (null || "800807") {
                        var current = user
                        if (!(current in rodobj)) {
                            rodobj[current] = 0
                        }
                        rodobj[current] += 1
                    }

                })
            });

            var limit = 5;
            var outputobj = {}
//badly hardcoded valy causing an issue now that a user has a higher conviction rate
            rodobj = sortObj(rodobj, 200);

            Object.entries(rodobj).forEach(([key, value]) => {
                if (limit > 0) {
                    outputobj[key] = value;
                    outputStr += ` ${key} : ${value} |`
                    limit -= 1
                }

            });

            client.say(target, outputStr);
            outputStr = "The biggest stealers are:"
        })
        .catch(err => { console.error(err) })

}


