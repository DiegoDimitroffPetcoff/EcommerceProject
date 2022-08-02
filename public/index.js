
const socket = io.connect();

function myFunction1(e){   
  console.log(e)
  console.log(document.getElementById("idNumber").value);
  console.log(document.getElementById("id").connect);
   const input=  document.getElementById("idNumber").value

}

 

//   return false;
// }


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
console.log(data)
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

  // const button = data
  //   .map((elem, index) => {
  //     return `<form onsubmit="myFunction1(this)" method="post" action="/mainFiltered">
  //     <div><input  type="submit" value="Agregar" id="idNumber" /> </div>`
     
  //   })
  //   .join(" ");

  // document.getElementById("button").innerHTML = button;

  
}

socket.on("messages", (data) => {
  // console.log(data)
  render(data);
  
});

