const server = require("./src/app.js");
const { database } = require("./src/db.js");
require("dotenv").config(); //para leer las variables de entorno

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const DB_PORT = process.env.DB_PORT || 5432;

// Syncing all the models at once.
//Con {force:true} ==>es un sincronizado forzado por lo que se reescribe la Bd al recargar la app
database.sync({ force: true }).then(() => {
  server.listen(SERVER_PORT, () => {
    console.log(`Server Listening in http://localhost:${SERVER_PORT}/`);
    console.log(`Database initialized in Port: ${DB_PORT}`);
  });
});
