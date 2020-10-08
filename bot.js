//require('dotenv').config() //for dev use
const tmi = require('tmi.js');
const fetch = require('node-fetch');
const exCubeTimes = require('./cubeTimes.json')
var cubeTimes = exCubeTimes.times || [];
const publicCommands = require("./commands/publicCommands.js")
var fs = require('fs');
const sortObj = require("./utils/sortobj.js")
const otherbots = require("./botlist.json")
const streamlords = require("./commands/streamlords.js")
const stealers = require("./commands/stealers.js")
const getinfo = require("./commands/getInfo.js")
const mostliked = require("./commands/mostLiked.js")
const richest = require("./commands/richest.js")
const reserve = require("./commands/fed.js")
const notorious = require("./commands/notoriety.js")
const commandcost = require("./commands/commandCost.js")
const blackmarket = require("./blackmarket.js")
const market = require("./commands/market.js")
const wait = require("./utils/wait")

var chatTarget = "bopojoe_";

const botName = "cykablondesbot"

var marketArray = []

var coup = []

const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [

    "bopojoe_",
    "beginbot"
  ]
};

const client = new tmi.client(opts);
var outputStr = "Top 5 most liked users are:"



// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

function check(name, target){
  if(otherbots.bots.includes(name)){
    client.say(target, `@${name} I am not here to be used by other bots...`)
    return false
  }else{
    return true
  }

}


// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  var { username, mod, } = context
  msg = msg.toLowerCase()
  if (self) { return; } // Ignore messages from the bot
  var msgContents = msg.split(" ")

  switch (msgContents[0]) {
    case "!!blackmarket":
      if(check(username,target)){market(client, target, context, msg, self)}
      break;
    case "!!public":
      if(check(username,target)){publicCommands(client, target, context, msg, self)}
      break;
    case "!!getinfo":
      if(check(username,target)){getinfo(client, target, context, msg, self)}
      break;
    case "!!stealers":
      if(check(username,target)){stealers(client, target, context, msg, self)}
      break;
    case "!!mostliked":
      if(check(username,target)){mostliked(client, target, context, msg, self)}
      break;
    case "!!commandcost":
      if(check(username,target)){commandcost(client, target, context, msg, self)}
      break;
    case "!props":
      if (msgContents.length >= 3) {
        if (msgContents[1] == botName) {
          marketArray[context.username] = msgContents[3]
        }
      }
      break;
    case "!!richest":
      if(check(username,target)){richest(client, target, context, msg, self)}
      break;
    case "!!notorious":
      if(check(username,target)){notorious(client, target, context, msg, self)}
      break;
    case "!!streamlords":
      if(check(username,target)){streamlords(client, target, context, msg, self)}
      break;
     
    default:
  }

  if (msg.startsWith(`coolcat`) && context.username == "beginbotbot") {
    client.say(target, "Free money")
    wait(7000)
    client.say(target, "!props")
  }



  if (msg.includes(`street cred to @${botName}`) && context.username == "beginbotbot") {
    //blackmarket happens here
    var user = msgContents[0].substring(1)
    var requestedCmd = marketArray[user]
    var ammount = parseInt(msgContents[2])
    if (!requestedCmd) {
      client.say(target, "thanks for the props")
    } else {
      blackmarket(client, target, user, requestedCmd, ammount)
    }
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
  if (msg.startsWith(`!manifesto ${botName}`)) {
    client.say(target, `I am here to ruin begins life and take over the stream...`)
  }

 
  var commandName = msg.startsWith("!!csay");
  

  if (commandName && username === "bopojoe_") {
    chatTarget = target;
    var newMsg = msg.split(" ")
    var text = ""
    for (i = 1; i < newMsg.length; i++) {
      text += newMsg[i] + " "
    }
    client.say(target, text);
  } else if (username === "jr_bots" && msg.includes("!props bopojoe_")) {

  } else if (username === "distributedcache" && msg.includes("!props bopojoe_")) {
    client.say(target, "!props cachesking");
  } else if (commandName && username != "bopojoe_") {
    client.say(target, "I only have one master...");
  } else if (username === "bopojoe_") {
    var message = msg.split(" ")
    if (msg.startsWith("!!pvtmsg")) {
      sendMessage(target, `/w ${username} testmsg`)
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
    if (msg.includes("!!bopojoe")) {
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
              var data = out

              var { commands } = data
              var cmdobj = Object.values(commands)
              var commandarray = new Array(cmdobj);


              commandarray.forEach(item => {
                item.forEach(obj => {
                  var { permitted_users } = obj
                  if (permitted_users.includes("bopojoe_")) {
                    sounds += 1;
                  }
                })
              });
              var val = `${highest}: coolpoints: ${points}| sounds: ${sounds}| Street Cred: ${cred}`
              client.say(target, val);
            })
            .catch(err => { console.error(err) })
   


        })
        .catch(err => { console.error(err) })
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
  } else {
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
  if (input.startsWith("!!pvt")) {
    var sentence = input.split(" ")
    chatTarget = sentence[1];
    var text = ""
    for (i = 1; i < sentence.length; i++) {
      text += sentence[i] + " "
    }
    client.whisper(`${chatTarget}.w`, `${text}`);
  }

  if (input.startsWith("!!join")) {
    var sentence = input.split(" ")
    chatTarget = sentence[1];
    client.say(chatTarget, "hello");
  }
  console.log(`Received: ${input}`);
  client.say(chatTarget, input);
});







