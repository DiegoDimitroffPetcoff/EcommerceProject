const twilio = require("twilio");
const log4js = require("log4js");

const ACCOUNT_SID = process.env.ACCOUNT_SID ||"AC724bf3286d819b5394424987b2a5d668";
const AUTH_TOKEN = process.env.AUTH_TOKEN ||"ca4eec173764317420347e21884fac45";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

async function sendSms(msj, client) {
  try {
    const message = await client.messages.create({
      body: msj,
      from: process.env.TEST_CEL ||"+19896137462",
      to: client,
    });
    const logger = log4js.getLogger("info");
    logger.info("Mensaje de texto enviado")
  } catch (error) {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error al intentar enviar el sms-> sms.js 20")
   
  }
}

module.exports = sendSms;
