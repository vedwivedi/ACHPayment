exports.bank_account_type_task =async function(context, event, callback,RB) {
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

    //// This piese of code executed when user give answer No to varify Account type 
  if(Memory.BankTepeCheck)
  {
    if(Memory.bank_acc_type_check===undefined)
    {
          if(Memory.AccType_fail_counter===undefined)
          {
            Remember.AccType_fail_counter=1;
            console.log('Counter: '+Remember.AccType_fail_counter);
          }
          else{
            Remember.AccType_fail_counter = Memory.AccType_fail_counter + 1;
            console.log('Counter: '+Remember.AccType_fail_counter);
          }

          if(Memory.AccType_fail_counter > 2)
          {
            Say = false;
          Listen = false;
          Remember.AccType_fail_counter = 0;
          Redirect = 'task://agent_transfer';
          }
          else
          {
            Remember.question = 'bank_acc_type_check';
            Collect =  {
              "name": "collect_acctype",
              "questions": [
                      {
                      "question": `Alright. Please tell me the bank account type again.`,
                      "name": "bank_acc_type",
                      //"type": "Twilio.bank_acc_type",
                      "voice_digits": {
                        "num_digits": 1,
                        "finish_on_key": "#",
                        "mapping": {
                          "1": "checking",
                          "2": "savings"
                        }
                      },
                      "validate": {
                        "allowed_values": {
                          "list": [
                            "savings",
                                "checkings",
                                "1",
                                "2",
                                "it is a saving",
                                "it is a checking",
                                "saving",
                                "checking",
                                "please use my savings",
                                "please use my checkings",
                                "savings account",
                                "checkings account",
                                "saving account",
                                "checking account",
                                "my account is savings",
                                "my account is checkings",
                                "my account is saving",
                                "my account is checking",
                                "savings account",
                                "checkings account",
                                "my bank account is saving",
                                "my bank account is account",
                                "my bank account is saving",
                                "my bank account is account"
                          ]
                        }
                      }
                    }
                    
                  ],
                  "on_complete": {
                    "redirect": "task://check_bank_acc_type"
                  }
                }
         
          }
    }
    else
          {
            Remember.question = 'bank_acc_type_check';
            Collect =  {
              "name": "collect_acctype",
              "questions": [
                      {
                      "question": `Alright. Please tell me the bank account type again.`,
                      "name": "bank_acc_type",
                      "voice_digits": {
                        "num_digits": 1,
                        "finish_on_key": "#",
                        "mapping": {
                          "1": "checking",
                          "2": "savings"
                        }
                      },
                      //"type": "Twilio.bank_acc_type",
                      "validate": {
                        "allowed_values": {
                          "list": [
                            "savings",
                                "checkings",
                                "1",
                                "2",
                                "it is a saving",
                                "it is a checking",
                                "saving",
                                "checking",
                                "please use my savings",
                                "please use my checkings",
                                "savings account",
                                "checkings account",
                                "saving account",
                                "checking account",
                                "my account is savings",
                                "my account is checkings",
                                "my account is saving",
                                "my account is checking",
                                "savings account",
                                "checkings account",
                                "my bank account is saving",
                                "my bank account is account",
                                "my bank account is saving",
                                "my bank account is account"
                          ]
                        }
                      }
                    }
                    
                  ],
                  "on_complete": {
                    "redirect": "task://check_bank_acc_type"
                  }
                }
          }
  }

  // This piese of code executed when task redirect first time when user say yes to confirm Bank account
  else
  {
    if(Memory.bank_acc_type_check===undefined)
    {
          if(Memory.AccType_fail_counter===undefined)
          {
            Remember.AccType_fail_counter=1;
            console.log('Counter: '+Remember.AccType_fail_counter);
          }
          else{
            Remember.AccType_fail_counter = Memory.AccType_fail_counter + 1;
            console.log('Counter: '+Remember.AccType_fail_counter);
          }

          if(Memory.AccType_fail_counter >= 2)
          {
            Say = false;
          Listen = false;
          Remember.AccType_fail_counter = 0;
          Redirect = 'task://agent_transfer';
          }
          else
          {
            Remember.question = 'bank_acc_type_check';
            Collect= {
              "name": "collect_acctype",
              "questions": [
                {
                  "question": `Tell me your bank account type. Say checking or press 1.  Say savings or press 2.`,
                  "name": "bank_acc_type",
                  //"type": "Twilio.FIRST_NAME",
                  "voice_digits": {
                    "num_digits": 1,
                    "finish_on_key": "#",
                    "mapping": {
                      "1": "checking",
                      "2": "savings"
                    }
                  },
                  "validate": {
                    "allowed_values": {
                      "list": [
                        "savings",
                            "checkings",
                            "1",
                            "2",
                            "it is a saving",
                            "it is a checking",
                            "saving",
                            "checking",
                            "please use my savings",
                            "please use my checkings",
                            "savings account",
                            "checkings account",
                            "saving account",
                            "checking account",
                            "my account is savings",
                            "my account is checkings",
                            "my account is saving",
                            "my account is checking",
                            "savings account",
                            "checkings account",
                            "my bank account is saving",
                            "my bank account is account",
                            "my bank account is saving",
                            "my bank account is account"
                      ]
                    }
                  }
                }
                
              ],
              "on_complete": {
                "redirect": "task://check_bank_acc_type"
              }
            }
            // Collect =  {
            //   "name": "collect_acctype",
            //   "questions": [
            //           {
            //           "question": `Tell me your bank account type by saying "checking" for checking account or press 1 "savings" for savings account or press 2.`,
            //           "name": "bank_acc_type",
            //           //"type": "Twilio.bank_acc_type",
            //           "voice_digits": {
            //             "num_digits": 1,
            //             "finish_on_key": "#",
            //             "mapping": {
            //               "1": "Checking",
            //               "2": "Saving"
            //             }
            //           }
                      
            //           }
          
            //         ],
            //   "on_complete": {
            //   "redirect": 	 "task://check_bank_acc_type"
            //           }
            // };
          }
        }
    else{
          Remember.question = 'bank_acc_type_check';
          Collect= {
            "name": "collect_acctype",
            "questions": [
              {
                "question": `Tell me your bank account type. Say checking or press 1.  Say savings or press 2.`,
                "name": "bank_acc_type",
                //"type": "Twilio.FIRST_NAME",
                "voice_digits": {
                  "num_digits": 1,
                  "finish_on_key": "#",
                  "mapping": {
                    "1": "checking",
                    "2": "savings"
                  }
                },
                "validate": {
                  "allowed_values": {
                    "list": [
                      "savings",
                          "checkings",
                          "1",
                          "2",
                          "it is a saving",
                          "it is a checking",
                          "saving",
                          "checking",
                          "please use my savings",
                          "please use my checkings",
                          "savings account",
                          "checkings account",
                          "saving account",
                          "checking account",
                          "my account is savings",
                          "my account is checkings",
                          "my account is saving",
                          "my account is checking",
                          "savings account",
                          "checkings account",
                          "my bank account is saving",
                          "my bank account is account",
                          "my bank account is saving",
                          "my bank account is account"
                    ]
                  }
                }
              }
              
            ],
            "on_complete": {
              "redirect": "task://check_bank_acc_type"
            }
          }
        }
  }
    //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
} catch (error) {
console.error(error);
callback( error);
}
};