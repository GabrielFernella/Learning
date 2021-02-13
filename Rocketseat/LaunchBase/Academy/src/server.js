const express = require('express');
const nunjucks = require('nunjucks'); /* Template engine, assim conseguimos separar nossas telas em blocos re reutilizá-las*/
const routes = require('./routes'); /* Precisa importar as rotas para que vc possa utiliza-las no server*/
const methodOverride = require("method-override") /* Possibilita a utilização de métodos de requisição */

const server = express();

//Usando os Middlewares
server.use(express.urlencoded({extended: true})) /*para conseguir ler o conteúdo passado no body*/
server.use(express.static('public'))
server.use(methodOverride('_method')) /* Precisa estar organizado nessa ordem pois esse método deve ser reconhecido pelo prox middleware*/
server.use(routes)



//config da nossa View Engine
server.set("view engine", ".njk"); //Utilizando o template engine
nunjucks.configure('src/app/views',{  //Local da pasta das paginas
   express: server,
   autoescape: false, //para n aparecer as tags entre o conteúdo 
   noCache: true
}) 


// iniciando nosso servidor 
server.listen(5000, () => {
   console.log('server is running in http://localhost:5000')
})