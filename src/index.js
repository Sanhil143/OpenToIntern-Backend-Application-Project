const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const route = require("./routes/route")
mongoose.set('strictQuery', true)
const app = express()

app.use(express.json())

dotenv.config()

mongoose.connect(process.env.MY_DB_URL)
      .then(() => console.log("My DB is connected"))
      .catch((err) => console.error(err))

app.use("/functionup", route)

app.all("/*",  (req, res) =>  {
      res.status(404).send({
            status: false,
            message: "This page is not exist"
      })
})



app.listen(process.env.PORT, () => {
      console.error("Express app running on port " + process.env.PORT);
})



