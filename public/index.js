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

// ------------------------------RENDER FUNCTIONS-------------------------------//
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
               
                  <button type="button" class="btn btn-danger my-1" onClick="deleteByid(${elem.id})" >Delete</button> 
              </div>`;
    })
    .join("  ");
  document.getElementById("id").innerHTML = id;
}
// ------------------------------BUTTONS FUNCTIONS-------------------------------//
function filterFunction(x) {
  location.href = `/filter?id=${x}`;
}

function deleteByid(id) {
  socket.emit("delete", id);
}

function edit() {
  const id = `    <form action="/productos" method="get" >
  <input type="text" class="form-control"  id="title" placeholder="Objeto" name="title" > <br>
  <input type="number" class="form-control"  id="price" placeholder="Precio" name="price"><br>


  <input type="submit" value="Editar" onClick="editt()"><br>
</form> `
  document.getElementById("id").innerHTML = id;
}


function editt() { 

let title = document.getElementById("title").value 
let price = document.getElementById("price").value 
console.log(title);
console.log(price);

  // socket.emit("edit", id)
  
}


// ------------------------------SOCKETS ON--------------------------------------//
socket.on("messagesDelete", (data) => {
  alert(
    `Se Acaba de eliminar el element: ${data.title}, precio: ${data.price}`
  );
  location.href = `/productos`;
});

socket.on("messagesEdited", (data) => {
  alert(
    `Se Acaba de Editar el element: ${data.title}, precio: ${data.price}`
  );
  location.href = `/productos`;
});

socket.on("messages", (data) => {
  render(data);
});


//    <button type="button" class="btn btn-light my-1" onClick="edit()" >Update</button>