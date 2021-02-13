/* Arquivo para as funções da rota instructors*/

/* Salvar arquivos internamente*/
const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../lib/date')

/*  Formas de receber os dados 
   req.query.id
   req.body
   req.params.id
*/

/* Funções*/
exports.index = function (req,res){
   return res.render("instructors/index", {instructors: data.instructors})
}

exports.show = function(req,res) {
   const {id} = req.params

   /* Procura o valor no banco de dados*/
   const foundInstructor = data.instructors.find(function(instrutor){
      return instrutor.id == id
   })

   if(!foundInstructor){
      return res.send("Instructor not found!")
   }

   /*Dados que serão manipulado do banco de dados para exibir */
   const instructor = {
      ...foundInstructor, /*Coloca todo o resto dos dados que n precisam ser alterados*/
      age: age(foundInstructor.birth),
      services: foundInstructor.services.split(','), /*Quebra a string pela virgula*/
      created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
      /*Os campos adicionais será sobrescrito pelas alterações */
   }

   return res.render("instructors/show", { instructor })

}

exports.create = function(req,res){
   return res.render("instructors/create")
}

exports.post = function(req,res){
   const keys = Object.keys(req.body)

   /* Verifica se alguma das chaves estão vazias*/
   for(key of keys){
      if(req.body[key] == ""){
            return res.send("Please, fill all filds")
      }
   }

   /* Desestruturando request body*/
   let { avatar_url, birth, name, services, gender} = req.body

   /* Campos adicionais */
   birth = Date.parse(birth)
   const created_at = Date.now()
   const id = Number(data.instructors.length + 1)

   
   /*Organizando os campos que serão enviados para o banco*/
   data.instructors.push({
      id,
      name,
      avatar_url,
      birth,
      created_at,
      services,
      gender
   })

   /*Escrever o arquivo*/
   fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
      if(err){
         return res.send("Write file error!")
      }

      return res.redirect("/instructors")
   })

   //return res.send(req.body)
}

exports.edit = function (req,res){
   const {id} = req.params

   /* Procura o valor no banco de dados*/
   const foundInstructor = data.instructors.find(function(instrutor){
      return instrutor.id == id
   })

   if(!foundInstructor){
      return res.send("Instructor not found!")
   }

   /*Inserindo a data modificada*/
   const instructor = {
      ...foundInstructor,
      birth: date(foundInstructor.birth).iso
   }
   
   return res.render('instructors/edit', {instructor})
}

exports.put = function(req,res){
   const {id} = req.body
   console.log(id)
   let index = 0

   /* Procura o valor no banco de dados*/
   const foundInstructor = data.instructors.find(function(instructor, foundIndex){
      if(id == instructor.id){
         index = foundIndex
         return true
      }
   }) 

   if(!foundInstructor){return res.send("Instructor not found!")}

   const instructor = {
      ...foundInstructor,
      ...req.body,
      birth: Date.parse(req.body.birth),
      id: Number(id)
   }

   data.instructors[index] = instructor

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if(err) return res.send("write error!")

      return res.redirect(`/instructors/${id}`)
   })

   /* Nesse processo identificamos o id do instrutor e pegamos seu índice no banco, 
   assim conseguimos manipular as informações que serão passadas no corpo na requisição*/
}

exports.delete = function(req,res){
   const {id} = req.body

   const filteredInstructors = data.instructors.filter(function(instructor){
      return instructor.id != id
   })

   data.instructors = filteredInstructors

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if(err) res.send("Write error delete")
   })

   return res.redirect("/instructors")
}


//D:\Gabriel\Cursos\Launchbase 2.0\Fase 03\01 - Controle de Academia\04