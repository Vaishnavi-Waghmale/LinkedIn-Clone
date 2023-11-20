const express = require("express");
const passport = require("passport");
const Skill = require('../models/Skill');

const router = express.Router();


//route to create new skill
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        //1)identify the user //try "myStrat" instead of "jwt" above
        const user = req.user;
        //2)create the skill object
        console.log(req.body);
        const { skillName } = req.body;
        if (!skillName) {
            return res.status(402).json({ err: "Invalid Details" });
        }

        const skillObj = { skillName };
        const createdSkill = await Skill.create(skillObj);

        //3)Add skill to user
        user.skills.push(createdSkill._id);
        await user.save();
        //4)return a responce
        return res.status(200).json(createdSkill);
    }
);



module.exports = router;