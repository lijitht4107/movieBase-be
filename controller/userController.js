import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const SignUp = async (req, res) => {
  try {
    const saltRounds = 10;

    bcrypt.hash(req.body.password, saltRounds,  async function (err, hash){
      if (err) {
        console.error(err);
        return;
      }
      var userData = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      if (!userData) {
        return res.status(401).json({ error: "user deteil not get" });
      }
      var user = new User(userData);
      await user.save();
      res.status(201).json({message:"signup successfull",name:user.name, email:user.email});
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internals server error" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Email not valid" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    console.log("User Details", user, "\n");

    let payload = { email: email, user: user.name, role: user.role ,userId:user._id };
    let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    // Set cookies and then send the JSON response
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("name", user.name);
    user.password = undefined;
    res.status(201).json({ message: "Login successful", token: token, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { SignUp,Login };
