const express = require("express");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
const projectRoutes = require("./routes/project");
const skillRoutes = require("./routes/skill");
const User = require("./models/User");
require("dotenv").config();


const app = express();
app.use(express.json());
//Vaishnavi - password

mongoose.connect("mongodb+srv://vaishnaviwaghmale:" +
    process.env.MONGO_PASSWORD +
    "@cluster0.t0qxuub.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then((x) => {
    console.log("connected to mongo!!");
}).catch((err) => {
    console.log("error occured while connecting to mongodb");
    console.log(err);
});



//passport-jwt setup

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "vaishnavi";
var myStrat = new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier });
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    } catch (err) {
        if (err) {
            done(err, false);
        }
    }

});

// new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
//         if (err) {
//             done(err, false);
//         }
//         if (user) {
//             done(null, user);
//         }
//         else {
//             done(null, false);
//         }
//     });
// });
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findOne({ _id: jwt_payload.identifier });
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        } catch (err) {
            if (err) {
                done(err, false);
            }
        }

    })

);

app.get("/", (req, res) => {
    res.send("I am working");
});

app.get("/hello", (req, res) => {
    res.send("Hello, this is me Vaishnavi");
});

//2 input args
app.use("/auth", authRoutes);
app.use("/experience", experienceRoutes);
app.use("/project", projectRoutes);
app.use("/skill", skillRoutes);


app.listen(8000, () => {
    console.log("app is running on port 8000")
})

