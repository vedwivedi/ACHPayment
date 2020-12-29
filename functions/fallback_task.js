exports.fallback_task =async function(context, event, callback,RB) {
  try {
  let Listen = false;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;
  let Say = "";
  // Add your code here.
  console.log('fallback_task');
  //const Memory = JSON.parse(event.Memory);
  //let AmountPay=800.00;//755.55;//800.00; // Default Amount for testing
  // if(Memory.AmountPay!=undefined)
  //   AmountPay=Number(Memory.AmountPay).toFixed(2);
  //console.log("Memory.AmountPay "+Memory.AmountPay);
  //console.log("AmountPay "+AmountPay);
  // Initialize Remember variables *********. 
  // Remember.PaymentAmt=AmountPay;
  // Remember.AgentTransfer=false;
  // Remember.InstallmentPayment=0.0;
  // Remember.NP=0;
  // Remember.FP=0.0;
  // Remember.start_date="";
  // Remember.InstallmentStart_Date="";
  // Remember.Frequency="";
  // Remember.FACSFreq="";
  // Remember.LegalAnnounce="";
  Say='Hello this is from fallback task';
  //End of your code.
  // This callback is what is returned in response to this function being invoked.
  // const functions = Runtime.getFunctions();
  // let path = functions['responseBuilder'].path;
  // let RB = require(path);
  RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( null,error);
  }
  };