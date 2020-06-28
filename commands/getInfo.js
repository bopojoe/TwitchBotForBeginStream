const fetch = require('node-fetch');
module.exports = (client, target, context, msg, self) => {
    var strings = msg.split(" ")
    if (strings.length > 1) {
        var requestedUser = strings[1].toLowerCase()

        let url = 'https://mygeoangelfirespace.city/db/users.json';

        fetch(url)
            .then(res => res.json())
            .then((out) => {
                // console.log('Checkout this JSON! ', out);
                var data = out

                var { users } = data
                var usrobj = Object.values(users)
                var userarray = new Array(usrobj);
                var highest = ""
                var points = 0
                var sounds = 0
                var cred = 0

                userarray.forEach(item => {
                    item.forEach(obj => {
                        var { name, cool_points, street_cred } = obj
                        if (name === requestedUser) {
                            highest = name;
                            points = cool_points;
                            cred = street_cred;
                        }
                    })
                });
                fetch("https://mygeoangelfirespace.city/db/commands.json")
                    .then(res => res.json())
                    .then((out) => {
                        // console.log('Checkout this JSON! ', out);
                        var data = out

                        var { commands } = data
                        var cmdobj = Object.values(commands)
                        var commandarray = new Array(cmdobj);


                        commandarray.forEach(item => {
                            item.forEach(obj => {
                                var { permitted_users } = obj
                                if (permitted_users.includes(requestedUser)) {
                                    sounds += 1;
                                }
                            })
                        });
                        console.log("tested")

                        var val = `${highest} | coolpoints: ${points} | sounds: ${sounds} | Street Cred: ${cred} |`
                        client.say(target, val);
                    })
                    .catch(err => { console.error(err) })
                // client.say(target, "tested");


            })
            .catch(err => { console.error(err) })
        // client.say(target, "tested");
        console.log("tested")
    } else {
        client.say(target, "To use this command please say !!getinfo name");
    }
}