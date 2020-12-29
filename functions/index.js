 const functions = Runtime.getFunctions();
const greetingTaskHandler = require(functions['greeting_task'].path);
const goodbyeTaskHandler = require(functions['goodbye_task'].path);
const collectFallbackTaskHandler = require(functions['collect_fallback_task'].path);
const fallbackHandler = require(functions['fallback_task'].path);

const responseBuilder = require(functions['responseBuilder'].path);

exports.handler = async (context, event, callback) => {
  const { CurrentTask } = event;
console.log(functions);
console.log(functions['greeting_task'].path);
  // calling task handlers
  switch (CurrentTask) {
    case 'greeting':
      console.log('greeting');
      await greetingTaskHandler.greeting_task(context, event, callback,responseBuilder.RB);
      break;

    case 'goodbye':
      await goodbyeTaskHandler.goodbye_task(context, event, callback,responseBuilder.RB);
      break;

    case 'collect_fallback':
      await collectFallbackTaskHandler.collect_fallback_task(context, event, callback,responseBuilder.RB);
      break;

    case 'fallback':
     await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
      break;

    default:
      await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
      break;
  }
};