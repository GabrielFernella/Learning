const fs = require('fs') //File system
const data = require("../data.json")
const { age, date } = require("../util/utils") //função de tratamento de datas


//Show
exports.show = function (req,res) {
   //req.params
   const { id } = req.params

   const foundInstructor = data.instructors.find(function(instructor){
      return instructor.id == id
   })

   if(!foundInstructor) return res.send('Instructor not found')


   const instructor = {
      ...foundInstructor,
      age: age(foundInstructor.birth), //Usando a função para ver quantos anos vc tem
      services: foundInstructor.services.split(","),
      created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
   }

   return res.render("instructors/show",{instructor})
}

//Método POST
exports.post = function (req, res){
   const keys = Object.keys(req.body) //Validar os dados obrigatórios da requisição
   //percorrendo cada um dos atributos
   for(key of keys){  
      //Validando se tem algum campo das keys é vazio 
      if(req.body[key] == ""){
         return res.send('Please, fill all fields')
      }
   }

   let { avatar_url, birth, gender, services, name } = req.body

   birth = Date.parse(birth); 
   const created_at = Date.now(); //inserindo esse dado dentro do body
   const id = Number(data.instructors.length + 1 ) //gera o ID conforme for o número de objetos
   
   //inserindo os dados do body dentro do array de objeto do data
   data.instructors.push({
      id, 
      name,
      avatar_url, 
      birth, 
      gender, 
      services, 
      created_at, 
   }) 

   //função para escrever dentro do arquivo data
   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if(err) return res.send('Write file error')

      return res.redirect("/instructors")
   })

   //return res.send(req.body)
}

exports.edit = function(req,res) {

   const { id } = req.params

   const foundInstructor = data.instructors.find(function(instructor){
      return instructor.id == id
   })

   if(!foundInstructor) return res.send('Instructor not found')

   const instructor = {
      ...foundInstructor,
      birth: date(foundInstructor.birth)
   }

   return res.render('instructors/edit', {instructor})
}

exports.put = function (req,res ){
   const { id } = req.body
   let index = 0;

   const foundInstructor = data.instructors.find(function(instructor, foundIndex){
      if(id == instructor.id){
         index = foundIndex;
         return true
      }
   })

   if(!foundInstructor) return res.send('Instructor not found')

   const instructor = {
      ...foundInstructor,
      ...req.body,
      birth: Date.parse(req.body.birth)
   }

   data.instructors[index] = instructor

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if(err) return res.send("Write error!")

      return res.redirect(`/instructors/${id}`)
   })

}
