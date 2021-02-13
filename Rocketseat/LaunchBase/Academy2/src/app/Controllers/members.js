const {age, date} = require('../lib/date')


module.exports = {
   index(req,res){
      return res.render("members/index")
   },
   create(req,res){
      return res.render("instructors/create")
   },
   post(req,res){
      return
   },
   show(req,res){
      return
   },
   edit(req,res){
      return
   },
   put(req,res){
      return
   },
   delete(req,res){
      return
   },

}