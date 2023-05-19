const { hashpassword, comparePassword } = require("../helpers/auth");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const registerControllers = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    //check user is already exists
    const existuser = await userModel.findOne({ email });
    if (existuser) {
      return res.status(200).send({
        success: false,
        message: "User Alredy Exists..!",
      });
    }

    // hashing a password
    const hashpass = await hashpassword(password);

    const users = await new userModel({
      name,
      email,
      phone,
      password: hashpass,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error...!",
    });
  }
};

const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or Login",
      });
    }

    //check email are register or not
    const users = await userModel.findOne({ email });
    if (!users) {
      return res.status(200).send({
        success: false,
        message: "User Not Registerd..!",
      });
    }

    // password chek
    const match = await comparePassword(password, users.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token created
    const token = await jwt.sign({ _id: users._id }, process.env.SECRET_KEY, {
      expiresIn: "20m",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully...!",
      name: users.name,
      email: users.email,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error...!",
    });
  }
};

module.exports = {
  registerControllers,
  loginControllers,
};
