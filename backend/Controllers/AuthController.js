import userModel from "../Models/userModel.js";

export const RegController = async (req, res) => {
    try{

        const { name, email, pass } = req.body

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: "Email already in use, Please use another email."
            })
        }
        
        // Creating the user
        const user = await userModel.create({name, email, pass})
        res.status(200).json({
            success: true,
            message: "Registration successfull",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }
    catch(err){
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error: err
        })
    }
    
}
    

export const LoginController = async (req, res) => {
    try{
        const { email, pass } = req.body
        
        const user = await userModel.findOne({email})
        if(!user){
            res.status(400).send({
                success: false,
                message: "User does not exist"
            })
            return 
        }
        
        // Comparing passwords
        const isMatch = await user.comparePassword(pass);
        if(!isMatch){
            res.status(400).send({
                success: false,
                message: "Invalid Credentials"
            })
            return
        }
        
        res.status(200).send({
            success: true,
            message: "Logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    }
    catch(err){
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error: err
        })
    }    
}