const twilio = require("twilio");
const log4js = require("log4js");

const ACCOUNT_SID = "AC724bf3286d819b5394424987b2a5d668";
const AUTH_TOKEN = "ca4eec173764317420347e21884fac45";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

async function sendSms(msj) {
  try {
    const message = await client.messages.create({
      body: msj,
      from: "+19896137462",
      to: "+543624997599",
    });
    const logger = log4js.getLogger("info");
    logger.info("Mensaje de texto enviado")
  } catch (error) {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error al intentar enviar el sms-> sms.js 20")
   
  }
}

module.exports = sendSms;
