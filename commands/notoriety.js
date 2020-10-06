const fetch = require('node-fetch');
module.exports = (client, target, context, msg, self) => {
    let url = 'https://mygeoangelfirespace.city/db/users.json';

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            var data = out

            var { users } = data
            var usrobj = Object.values(users)
            var userarray = new Array(usrobj);
            var highest = ""
            var points = 0

            userarray.forEach(item => {
                var { name } = item;

                item.forEach(obj => {
                    var { name, cool_points, notoriety } = obj
                    if (cool_points > points) {
                        highest = name;
                        points = notoriety;
                    }
                })
            });
            var val = `${highest} is the most notorious with a value of: ${points}`
            client.say(target, val);
        })
        .catch(err => { console.error(err) })
}