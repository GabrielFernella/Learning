

module.exports = {
   age: function(timestamp){
      const today = new Date()
      const birthDate = new Date(timestamp)
   
      //2019 - 1984 = 35
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
   
      //11-12 = -1 ||  11-11 = 0
      if(month < 0 || 
         month == 0 && 
         today.getDate() <= birthDate.getDate()){
         age = age - 1 //Se não tiver feito aniversário até o mes e dia da tada atual, subtrai 1
      }
      
      return age
   },

   date: function (timestamp){
      const date = new Date(timestamp)

      const year = date.getUTCFullYear()
      const month = `0${date.getUTCMonth() + 1}`.slice(-2)
      const day = `0${date.getUTCDate()}`.slice(-2)

      console.log(`${year}-${month}-${day}`)

      return `${year}-${month}-${day}`
   }
}