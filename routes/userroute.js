const express = require("express");
const route = express.Router();
const { sendResponse } = require("../helper/helper");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
route.post("/signup", async (req, res) => {
  const { userName, email, password, fullname, contactnum, bio, profilepic } = req.body;
  const obj = { userName, email, password, fullname, contactnum, bio: '', profilepic };
  let requiredArr = ["userName", "email", "password", "fullname", "contactnum",];
  let errArr = [];

  requiredArr.forEach((x) => {
    if (!obj[x]) {
      errArr.push(x);
    }
  });

  if (errArr.length > 0) {
    res
      .send(sendResponse(false, null, "Some Fileds are Missing", errArr))
      .status(400);
    return;
  } else {
    let hashPassword = await bcrypt.hash(obj.password, 10);
    obj.password = hashPassword;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res
        .send(sendResponse(false, null, "This Email is Already Exist"))
        .status(403);
    } else {
      UserModel.create(obj)
        .then((result) => {
          res.send(sendResponse(true, result, "User Saved Successfully"));
        })
        .catch((err) => {
          res
            .send(sendResponse(false, err, "Internal Server Error"))
            .status(400);
        });
    }
  }
});
route.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  // const obj = { email, password };

  // await UserModel.findOne({ email })
  //   .then(async (user) => {
  //     let isConfirm = await bcrypt.compare(obj.password, result.password);
  //     console.log(isConfirm);
  //     if (isConfirm) {
  //       let token = jwt.sign({ ...isConfirm }, process.env.SECURE_KEY)
  //       res.send(sendResponse(true, { user, token }, "Login Successfully"));
  //     } else {
  //       res.send(sendResponse(false, null, "Credential Error"));
  //     }
  //   })
  //   .catch((err) => {
  //     res.send(sendResponse(false, err, "User Doesn't Exist"));
  //   });
  const { email, password } = req.body;
  const obj = { email, password };

  UserModel.findOne({ email })
    .then(async (user) => {
      let isConfirm = await bcrypt.compare(obj.password, user.password);
      console.log(isConfirm);
      if (isConfirm) {
        res.send(sendResponse(true, user, "Login Successfully"));
      } else {
        res.send(sendResponse(false, null, "Credential Error"));
      }
    })
    .catch((err) => {
      res.send(sendResponse(false, err, "User Doesn't Exist"));
    });
});

route.get("/:id", async (req, res) => {

  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (user) {
    res.send(sendResponse(true, user, "User Found"));
  } else {
    res.send(sendResponse(false, null, "User Not Found"));
  }

});
// Get dta from here async data where we get all datas 
route.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
route.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, fullname, contactnum, bio, profilepic } = req.body;

  // Create an object with the updated values
  const updatedUser = {
    userName,
    email,
    password,
    fullname,
    contactnum,
    bio,
    profilepic
  };

  try {
    // Find the user by ID and update the data
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user) {
      res.send(sendResponse(true, user, "User Updated Successfully"));
    } else {
      res.send(sendResponse(false, null, "User Not Found"));
    }
  } catch (error) {
    res.send(sendResponse(false, error, "Failed to Update User"));
  }
});


module.exports = route;
