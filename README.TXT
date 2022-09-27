Trabajo final Coder House:
La aplicacion se inicializa en el con Server js en modo cluster. Si se agrega el parametro fork se inicializa en modo fork
PORT: Se va a utilizar el puerto que exista en el .env (PORT= process.env.PORT )
DBS: Se ultiza mongo como DBS, a menos que se utilice en el segundo paramentro: "FILE"
MODO: Se inicializa en modo fork, a menos que se use en el tercer parametro "CLUSTER"

node server file fork 
node server file cluster

node server mongo fork  
node server mongo cluster 

Desde el comienzo de la app se observa la posibilidad de ingreso mediante logeo o un nuevo registro.

Incorporo en las funcionalidades las opciones para agregar y eleiminar los elementos.
Los mismos se pueden seleccionar con el boton y asi enviarlos a el Carrito para su compra.
La informacion que consta en el carrito puede ser leida por File sistem o por mongo segun eleccion.

Icorpore un fitro segun el numero de cada objeto, los cuales pueden usarse de manera individual o directamente
seleccionando el objeto que se quiere.
Una vez que el usuario realiza la compra, recibiraun e mail DE CONFIRMACION al correo con el cual el mismo se haya logeado.
El administrador (en este caso mi correo) recibira un email para informarme de la compra que haya realizado algun usuario.

Para el registro se utiliza Passport Local, asi tambien como para el logeo.
La contrasena queda encrriptada para mayor seguridad.

La arquitectura del proyecto esta basada en un modelo MVC, siendo levantado el front mediante el mismo servidor en 
hbs. 

