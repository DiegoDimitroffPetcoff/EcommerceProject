Realizo trabajo cumpliendo consignas.
1. Agrego logeo correpondiente accediento a base de datos mongo. El mismo devuelve un avatar que le es asigando al usuario.
2. En el root principal tambien hay un boton para crear una cuenta, en donde el usuario agrega su informacion personal para estar registrado.
3. Prepare los logs para que adviertan en caso de un logeo o signUp incorrecto. Cada vez que hay un usuario nuevo se envia un correo al administrador con la infomacion correpondiente
4. Una vez logeado el usuario podra agregar productos (esta tarea podria ser seteada para que solo la realice el administrador en el futuro) y seleccionando con el filtro, segun el ID correpondiente que desee, podra agregar el mismo al carrito generandose una vista previa del producto agregado
5. El usuario podra ver su carrito y los productos que alli agrego hasta el momento. Encontrara un link para comprar definitivamente llevandolo a una nueva pagina que le agradece por haber comprado y que le informa que recibira un e-mail y un sms segun lo inscripto en su sign up personal
6. Cada vez que hay una compra, ademas de enviar un e-mail y whatssap personalizado al cliente, en donde se le agradece por haber comprado con mas los detalles de los productos adquiridos, se envia,tambien, un whatssap y un e-mail al administrador con toda la info del usuario que compro.
7. Todo el servidor puede levantarse en modo fork o en modo cluster agregando este ultimo como parametro
8. Se realizadon las prubas con artillery, se puede observar la diferencia positiva en la performance de la ejecucion en modo claster, con una lectura mas rapida del /root una vez logeado. (dejo toda la documentacion en la carpeta testArtillery)
9. Todo el proyecto se encuentra subido a HEROKU bajo el link https://aplicacion-de-compras.herokuapp.com/ funcionando todo correctamente
10. Todas las acciones realizadas por el usuario se encuentran personalizadas segun sus datos personales. Durante la navegacion en la app el usuario vera su nombre. Si realiza alguna compra podra ver su correo y el numero que agrego cuando se resgistro, que sera donde toda la info sera enviada.
11. A los fines de ser mas practico, y teniendo en cuenta que este es solo un proyecto TEST, dejo en el proyecto las claves sensibles que podran ser modificadas con variables globales en caso de agregarlas. 

