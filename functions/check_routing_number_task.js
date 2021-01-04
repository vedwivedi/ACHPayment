const brnv = require('bank-routing-number-validator');

exports.check_routing_number_task =async function(context, event, callback,RB) {
  try {
  let Listen = false;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;
  let Say = "";
  // Add your code here.
  const Memory = JSON.parse(event.Memory);

  Remember.task_fail_counter = 0;
  Remember.repeat = false;

  const routing_num = Memory.twilio.collected_data.collect_routing.answers.routing_num.answer ||
                      event.Field_routing_num_Value ||
                      event.Field_routing_num_alt_Value;
            
    //Remember.routing_number=routing_num;
// let requestObj={
//   "routing_number":routing_num
// }
  if ( routing_num ) {
    const validRoutingNum = brnv.ABARoutingNumberIsValid(routing_num);

    if ( validRoutingNum ) {
      Say = `You said <say-as interpret-as='digits'>${routing_num}</say-as>. `;
      Prompt = `Is that correct?`;
    
      Say += Prompt;
      
      Remember.bank_acc_routing = routing_num;
      Remember.question = 'routing_check';
    
      Listen = true;
      Tasks=['yes_no', 'agent_transfer'];
    } else {
      Collect = {
        "name": "collect_routing",
        "questions": [
          {
            "question": `The routing number you provided is not valid. Please say or use your telephone keypad to provide a valid routing number.`,
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
      // Say = `The routing number you provided is not valid. `;
      // Prompt = `Please provide a valid routing number.`;
    
      Say = false;
      Listen = false;
    }
  } else {
    Say = false;
    Listen = false;
    Remember.from_task = event.CurrentTask;
    Redirect = 'task://fallback';
  }

  
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