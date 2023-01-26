//Importar los modulos express y mongoose
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//Importar controladores 
const users = require("./Controller/userController");
const logins = require ("./Controller/loginController")

//Obtener la información el archivo env
require("dotenv").config();
//Almacenar la cadena de conexión
const mongoString = process.env.DATABASE_URL;

//Conectar con la base de datos
mongoose.connect(mongoString, { useNewUrlParser: true });
//Guardar la conexión
const db = mongoose.connection;
//Verificar si la conexión ha sido exitosa
db.on("error", (err) => {
  console.log(err.message);
});
/* Se ejecuta una unica vez, por eso once en lugar de on, 
cuando se conecta a base de datos, en lugar de en cada petición
*/
db.once("connected", () => {
  console.log("succesfully connected");
});
//Recibir una notificación cuando la conexión se haya cerrado
db.on("disconnected", () => {
  console.log("mongoose default connection is disconnected");
});
//Importación de controladores
const PORT = 8000;
//Crear la app
const app = express();
//Analizar los archivos json
app.use(express.json());

app.use("/users", users);
app.use("/auth", logins);

app.listen(PORT, () => {
  console.log(`server running at http://127.0.0.1:${PORT}`);
});
