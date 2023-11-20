const express = require("express");
const User = require('../models/User');
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers")

const router = express.Router();

router.post("/register", async (req, res) => {
    //register user logic
    //1)get details from req.body
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password) {
        return res.status(400).json({ err: "Invalid request body" });

    }
    //2)we will check the user email is already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res
            .status(402)
            .json({ err: "User with this email already exists" });
    }
    //3)this is a legitimate user request. Now create a user.
    //Use hashing for password authentication

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserDetails = { firstName, lastName, password: hashedPassword, email, };
    const newUser = await User.create(newUserDetails);

    //4)use new user to create a jwt and return the token
    const token = await getToken(email, newUser);


    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});


router.post("/login", async (req, res) => {
    //1)get details from req.body
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ err: "Invalid username or password" });
    }
    //2)verify user exists with that email
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ err: "Invalid username or password" });
    }

    //3)verify id password provided is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ err: "Invalid username or password" });
    }

    //4)generate the token and return it
    const token = await getToken(email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});



module.exports = router;