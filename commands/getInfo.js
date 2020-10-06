const fetch = require('node-fetch');
const wait = require("../utils/wait")
module.exports = (client, target, context, msg, self) => {
    var strings = msg.split(" ")
    if (strings.length > 1) {
        var requestedUser = strings[1].toLowerCase()
        var highest = ""
        var points = 0
        var sounds = 0
        var cred = 0
        var standing = "Fence Sitter"

        let url = 'https://mygeoangelfirespace.city/db/users.json';

        fetch(url)
            .then(res => res.json())
            .then((out) => {
                var data = out

                var { users } = data
                var usrobj = Object.values(users)
                var userarray = new Array(usrobj);


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
                        var val = `${highest} | coolpoints: ${points} | sounds: ${sounds} | Street Cred: ${cred} | Current Standing: ${standing}`
                        client.say(target, val);
                    })
                fetch("https://mygeoangelfirespace.city/db/votes.json")
                    .then(res => res.json())
                    .then((out) => {
                        var data = out

                        var { votes } = data
                        var voteobj = Object.values(votes)
                        var votearray = new Array(voteobj);


                        votearray.forEach(item => {
                            item.forEach(obj => {
                                var { user, vote } = obj
                                if (user === requestedUser) {
                                    if (vote == "revolution") {
                                        standing = "Revolutionary";
                                    }
                                    else { standing = "Peace Kepper" }
                                }
                            })
                        });
                    })
                    .catch(err => { console.error(err) })
                    .catch(err => { console.error(err) })







            })
            .catch(err => { console.error(err) })
    } else {
        client.say(target, "To use this command please say !!getinfo name");
    }
}