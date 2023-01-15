const express = require('express')
const router = express.Router()
const CollegeController = require('../controllers/collegeController')
const InternController = require('../controllers/internController')



router.post("/colleges", CollegeController.colleges)

router.post("/interns", InternController.interns)

router.get("/collegeDetails", CollegeController.collegeDetails)




module.exports = router