const parseArgs = require("minimist");
const numCPUs = require("os").cpus().length;
const log4js = require("log4js");

function info(req, res) {
  const logger = log4js.getLogger("info");

  logger.info("Info: Peticion recibida en la ruta /info");

  let argumentos = parseArgs(process.argv.slice(2));
  let plataforma = parseArgs(process.argv);
  let argumentosEntrada = argumentosFuncion();
  function argumentosFuncion() {
    if (argumentos._ == "") {
      return "No hay agurmentos agregados";
    } else {
      return `Los argumentos de entrada son: ${argumentos._}`;
    }
  }

  let nombrePlataforma = `PLATAFORMA UTILIZADA: ${process.platform}`;
  let versionNodeJs = `VERSION UTILIZADA DE NODE JS: ${process.version}`;
  let rss = `Memoria utiliazda: ${process.memoryUsage}`;
  let pathEjecucion = `PATH DE EJECUCION: ${process.cwd()}`;
  let processID = `ID DEL PROCESO: ${process.pid}`;
  let carpetaProyecto = `CARPETA DE PROYECTO: ${plataforma._[1]}`;
  let cpu = `número de procesadores presentes en el servidor: ${numCPUs} `;

  res.render("information", {
    carpetaProyecto,
    processID,
    pathEjecucion,
    carpetaProyecto,
    rss,
    versionNodeJs,
    nombrePlataforma,
    cpu,
  });
}
module.exports = info;
