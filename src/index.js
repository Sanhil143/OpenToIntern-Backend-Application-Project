const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const route = require("./routes/route")
const multer = require('multer')  //recieve image
mongoose.set('strictQuery', true)
const app = express()

app.use(express.json())
app.use(multer().any())

dotenv.config()

mongoose.connect("mongodb+srv://sanhil143:raisahab12345@sanhildb.kk3knyj.mongodb.net/openToIntern")
      .then(() => console.log("My DB is connected"))
      .catch((err) => console.error(err))

app.use("/functionup", route)

app.all("/*",  (req, res) =>  {
      res.status(404).send({
            status: false,
            message: "This page is not exist"
      })
})



app.listen(3001, () => {
      console.error("Express app running on port " + 3001);
})



