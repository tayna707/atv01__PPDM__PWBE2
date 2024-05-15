const express = require("express");
const Inrouter = express.Router();


const ClienteController = require("../Controllers/ClienteController");

Inrouter.post('/cadastro/novo', ClienteController.adicionarCliente);


module.exports = Inrouter;


