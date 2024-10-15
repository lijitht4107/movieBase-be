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
const Login = async(req,res)=>{
    try {
        const {email, password}=req.body;
        const user = await User.findOne({email:email})
        if(!user){
           return res.status(401).json({message:"email not valied"})
        }
        const isValied= await bcrypt.compare(password,user.password);
        if(!isValied){
            return res.status(401).json({message:"password is not correct"})

        }
        console.log('User Details', user, '\n')
        let payload ={email:email,user:user.name,role:user.role};
        let token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: '1h' });
        console.log('Token', token, '\n')
        res.status(201).json({message:"login successfull", token:token})
    } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internals server error" });
    }
}

export { SignUp,Login };
