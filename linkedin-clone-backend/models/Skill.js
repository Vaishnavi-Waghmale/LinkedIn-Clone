const mongoose = require("mongoose");

//1)create a schema
const SkillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true,
    },
});

//2)convert schema to model

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;