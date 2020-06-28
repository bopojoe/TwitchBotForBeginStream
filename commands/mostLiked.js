const sortObj = require("../utils/sortobj.js")
const fetch = require('node-fetch');

module.exports = (client, target, context, msg, self) => {
    let url = 'https://mygeoangelfirespace.city/db/users.json';

    outputStr = "Top 5 most liked users are:"
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            // console.log('Checkout this JSON! ', out);
            var data = out

            var { users } = data
            var usrobj = Object.values(users)
            var userarray = new Array(usrobj);
            var rodobj = {}


            userarray.forEach(item => {
                item.forEach(obj => {
                    var { ride_or_die } = obj

                    if (ride_or_die != null) {
                        var current = ride_or_die
                        if (!(current in rodobj)) {
                            rodobj[current] = 0
                        }
                        rodobj[current] += 1
                    }

                })
            });

            var limit = 5;
            var outputobj = {}

            rodobj = sortObj(rodobj, 10);

            Object.entries(rodobj).forEach(([key, value]) => {
                if (limit > 0) {
                    outputobj[key] = value;
                    outputStr += ` ${key} : ${value} |`
                    limit -= 1
                }

            });

            client.say(target, outputStr);


        })
        .catch(err => { console.error(err) })
}