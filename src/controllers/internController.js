const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel");
const Validation = require("../validations/validation");

const interns = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please put your data" });
    }

    let { name, email, mobile, collegeName } = data;

    if (!name) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }

    if (name) {
      if (!Validation.isValid(name) || !Validation.isValidName(name)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter valid name" });
      }
    }

    if (!email) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }

    if (email) {
      if (!Validation.isValidEmail(email) || email == "") {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter valid email" });
      }
      let uniqueEmail = await InternModel.findOne({ email: data.email });
      if (uniqueEmail) {
        return res
          .status(400)
          .send({ status: false, msg: "email is already exist" });
      }
    }

    if (!mobile) {
      return res.status(400).send({ status: false, msg: "mobile is required" });
    }

    if (mobile) {
      if (!Validation.isValidNumber(mobile)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter valid mobile number" });
      }
      let uniqueMobile = await InternModel.findOne({ mobile: data.mobile });
      if (uniqueMobile) {
        return res
          .status(400)
          .send({ status: false, msg: "mobile number is already exist" });
      }
    }

    if (!collegeName) {
      return res
        .status(400)
        .send({ status: false, msg: "college name is required" });
    }

    if (collegeName) {
      if (!Validation.isValid(collegeName) || collegeName == "") {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter valid college name" });
      }
      let findCollege = await CollegeModel.findOne({
        name: collegeName.toLowerCase(),
        isDeleted: false,
      }).select({ _id: 1 });
      if (!findCollege) {
        return res
          .status(404)
          .send({ status: false, msg: "No such college Name Not Found!" });
      }

      let clgId = findCollege._id;
      req.body.collegeId = clgId;
    }

    let internData = await InternModel.create(data);

    let createIntern = {
      isDeleted: internData.isDeleted,
      name: internData.name,
      email: internData.email,
      mobile: internData.mobile,
      collegeId: internData.collegeId,
    };

    res.status(201).send({ status: true, data: createIntern });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

module.exports.interns = interns;
