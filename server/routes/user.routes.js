import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import UserController from "../controllers/UserController.js";
import auth from "../middleware/auth.js";
import customer from "../middleware/customer.js";

const route = express.Router();

route.use(cors());
route.use(
  bodyParser.json({
    extended: true,
  })
);
route.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/*------------ Multer Images Code  ------------ */

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/public/images/user");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (ext == "jpg" || ext == "jpeg" || ext == "png") {
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    } else {
      cb(new Error("Not valid extention..."), false);
    }
    //  else {
    //     cb(null, `extra/${file.fieldname}-${Date.now()}.${ext}`)
    // }
  },
});
const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});
const UploadFiles = upload.fields([{
  name: "images",
}]);

/*------------ Multer Image Code End ------------ */

/*------------ User Register Data Routes ------------ */

route.post("/register", UploadFiles, UserController.register);

/*------------ Get User Data Routes ------------ */

route.get("/", UserController.getUserall);

/*------------ Delete User Data Routes ------------ */

route.delete("/del/:id", UserController.deleteUser);

/*------------  Multiple User Delete Routes ------------ */

route.delete("/mlpdelete", UserController.multipleDeleteUser);

/*------------  Update User Routes ------------ */

route.put("/upd/:id", UploadFiles, UserController.updateUser);

/*------------ User Login Routes ------------ */

route.post("/login", UserController.login);

/*------------ User login Routes ------------ */

route.get("/check-admin", auth, UserController.checkadmin);


export default route;
