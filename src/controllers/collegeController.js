const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");
const Validation = require("../validations/validation");

const colleges = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please put college data" });
    }

    let { name, fullName, logoLink } = data;

    if (!name) {
      return res
        .status(400)
        .send({ status: false, msg: "College name is required" });
    }

    if (name) {
      if (!Validation.isValid(name) || !Validation.isValidName(name)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter your valid college name" });
      }
      if (name) {
        data.name = name.toString().toLowerCase();
      }
    }

    if (!fullName) {
      return res
        .status(400)
        .send({ status: false, msg: "College fullname is required" });
    }

    if (fullName) {
      if (
        !Validation.isValid(fullName) ||
        !Validation.isValidClgName(fullName)
      ) {
        return res.status(400).send({
          status: false,
          msg: "Please enter your valid college fullname",
        });
      }
    }

    if (!logoLink) {
      return res
        .status(400)
        .send({ status: false, msg: "Logo url is required" });
    }

    if (logoLink) {
      if (!Validation.isValid(logoLink) || !Validation.isValidUrl(logoLink)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter your valid logo link" });
      }
    }

    let checkCollege = await CollegeModel.findOne({
      name: name,
      isDeleted: false,
    });
    if (checkCollege) {
      return res
        .status(400)
        .send({ status: false, msg: "College is already registered" });
    }
    let savedData = await CollegeModel.create(data);
    return res
      .status(201)
      .send({ status: true, msg: "Successfully created", show: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const collegeDetails = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.query;
    let collegeName = req.query.collegeName;

    if (!collegeName) {
      return res.status(400).send({
        status: false,
        message: "collegeName is required for getting interns data",
      });
    }

    let getCollege = await CollegeModel.findOne({
      name: data.collegeName.toLowerCase(),
      isDeleted: false,
    }).select({ name: 1, fullName: 1, logoLink: 1 });

    if (!getCollege) {
      return res
        .status(404)
        .send({ status: false, message: "No such college found" });
    }

    let collegeData = {
      name: getCollege.name,
      fullName: getCollege.fullName,
      logoLink: getCollege.logoLink,
    };

    let collegeId = getCollege.id;

    let getIntern = await InternModel.find({
      collegeId: collegeId,
      isDeleted: false,
    }).select({ name: 1, email: 1, mobile: 1 });

    if (getIntern.length === 0) {
      return res.status(404).send({
        status: false,
        data: collegeData,
        msg: "No such interns found",
      });
    } else {
      collegeData.interns = getIntern;
    }

    return res.status(200).send({ status: true, data: collegeData });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

module.exports.colleges = colleges;
module.exports.collegeDetails = collegeDetails;
