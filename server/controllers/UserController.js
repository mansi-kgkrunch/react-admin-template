import Validate from "../validation/validate.js";
import User from "../models/User.model.js";
import { unlink } from "fs";
import bcrypt from "bcrypt";
import lodash from "lodash";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs";
const { toLower, _ } = lodash;
const { trim } = lodash;

export default class UserController {
  /*----------------------- Register User Data   -----------------------*/

  static async register(req, res) {
    var errors = Validate.register(req.body);
    if (req.files !== undefined) {
      var files = req.files.images;
      var images = _.first(files);
      var user_image = {
        name: images.filename,
        path: `${images.destination}/${images.filename}`,
      };
    } else {
      var user_image = {};
    }

    if (errors.status) {
      try {
        var newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
          username: req.body.username,
          email: toLower(req.body.email),
          password: newPassword,
          images: user_image,
        });
        res.json({
          status: true,
          message: "User Created Successfully",
        });
      } catch (error) {
        // console.log(error);
        res.json({
          status: false,
          message: "Email Already in Use",
        });
      }
    } else {
      res.json(errors);
    }
  }

  /*----------------------- Login User Data -----------------------*/

  static async login(req, res) {
    // console.log(req.body)
    var errors = Validate.login(req.body);
    if (errors.status) {
      const user = await User.findOne({
        email: toLower(req.body.email),
      });
      if (!user) {
        res.json({
          status: false,
          message: "Invalid User , Please try again !!",
        });
      } else {
        const PassConfirm = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (PassConfirm) {
          const token = Jwt.sign(
            {
              username: user.username,
              email: user.email,
              image: user.images,
            },
            process.env.JWT_KEY,
            {
              expiresIn: 60 * process.env.JWT_TIME,
            }
          );
          res.json({
            status: true,
            message: "User Logged In Successfully",
            token: token,
          });
        } else {
          res.json({
            status: false,
            message: "Somthing Wrong !!",
          });
        }
      }
    } else {
      res.json(errors);
    }
  }

  /*----------------------- Check Admin User Data -----------------------*/

  static async checkadmin(req, res) {
    res.json({
      user: true,
      userData: req.user,
      message: "User Logged In Successfully",
    });
  }

  /*----------------------- Get User Data -----------------------*/

  static async getUserall(req, res) {
    try {
      var user = await User.find({});
      res.json({
        status: true,
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Error in getting User",
        error: error,
      });
    }
  }

  /*----------------------- Delete User Data -----------------------*/

  static async deleteUser(req, res) {
    var id = req.params.id;
    try {
      var user = await User.findByIdAndDelete(id);
      var Images = user.images;
      if (!Images) {
        unlink(`../server/${Images.path}`, (err) => {
          console.log(err, "ffbhjdjd");
          if (err) throw err;
        });
      }
      res.json({
        status: true,
        message: "User Delete Successfully",
      });
    } catch (error) {
      // console.log(error);
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }

  /*----------------------- Update User Data -----------------------*/

  static async updateUser(req, res) {
    var id = req.params.id;
    const user = await User.findById(id);
    var new_image = "";
    const files = req.files.images;
    var images = _.first(files);

    if (images !== undefined) {
      new_image = {
        name: images.filename,
        path: `${images.destination}/${images.filename}`,
      };
      try {
        fs.unlinkSync(`../server/${user.images.path}`, (err) => {
          if (err) throw err;
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = user.images;
    }
    let addUser = {
      username: trim(req.body.username),
      email: trim(req.body.email),
      password: req.body.password,
      images: new_image,
    };
    const errors = Validate.register(addUser);
    if (errors.status) {
      try {
        var result = await User.findByIdAndUpdate(id, addUser);
        res.json({
          status: true,
          message: "User Updated Successfully",
          model: result,
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: false,
          message: "Email Already in Use !!",
        });
      }
    } else {
      res.json(errors);
    }
  }

  /*----------------------- Detele Multiple User Data -----------------------*/

  static async multipleDeleteUser(req, res) {
    const id = req.body.id;
    const users = await User.find({ _id: id });
    try {
      if (users) {
        users.forEach((user) => {
          var Images = user.images;
          unlink(`../server/${Images.path}`, (err) => {
            if (err) throw err;
          });
        });
      }
      var user = await User.deleteMany({ _id: id }); // var Images = user.images;

      res.json({
        status: true,
        message: "Users Multiple Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "Somthing Wrong !!",
      });
    }
  }
}
