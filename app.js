//Cargamos el modulo http en el servidor
const http = require ("http");
// Seleccionamos el puerto 8000 para evitar conflictos con el Front, puerto 3000
const PORT = 8000
// Creamos un servidor http con una funcion callback que gestione los codigos de respuesta
const server = http.createServer(
    //require, response (require contiene los detalles de la solicitud y response se utiliza para enviar la respuesta al cliente)
    (req, res)=> {
        res.statusCode= 200
        res.setHeader("Content-type","text/html");
        res.end("<h1>Hello world!!</h1>")
    }
).listen (PORT,() => {console.log(`server running at http://localhost:${PORT}`)})
//instalar siempre el npx install 