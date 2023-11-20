const mongoose = require("mongoose");

//1)create a schema
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    links: [{
        type: String,
    },],
});

//2)convert schema to model

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;