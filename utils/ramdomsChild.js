let num = null;


process.on("message", (message) => {
  num = message;
  let result = ramdomsChild(message);
  process.send(JSON.stringify(result));
});

function ramdomsChild(req, res) {
  try {
    let container = [];

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    for (let index = 0; index < num; index++) {
      let result = getRandomInt(1000);
      container.push(result);
    }
    let repetidos = {};
    container.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    return repetidos;
  } catch (err) {
    console.log(err);
  }
}


