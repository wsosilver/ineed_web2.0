//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Sirva apenas os arquivos estáticos do diretório dist
app.use(express.static(__dirname + "/dist/ineed-web"));

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/ineed-web/index.html"));
});

// Inicie o aplicativo ouvindo na porta padrão do Heroku
app.listen(process.env.PORT || 8080);