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
  
  Say='Hello this is from greeting task';
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