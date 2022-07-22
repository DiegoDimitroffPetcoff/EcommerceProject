const socket = io.connect();

function addMessage(e) {
  alert("Agregaste un nuevo producto")
  const mensaje = {
    title: document.getElementById("object_searched").value,
    price: document.getElementById("price_searched").value,
  };

  socket.emit("new-message", mensaje);
  return false;
}

function render(data) {
  console.log(data);
  const id = data
    .map((elem, index) => {
      return `<div>${elem.id}</div>`;
    })
    .join("  ");
  document.getElementById("id").innerHTML = id;

  const object = data
    .map((elem, index) => {
      return `<div>${elem.title}</div>`;
    })
    .join("  ");
  document.getElementById("object").innerHTML = object;

  const price = data
    .map((elem, index) => {
      return `
    <div>$${elem.price}</div>`;
    })
    .join(" ");
  document.getElementById("price").innerHTML = price;

  
}

socket.on("messages", (data) => {
  render(data);
  
});
