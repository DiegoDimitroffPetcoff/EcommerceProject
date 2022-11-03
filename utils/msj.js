const twilio = require("twilio");
const log4js = require("log4js");

const ACCOUNT_SID = process.env.ACCOUNT_SID ||"AC724bf3286d819b5394424987b2a5d668";
const AUTH_TOKEN = process.env.AUTH_TOKEN ||"7f013dc2d7bc96ab5bcbd1ca37baaac0";
const ADMINISTRATOR_NUMBER = process.env.ADMINISTRATOR_NUMBER ||'whatsapp:+351935828293'
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

async function sendSms(msj, client) {

  console.log("---------------------------------//")
  console.log(client.messages)
  try {
    const message = await client.messages.create({
      body: msj,
      from: process.env.TEST_CEL ||"+19896137462",
      to: client,
    });
    const logger = log4js.getLogger("info");
    logger.info("Mensaje de texto enviado")
  } catch (error) {
    console.log(error)
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
      logger.info("Mensaje de Whatssap enviado al usuario")
  } catch (error) {
    let logger = log4js.getLogger("error");
    console.log(error)
    logger.error("Hubo un error al intentar enviar el WHATSSAP-> sms.js 42")
  }
}

  async function sendWapAdministrator( msj) {
    let num =  process.env.NUMBER_TWILIO ||+14155238886   
    let text = await msj;
    try {
        let message = await client.messages.create({
            body: text ,
            from:'whatsapp:'+ num ,
            to: ADMINISTRATOR_NUMBER
        });
  
        const logger = log4js.getLogger("info");
        logger.info("Mensaje de Whatssap PARA EL ADMINISTRADOR")
    } catch (error) {
      let logger = log4js.getLogger("error");
      console.log(error)
      logger.error("Hubo un error al intentar enviar el WHATSSAP-> sms.js 61")
    }
  
}

module.exports = {sendSms, sendWap, sendWapAdministrator}
