// yes_no handler function
exports.yes_no_task = async function(context, event, callback, RB)  
{
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

  console.log(event.Field_yes_no_Value);

  switch ( Memory.question ) {
    
    case 'routing_check':
      if (event.Field_yes_no_Value === 'Yes') {
        Collect = {
          "name": "collect_bank_acc",
          "questions": [
            {
              "question": `Say or use your telephone keypad to enter your bank account number.`,
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
        
        Say = false;
        // Say = 'Alright. Tell me your bank account number.';

        break;

      } else if (event.Field_yes_no_Value === 'No') {
        Collect = {
          "name": "collect_routing",
          "questions": [
            {
              "question": `Please tell me the routing number again.`,
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
        Say = false;

        Remember.bank_acc_routing = '';

        break;

      } else {
        Say = false;
        Redirect = 'task://fallback';

        break;
      }

    case 'bank_acc_num_check':
      if (event.Field_yes_no_Value === 'Yes') {
         Say = 'Tell me your bank account type by saying "checking" for checking account or press 1 "savings" for savings account or press 2.';
        
        Listen = true;
       Tasks = ['check_bank_acc_type'];
        

        break;

      } else if (event.Field_yes_no_Value === 'No') {
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
        
        Say = false;
        // Say = 'Alright. Please tell me the bank account number again.';
        Remember.bank_acc_num = '';

        break;

      } else {
        Say = false;
        Redirect = 'task://fallback';

        break;
      }
      
    
    
   
    case 'agent_transfer':
      if (event.Field_yes_no_Value === 'Yes') {

        Say = false;
        Redirect = 'task://agent_transfer';

        break;

      } else if (event.Field_yes_no_Value === 'No') {

        Say = false;
        Redirect = 'task://goodbye';

        break;

      } else {
        Say = false;
        Redirect = 'task://fallback';

        break;
      }

    case 'additional_help':
      if (event.Field_yes_no_Value === 'Yes') {

        Say = false;
        Listen = false;
        Redirect = 'task://agent_transfer';

        break;

      } else if (event.Field_yes_no_Value === 'No') {

        // Say = 'Thanks for calling. Good bye.';
        Say = false;
        Listen = false;
        Redirect = 'task://goodbye';

        break;
        
      } else {
        Say = false;
        Redirect = 'task://fallback';

        break;
      }
      
    default:
      Say = false;
      Redirect = 'task://fallback';

      break;
  }
  
  //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( error);
  }
  };