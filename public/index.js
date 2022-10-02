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
      return `
      <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NOMBRE</th>
          <th scope="col">PRECIO</th>      
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">${elem.id}</th>
          <td>${elem.title}</td>
          <td>$${elem.price}</td>
          <td>      
          <button type="button" class="btn btn-light my-1" onClick="filterFunction(${elem.id})">Select</button>   
          <button type="button" class="btn btn-light my-1" onClick="edit(${elem.id})" >Update</button>
          <button type="button" class="btn btn-danger my-1" onClick="deleteByid(${elem.id})" >Delete</button> 
                  </td>
        </tr>
        
      </tbody>
    </table>`;
    })
    .join("  ");
  document.getElementById("object").innerHTML = object;


}
// ------------------------------BUTTONS FUNCTIONS-------------------------------//
function filterFunction(x) {
  location.href = `/filter?id=${x}`;
}

function deleteByid(id) {
  socket.emit("delete", id);
}

function edit(data) {

  const id = `  Id del producto:
   <form action="/productos" method="get" >
   <div>  ${data}</div> 
   <input id="prodId" name="prodId" type="hidden" value="${data}">

  <input type="text" class="form-control"  id="title" placeholder="Objeto" name="title" required> <br> 
  <input type="number" class="form-control"  id="price_object" placeholder="Precio" name="price" required><br>

  <input type="submit"  class="form-control" value="Editar" onClick="editt(${data})">
  <input type="reset"  class="form-control" value="Limpiar" onClick="editt()">
  <button  class="form-control" value="Volver" onClick="goBack()">Volver</button>
</form> `;

 const documento = document.getElementById("object").innerHTML = id;
  console.log("-----//");
  console.log(documento);
}

function editt(x) {

  let id = x
  let title = document.getElementById("title").value;
  let price = document.getElementById("price_object").value;
let objectToSend = {title: title, price: price};

  socket.emit("edit", objectToSend, x)
}

// ------------------------------SOCKETS ON--------------------------------------//
socket.on("messagesDelete", (data) => {
  alert(
    `Se Acaba de eliminar el element: ${data.title}, precio: ${data.price}`
  );
  location.href = `/productos`;
});

socket.on("messagesEdited", (data) => {
  alert(`Se Acaba de Editar el element: ${data.title}, precio: ${data.price}`);
  location.href = `/productos`;
});

socket.on("messages", (data) => {
  render(data);
});

function goBack(){
  location.href = `/productos`;
}
//    <button type="button" class="btn btn-light my-1" onClick="edit()" >Update</button>



