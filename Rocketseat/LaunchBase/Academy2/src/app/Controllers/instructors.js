const {age, date} = require('../lib/date')
const Instructor = require('../models/Instructors')


module.exports = {
   index(req,res){
      Instructor.all(function(instructors){
         return res.render("instructors/index", {instructors})
      })
   },

   create(req,res){
      return res.render("instructors/create")
   },

   post(req,res){
      const keys = Object.keys(req.body)

      for(key of keys){
         if(req.body[key] == '') {
            return res.send('Please, fill all fields')
         }
      }

      Instructor.create(req.body, function(instructor){
         return res.redirect(`/instructors/${instructor.id}`)
      })

   },

   show(req,res){
      Instructor.find(req.params.id, function(instructor){
         if(!instructor) return res.send('Instructor not found')
         
         instructor.age = age(instructor.birth)
         instructor.services = instructor.services.split(',')
         instructor.created_at = date(instructor.created_at).format

         return res.render("instructors/show", {instructor})
      })
   },

   edit(req,res){
      Instructor.find(req.params.id, function(instructor){
         if(!instructor) return res.send('Instructor not found')
         
         instructor.age = date(instructor.birth).iso

         return res.render("instructors/edit", {instructor})
      })
   },

   put(req,res){
      const keys = Object.keys(req.body)

      for(key of keys){
         if(req.body[key] == ""){
            return res.send('Please, fill all filds')
         }
      }

      Instructor.update(req.body, function(){
         return res.redirect(`/instructors/${req.body.id}`)
      })
   },

   delete(req,res){
      Instructor.delete(req.body.id, function(){
         return res.redirect(`/instructors`)
      })
   },

}



/*
module.exports = {
   index(req,res){
      return res.render("instructors/index", {instructors: data.instructors})
   },

   create(req,res){
      return res.render("instructors/create")
   },

   post(req,res){
      const keys = Object.keys(req.body)

   
      if(req.body[key] == ""){
            return res.send("Please, fill all filds")
      }
   }

  
   let { avatar_url, birth, name, services, gender} = req.body

   birth = Date.parse(birth)
   const created_at = Date.now()
   const id = Number(data.instructors.length + 1)


   
   data.instructors.push({
      id,
      name,
      avatar_url,
      birth,
      created_at,
      services,
      gender
   })

  
   fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
      if(err){
         return res.send("Write file error!")
      }

      return res.redirect("/instructors")
   })

   //return res.send(req.body)
   },

   show(req,res){
      const {id} = req.params


   const foundInstructor = data.instructors.find(function(instrutor){
      return instrutor.id == id
   })

   if(!foundInstructor){
      return res.send("Instructor not found!")
   }

   
   const instructor = {
      ...foundInstructor, 
      age: age(foundInstructor.birth),
      services: foundInstructor.services.split(','), 
      created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
      
   }

   return res.render("instructors/show", { instructor })
   },

   edit(req,res){
      const {id} = req.params

   const foundInstructor = data.instructors.find(function(instrutor){
      return instrutor.id == id
   })

   if(!foundInstructor){
      return res.send("Instructor not found!")
   }

   
   const instructor = {
      ...foundInstructor,
      birth: date(foundInstructor.birth).iso
   }
   
   return res.render('instructors/edit', {instructor})
   },

   put(req,res){
         const {id} = req.body
      console.log(id)
      let index = 0

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
   },

   delete(req,res){
      const {id} = req.body

      const filteredInstructors = data.instructors.filter(function(instructor){
         return instructor.id != id
      })

      data.instructors = filteredInstructors

      fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
         if(err) res.send("Write error delete")
      })

      return res.redirect("/instructors")
   },
}*/