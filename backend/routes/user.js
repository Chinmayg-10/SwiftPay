const express=require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const {User, Account}=require("../db")
const JWT_SECRET=process.env.JWT_SECRET
const authMiddleware=require("../middleware")
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})
router.post("/signup",async (req,res)=>{
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Invalid Credentials"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already used!"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    await Account.create({
        userId:user._id,
        balance:1+Math.random()*10000
    })
    const token=jwt.sign({
       userId:user._id
    },JWT_SECRET);
    res.json({
        message:"User Signup Successfull",
        token:token
    })
})
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})


router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "invalid Credentials"
        });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(411).json({
            message: "user not found!"
        });
    }
    // Compare password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid password"
        });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
});

//User data updation
const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put("/",authMiddleware,async(req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        _id: { $ne: req.userId }, // exclude logged-in user
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        }))
    });
});


module.exports=router;