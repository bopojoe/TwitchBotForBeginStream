const fetch = require('node-fetch');
module.exports = (client, target, context, msg, self) => {
    let url = 'https://mygeoangelfirespace.city/db/users.json';

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            // console.log('Checkout this JSON! ', out);
            var data = out

            var { the_fed } = data
            var usrobj = Object.values(the_fed)
            var userarray = new Array(usrobj);
            var reserveVal = ""
            var points = 0

            userarray.forEach(item => {
                var { reserve } = item;
                reserveVal = reserve

               
            });
            var val = `The Fed Reserve has accumulated ${reserveVal}`
            client.say(target, val);
        })
        .catch(err => { console.error(err) })
}