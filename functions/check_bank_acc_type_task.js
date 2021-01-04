exports.check_bank_acc_type_task =async function(context, event, callback,RB) {
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

  const bank_acc_type = event.Field_bank_acc_type_Value;

  if ( bank_acc_type ) {
    
    Say = `Is that correct? `;
    Prompt = `say yes or no .`;
  
    Say += Prompt;
    
    Remember.bank_acc_type = bank_acc_type;
    Remember.question = 'bank_acc_type_check';
  
    Listen = true;
    Tasks=['yes_no', 'agent_transfer'];
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