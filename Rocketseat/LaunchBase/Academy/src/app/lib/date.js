
module.exports = {

   age: function (timestamp) {
      const today = new Date()
      const birthDate = new Date(timestamp)
   
      /*Subtraindo o ano atual com o ano de nascimento 2020 - 1997 */
      let age = today.getFullYear() - birthDate.getFullYear()
         
      const month = today.getMonth() - birthDate.getMonth()  /*11 - 12 = -1 ||  11 - 11 = 0*/
   
      if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
         age = age - 1
      }
   
      return age
   },

   date: function(timestamp){
      /* Convertendo os valores de datas para uma forma legível*/
      const date = new Date(timestamp)
      /*é necessário ter a flag UTC para pegar os dados de maneira universal, pois dependendo da sua 
      localidade o new Date() pode alterar as informações para datas diferentes*/
      const year = date.getUTCFullYear()
      const month = `0${date.getUTCMonth() + 1}`.slice(-2)  /* O slice serve para diminuir caractere da string*/
      const day = `0${date.getUTCDate()}`.slice(-2)

      return {
         day,
         month,
         year,
         iso: `${year}-${month}-${day}`,
         birthDay: `${day}/${month}`,
      }

   }

}
