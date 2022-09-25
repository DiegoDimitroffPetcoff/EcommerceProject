const socket = io.connect();

function addMessage(e) {
  alert("Agregaste un nuevo producto");
  const mensaje = {
    title: document.getElementById("object_searched").value,
    price: document.getElementById("price_searched").value,
  };

  socket.emit("new-message", mensaje);
  return false;
}

function render(data) {
  

  const object = data
    .map((elem, index) => {
      return `<div >${elem.title}</div>`;
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
  const id = data
    .map((elem, index) => {
      return `<div><button type="button" class="btn btn-light my-1" onClick="filterFunction(${elem.id})">Select</button> 
                  <button type="button" class="btn btn-light my-1" onClick="filterFunction(${elem.id})" >Update</button>
                  <button type="button" class="btn btn-danger my-1" onClick="filterFunction(${elem.id})" >Delete</button> 
              </div>`;
    })
    .join("  ");
  document.getElementById("id").innerHTML = id;
}

function filterFunction(x) {
  location.href = `/filter?id=${x}`;
}

socket.on("messages", (data) => {
  // console.log(data)
  render(data);
});
