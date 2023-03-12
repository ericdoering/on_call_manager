var Userdb = require("../model/model");


//Create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty."});
        return;
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "An error occured while trying to create user."
            })
        })
}

//Retrieve and return all users & Retrieve a single user
exports.find = (req, res) => {

}

//Update a new user identified by their ID
exports.update = (req, res) => {

}

//Delete a user with a specified user ID
exports.delete = (req, res) => {

}