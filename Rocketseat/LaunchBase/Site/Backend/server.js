const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./database/data') //pegando os dados do "Banco"
const provider = require('./database/providerData') //pegando os dados do "Banco"

server.use(express.static('public'))
server.set("view engine", ".njk"); //Utilizando o template engine

nunjucks.configure('views',{  //Local da pasta das paginas
   express: server,
   autoescape: false, //para n aparecer as tags entre o conteudo
   noCache: true
}) 


server.get('/', (req, res)=> {
   const about = {
      avatar_url: provider.avatar_url,
      name: provider.name,
      role: provider.role,
      description: provider.description,
      links: [
         {name: provider.Github.name, url: provider.Github.url},
         {name: provider.Linkedin.name, url: provider.Linkedin.url},
         {name: provider.Facebook.name, url: provider.Facebook.url}
      ]
   }

   return res.render("about", {about: about})
})

server.get('/portfolio', (req, res)=> {
   return res.render("portfolio", {items: videos})
})

server.get('/video', (req,res)=> {
   const id = req.query.id 

   const video = videos.find(function(video){
      if (video.id == id){
         return true;
      } 
   });

   if(!video){
      return res.send("Video not found")
   }

   return res.render('video', {item: video})

})



server.listen(3333, () => {
   console.log('server is running in http://localhost:3333')
})