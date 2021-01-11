exports.bank_account_number_task =async function(context, event, callback,RB) {
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
  
    //// This piese of code executed when user give answer No to varify Account number
  if(Memory.bankAccCheck)
  {
    if(Memory.bank_acc_num_check===undefined)
    {
    if(Memory.AccNum_fail_counter===undefined)
      {
        Remember.AccNum_fail_counter=1;
        console.log('Counter: '+Remember.AccNum_fail_counter);
      }
      else{
        Remember.AccNum_fail_counter = Memory.AccNum_fail_counter + 1;
        console.log('Counter: '+Remember.AccNum_fail_counter);
      }

      if(Memory.AccNum_fail_counter > 2)
      {
        Say = false;
      Listen = false;
      Remember.AccNum_fail_counter = 0;
      Redirect = 'task://agent_transfer';
      }
      else
      {
        Remember.question = 'bank_acc_num_check';
        Collect = {
        "name": "collect_bank_acc",
        "questions": [
          {
            "question": `Please tell me the bank account number again.`,
            "voice_digits": {
              "finish_on_key": "#"
            },
            "name": "bank_acc",
            "type": "Twilio.NUMBER_SEQUENCE"
          }
        ],
        "on_complete": {
          "redirect": "task://check_bank_acc_number"
        }
      };
  }
}
    else
       {
       Remember.question = 'bank_acc_num_check';
        Collect = {
        "name": "collect_bank_acc",
        "questions": [
          {
            "question": `Please tell me the bank account number again.`,
            "voice_digits": {
              "finish_on_key": "#"
            },
            "name": "bank_acc",
            "type": "Twilio.NUMBER_SEQUENCE"
          }
        ],
        "on_complete": {
          "redirect": "task://check_bank_acc_number"
        }
      };
}
}
// This piese of code executed when task redirect first time when user say yes to confirm routing number
  else{
    if(Memory.bank_acc_num_check===undefined)
    {
    if(Memory.AccNum_fail_counter===undefined)
      {
        Remember.AccNum_fail_counter=1;
        console.log('Counter: '+Remember.AccNum_fail_counter);
      }
      else{
        Remember.AccNum_fail_counter = Memory.AccNum_fail_counter + 1;
        console.log('Counter: '+Remember.AccNum_fail_counter);
      }

      if(Memory.AccNum_fail_counter >= 2)
      {
        Say = false;
      Listen = false;
      Remember.AccNum_fail_counter = 0;
      Redirect = 'task://agent_transfer';
      }
      else
      {
        Remember.question = 'bank_acc_num_check';
        Collect = {
            "name": "collect_bank_acc",
            "questions": [
              {
                "question": `Say your bank account number or enter your bank account number followed by a pound sign.`,
                "voice_digits": {
                  "finish_on_key": "#"
                },
                "name": "bank_acc",
                "type": "Twilio.NUMBER_SEQUENCE"
              }
            ],
            "on_complete": {
              "redirect": "task://check_bank_acc_number"
            }
          };
        }
      }
      else
      {
        Remember.question = 'bank_acc_num_check';
        Collect = {
            "name": "collect_bank_acc",
            "questions": [
              {
                "question": `Say your bank account number or enter your bank account number followed by a pound sign.`,
                "voice_digits": {
                  "finish_on_key": "#"
                },
                "name": "bank_acc",
                "type": "Twilio.NUMBER_SEQUENCE"
              }
            ],
            "on_complete": {
              "redirect": "task://check_bank_acc_number"
            }
          };
      }
     }
     //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
} catch (error) {
console.error(error);
callback( error);
}
};