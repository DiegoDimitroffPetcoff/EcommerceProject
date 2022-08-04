const twilio = require("twilio");
const log4js = require("log4js");

const ACCOUNT_SID = process.env.ACCOUNT_SID ||"AC724bf3286d819b5394424987b2a5d668";
const AUTH_TOKEN = process.env.AUTH_TOKEN ||"7f013dc2d7bc96ab5bcbd1ca37baaac0";

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
// mi numero de suecia:
const minumero= +46734763187
async function sendWap( msj,x) {
  let num =  process.env.NUMBER_TWILIO ||+14155238886
  let clientNumber = await x
  let text = await msj;
  try {
      let message = await client.messages.create({
          body: text ,
          from:'whatsapp:'+ num ,
          to: 'whatsapp:'+ clientNumber
      });

      const logger = log4js.getLogger("info");
      logger.info("Mensaje de Whatssap enviado")
  } catch (error) {
    let logger = log4js.getLogger("error");
    console.log(error)
    logger.error("Hubo un error al intentar enviar el WHATSSAP-> sms.js 40")
  }
  
}

module.exports = {sendSms, sendWap}
