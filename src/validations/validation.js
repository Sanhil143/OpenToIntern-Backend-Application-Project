
const isValid = (value) => {
      if (typeof value ==="undefined" || typeof value === null) return false
      if (typeof value === "string" && value.trim().length === 0) return false
      if (typeof value === "number" && value.trim().length === 0) return false  // let a = "sanhil rai" b = a.trim(sanhil rai) 
      if (typeof value === "object") return false

      return true
}
const isValidName = (value) => {
      const regexName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
      return regexName.test(value)
}

const isValidClgName = (value) => {
      const regexCollegeName = /^[-a-zA-Z&-_:,.' ']{1,100}$/
      return regexCollegeName.test(value)
}

// const isCollegeName = (value) => {
//       if(value.toString().toLowerCase()){
//       return false}
//       else{ return true
//       }
      
// }


const isValidEmail = (value) => {  //john.doe@miet.ac.in"
      const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/
      return emailRegex.test(value)
}

const isValidNumber = (value) => {
      const regexNumber = /^[5-9]{1}[0-9]{9}$/
      return regexNumber.test(value)
}

const isValidUrl = (value) => {
      const regexUrl = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i
      return regexUrl.test(value)
}




module.exports.isValid = isValid
module.exports.isValidName = isValidName
module.exports.isValidClgName = isValidClgName
module.exports.isValidEmail = isValidEmail
module.exports.isValidNumber = isValidNumber
module.exports.isValidUrl = isValidUrl
// module.exports.isCollegeName = isCollegeName
