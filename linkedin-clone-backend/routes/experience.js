const express = require("express");
const passport = require("passport");
const Experience = require('../models/Experience');

const router = express.Router();


//route to create new experience
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        //1)identify the user //try "myStrat" instead of "jwt" above
        const user = req.user;
        //2)create the experience object
        const { companyName, position, startDate, endDate, description } = req.body;
        if (!companyName || !position) {
            return res.status(402).json({ err: "Invalid Details" });
        }

        const experienceObj = { companyName, position, startDate, endDate, description };
        const experience = await Experience.create(experienceObj);

        //3)Add experience to user
        user.experiences.push(experience._id);
        await user.save();
        //4)return a responce
        return res.status(200).json(experience);
    }
);



module.exports = router;