const axios = require('axios');
exports.greeting_task =async function(context, event, callback,RB) {
  try {
  let Listen = false;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;
  let Say = "";
  // Add your code here.
  console.log('greeting_task');
  
  
  Collect = {
    "name": "collect_routing",
    "questions": [
      {
        "question": `We will need your Bank information,, We will allow you time to get your bank information,, Say or use your telephone keypad to enter  the routing number , when ready.`,
        "voice_digits": {
          "finish_on_key": "#"
        },
        "name": "routing_num",
        "type": "Twilio.NUMBER_SEQUENCE"
      }
    ],
    "on_complete": {
      "redirect": "task://check_routing_number"
    }
  };
  
  //End of your code.
  // This callback is what is returned in response to this function being invoked.
  //const functions = Runtime.getFunctions();
  //let RB = require('responseBuilder.js');
   //let path = functions['responseBuilder'].path;
   //let RB = require(path);
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( error);
  }
  };