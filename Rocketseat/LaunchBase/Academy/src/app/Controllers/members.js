/* Arquivo para as funções da rota members*/

/* Salvar arquivos internamente*/
const fs = require('fs')
const data = require('../data.json')
const {date} = require('../lib/date')

/*  Formas de receber os dados 
   req.query.id
   req.body
   req.params.id
*/

/* Funções*/
exports.index = function (req,res){
   return res.render("members/index", {members: data.members})
}

exports.show = function(req,res) {
   const {id} = req.params

   /* Procura o valor no banco de dados*/
   const foundmember = data.members.find(function(instrutor){
      return instrutor.id == id
   })

   if(!foundmember){
      return res.send("member not found!")
   }

   /*Dados que serão manipulado do banco de dados para exibir */
   const member = {
      ...foundmember, /*Coloca todo o resto dos dados que n precisam ser alterados*/
      birth: date(foundmember.birth).birthDay
   }

   return res.render("members/show", { member })

}

exports.create = function(req,res){
   return res.render("members/create")
}

exports.post = function(req,res){
   const keys = Object.keys(req.body)

   /* Verifica se alguma das chaves estão vazias*/
   for(key of keys){
      if(req.body[key] == ""){
            return res.send("Please, fill all fields")
      }
   }

   /* Campos adicionais */
   birth = Date.parse(req.body.birth)

   let id = 1;
   const lastMember = data.members[data.members.length - 1]

   if(lastMember){
      id = lastMember.id + 1
   }

   
   /*Organizando os campos que serão enviados para o banco*/
   data.members.push({
      ...req.body,
      id,
      birth
   })

   /*Escrever o arquivo*/
   fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
      if(err){
         return res.send("Write file error!")
      }

      return res.redirect("/members")
   })

   //return res.send(req.body)
}

exports.edit = function (req,res){
   const {id} = req.params

   /* Procura o valor no banco de dados*/
   const foundmember = data.members.find(function(instrutor){
      return instrutor.id == id
   })

   if(!foundmember){
      return res.send("member not found!")
   }

   /*Inserindo a data modificada*/
   const member = {
      ...foundmember,
      birth: date(foundmember.birth).iso,
   }
   
   return res.render('members/edit', {member})
}

exports.put = function(req,res){
   const {id} = req.body
   console.log(id)
   let index = 0

   /* Procura o valor no banco de dados*/
   const foundmember = data.members.find(function(member, foundIndex){
      if(id == member.id){
         index = foundIndex
         return true
      }
   }) 

   if(!foundmember){return res.send("member not found!")}

   const member = {
      ...foundmember,
      ...req.body,
      birth: Date.parse(req.body.birth),
      id: Number(id)
   }

   data.members[index] = member

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if(err) return res.send("write error!")

      return res.redirect(`/members/${id}`)
   })

   /* Nesse processo identificamos o id do instrutor e pegamos seu índice no banco, 
   assim conseguimos manipular as informações que serão passadas no corpo na requisição*/
}

exports.delete = function(req,res){
   const {id} = req.body

   const filteredmembers = data.members.filter(function(member){
      return member.id != id
   })

   data.members = filteredmembers

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if(err) res.send("Write error delete")
   })

   return res.redirect("/members")
}


//D:\Gabriel\Cursos\Launchbase 2.0\Fase 03\01 - Controle de Academia\04