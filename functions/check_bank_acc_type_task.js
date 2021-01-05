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
    const bank_acc_type = event.Field_bank_acc_type_Value;
 
  Remember.repeat = false;
  if(Memory.accType_fail_counter===undefined)
  {
    Remember.accType_fail_counter=1;
    console.log('Counter: '+Remember.accType_fail_counter);
  }

  else{
    Remember.accType_fail_counter = Memory.accType_fail_counter + 1;
    console.log('Counter: '+Remember.accType_fail_counter);
  }

  if(Memory.accType_fail_counter >= 2)
  {
    Say = false;
  Listen = false;
  Remember.accType_fail_counter = 0;
  Redirect = 'task://agent_transfer';
  }
  
else
{
 

  if ( bank_acc_type ) {
    
    Say = `you said ${bank_acc_type}. Is that correct? `;
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
}
    
    //End of your code.
   
     RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
    
     } catch (error) {
    console.error(error);
    callback( error);
    }
    };