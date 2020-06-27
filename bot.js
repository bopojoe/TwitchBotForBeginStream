const tmi = require('tmi.js');
const opts = require('./opts.js')
const fetch = require('node-fetch');
const exCubeTimes = require('./cubeTimes.json')
var cubeTimes = exCubeTimes.times || [];
var fs = require('fs');


var chatTarget = "bopojoe_";

var coup = []


const client = new tmi.client(opts);
var outputStr = "Top 5 most liked users are:"

function sortObj(obj) {
  var finalObj = {}
  for (i = 10; i > 0; i--) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === i) {
        finalObj[key] = value;
      }
    })
  }
  return finalObj;
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  msg = msg.toLowerCase()
  if (self) { return; } // Ignore messages from the bot

  if (msg.startsWith("!!public")) {
    client.say(target, "Current Public commands are: !!public - shows public commands | !!getinfo - shows data from db 'users' site");
  }

  if (msg.startsWith("!!getinfo")) {
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

  if (msg.startsWith("!!mostliked")) {

    let url = 'https://mygeoangelfirespace.city/db/users.json';


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

        rodobj = sortObj(rodobj);

        Object.entries(rodobj).forEach(([key, value]) => {
          if (limit > 0) {
            outputobj[key] = value;
            outputStr += ` ${key} : ${value} |`
            limit -= 1
          }

        });

        //console.log(outputStr);
        client.say(target, outputStr);

        outputStr = "Top 5 most liked users are:"
      })
      .catch(err => { console.error(err) })
    // client.say(target, "tested");
    console.log("tested")
  }

  if (msg.startsWith("!revolution")) {
    coup[context.username] = "rev"
  } else if (msg.startsWith("!vote revolution")) {
    coup[context.username] = "rev"
  }

  if (msg.startsWith("!peace")) {
    coup[context.username] = "peace"
  } else if (msg.startsWith("!vote peace")) {
    coup[context.username] = "peace"
  }

  if (msg.startsWith("!cubed") && context.username == "beginbotbot") {
    var str = msg.split(" ")
    var time = str[1]
    cubeTimes.push(time)
    var jsonData = {}
    jsonData.times = cubeTimes
    jsonData = JSON.stringify(jsonData)


    fs.writeFile("cubeTimes.json", jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

  }
  if (msg.startsWith("!manifesto cykablondesbot")) {
    // if ()
    client.say(target, `I am here to ruin begins life and take over the stream...`)
  }

  if (msg.startsWith("!tstcmd")) {
    var { badges } = context;


    if (true) {
      console.log("worked")
    }
    else {
      console.log("Pleb")
    }



    // client.say(target, `I am here to ruin begins life and take over the stream...`)
  }




  // Remove whitespace from chat message
  var commandName = msg.startsWith("!!!cykaSay");
  var { username, mod, } = context

  if (commandName && username === "bopojoe_") {
    chatTarget = target;
    var newMsg = msg.split(" ")
    var text = ""
    for (i = 1; i < newMsg.length; i++) {
      text += newMsg[i] + " "
    }
    console.log(text)
    client.say(target, text);
    console.log(target);
    console.log(`* Executed ${commandName} command`);
  } else if (username === "jr_bots" && msg.includes("!props bopojoe_")) {

  } else if (username === "distributedcache" && msg.includes("!props bopojoe_")) {
    client.say(target, "!props cachesking");
  } else if (commandName && username != "bopojoe_") {
    console.log(target)
    client.say(target, "I only have one master...");
    console.log(`* Executed ${commandName} command`);
  } else if (username === "bopojoe_") {
    var message = msg.split(" ")
    console.log(message[0])
    if (msg.startsWith("!!pvtmsg")) {
      sendMessage(target, `/w ${username} testmsg`)
    }

    if (msg.startsWith("!!dirt")) {
      console.log(coup);
    }
    if (msg.startsWith("!!bot")) {
      client.say(target, "!props bopojoe_");
    }
    if (msg.includes("!!give opsec")) {
      client.say(target, "!props whatsinmyopsec");
    }
    if (msg.includes("!!bot do a buy")) {
      client.say(target, "!buy random");
    }
    if (msg.includes("!!richest")) {
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

          userarray.forEach(item => {
            var { name } = item;

            item.forEach(obj => {
              var { name, cool_points } = obj
              if (cool_points > points) {
                highest = name;
                points = cool_points;
              }
            })
          });
          var val = `${highest} has the most coolpoints with ${points}`
          client.say(target, val);
        })
        .catch(err => { console.error(err) })
      // client.say(target, "tested");
      console.log("tested")
    }
    if (msg.includes("!!bopojoe")) {
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
              if (name === "bopojoe_") {
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
                  if (permitted_users.includes("bopojoe_")) {
                    console.log("+1")
                    sounds += 1;
                  }
                })
              });
              console.log("tested")

              var val = `${highest}: coolpoints: ${points}| sounds: ${sounds}| Street Cred: ${cred}`
              client.say(target, val);
            })
            .catch(err => { console.error(err) })
          // client.say(target, "tested");


        })
        .catch(err => { console.error(err) })
      // client.say(target, "tested");
      console.log("tested")
    }

    if (msg.includes("are you real")) {
      client.say(target, "of corse i'm real, do you think I'm a bot or something");
    }
    if (msg.includes("!!what you got bot")) {
      client.say(target, "!me");
    }
    if (msg.includes("!!gimmee what you got")) {
      client.say(target, "!transfer random bopojoe_");
    }
    if (msg.includes("!props whatsinmyopsec 4")) {
      client.say(target, "!props whatsinmyopsec");
    }

    console.log(msg);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.startsWith("!!join")) {
    var sentence = input.split(" ")
    chatTarget = sentence[1];
    client.say(chatTarget, "hello");
  }
  console.log(`Received: ${input}`);
  client.say(chatTarget, input);
});







