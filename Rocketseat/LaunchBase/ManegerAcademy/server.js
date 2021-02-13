const express = require('express');
const nunjucks = require('nunjucks'); //View Engine, para inserir códigos JS dentro do HTML
const routes = require('./routes')
const methodOverride = require('method-override') //Sobre escrever os métodos, podendo usar outros métodos PUT, Delete e etc.

const server = express();

server.use(express.urlencoded({ extended: true })) //Faz funcionar as requisições buscando pelo body
server.use(express.static('public'))
server.use(methodOverride('_method')) //Sobre escrever os métodos, podendo usar outros métodos PUT, Delete e etc.
server.use(routes) //Utilizando as rotas importadas


server.set("view engine", "njk")

nunjucks.configure("views",{  //Local da pasta das paginas
   express:server,
   autoescape: false, //para n aparecer as tags entre o conteudo
   noCache: true
}) 




server.listen(5000, () => {
   console.log('server is running in http://localhost:3000')
})


//rever para recordar
//1-5-3