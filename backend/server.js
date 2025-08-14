require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Porta padrão 3000 no dev
const port = process.env.PORT || 3000;

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Iniciando o socket.io
require("./socket/socketio")(io);

// Rotas
app.use("/routes", require("./routes")(io));

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
