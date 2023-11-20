const express = require("express");
const passport = require("passport");
const Project = require('../models/Project');

const router = express.Router();


//route to create new project
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        //1)identify the user //try "myStrat" instead of "jwt" above
        const user = req.user;
        //2)create the project object
        console.log(req.body);
        const { name, description, links } = req.body;
        if (!name) {
            return res.status(402).json({ err: "Invalid Details" });
        }

        const projectObj = { name, description, links };
        const project = await Project.create(projectObj);

        //3)Add project to user
        user.projects.push(project._id);
        await user.save();
        //4)return a responce
        return res.status(200).json(project);
    }
);



module.exports = router;